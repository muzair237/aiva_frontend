import React, { useState } from 'react';
import Head from 'next/head';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import Image from 'next/image';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import profileBg from '../../public/images/cover-pattern.png';
import Input from '../components/Atoms/Input';
import avatar1 from '../../public/images/users/user-avatar.png';
import UpdatePassword from '../components/Organisms/UpdatePassword';
import Button from '../components/Atoms/Button';
import authThunk from '../slices/auth/thunk';
import withAuthProtection from '../components/Common/withAuthProtection';
import { Toast } from '../components/Molecules/Toast';

const Settings = () => {
  const dispatch = useDispatch();
  const genderOptions = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ];

  const user = useSelector(state => state?.Auth?.user);
  const isLoading = useSelector(state => state?.Auth?.isLoading);
  const [activeTab, setActiveTab] = useState('1');
  const [profile_picture, setProfilePicture] = useState();

  const tabChange = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    gender: null,
  };
  const validationSchema = yup.object().shape({
    first_name: yup.string().min(3, 'First Name should be atleast 3 Characters').required('First name is required'),
    last_name: yup.string().min(3, 'Last Name should be atleast 3 Characters').required('Last name is required'),
    email: yup.string().required('Please Enter Email!').email('Please Enter a Valid Email!'),
    gender: yup.object().required('Please Select Gender.'),
    DOB: yup.date().required('Please Enter Date of Birth!').max(new Date(), 'Date of Birth cannot be in the future'),
  });

  function handleFileChange(e, accept) {
    const file = e.target.files[0];
    const acceptableExtensions = accept.split(',').map(ext => ext.trim());
    if (!acceptableExtensions.includes(file.type)) {
      const extensions = acceptableExtensions
        .map(ext => ext.split('/')[1].toUpperCase())
        .join(', ')
        .replace(/,(?=[^,]*$)/, ' and');

      Toast({
        type: 'error',
        message: `File Must be in ${extensions} format!`,
      });
      return;
    }
    if (file) {
      const fileLength = file.size / (1024 * 1024);
      if (fileLength <= 1) {
        setProfilePicture(e.target.files[0]);
      } else {
        Toast({
          type: 'error',
          message: 'File Size Exceeded! You can Upload Image Upto 1 MB!',
        });
      }
    }
  }

  const onSubmit = values => {
    const payload = new FormData();
    if (profile_picture) {
      payload.append('profile_picture', profile_picture);
    }

    Object.keys(values).forEach(key => {
      if (key === 'gender' && values[key]) {
        payload.append(key, values[key].value);
      } else {
        payload.append(key, values[key]);
      }
    });

    dispatch(authThunk.updateUser({ userId: user?._id, payload }));
  };
  return (
    <>
      <Head>
        <title>WebNova | SETTINGS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <Image src={profileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <input
                      id="profile-foreground-img-file-input"
                      accept="image/jpeg, image/jpg, image/png"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      {profile_picture ? (
                        <Image
                          src={URL.createObjectURL(profile_picture)}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          alt="user-profile"
                          width={250}
                          height={300}
                        />
                      ) : (
                        <Image
                          src={user?.profile_picture || avatar1}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          alt="user-profile"
                          width={250}
                          height={300}
                        />
                      )}
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <input
                          id="profile-img-file-input"
                          onChange={event => handleFileChange(event, 'image/jpeg, image/jpg, image/png')}
                          accept="image/jpeg, image/jpg, image/png"
                          type="file"
                          className="profile-img-file-input"
                        />
                        <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill" />
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">{user ? `${user?.first_name} ${user?.last_name}` : null}</h5>
                    <p className="text-muted mb-0">{user ? user?.email : null}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                    <NavItem>
                      <NavLink
                        href="#"
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => {
                          tabChange('1');
                        }}
                        type="button">
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                          tabChange('2');
                        }}
                        type="button">
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="firstnameInput" className="form-label">
                                  First Name *
                                </Label>
                                <Input type="text" placeholder="Firstname" name="first_name" value={user?.first_name} />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="lastnameInput" className="form-label">
                                  Last Name *
                                </Label>
                                <Input type="text" placeholder="Lastname" name="last_name" value={user?.last_name} />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="emailInput" className="form-label">
                                  Email Address *
                                </Label>
                                <Input type="email" disabled placeholder="Email" name="email" value={user?.email} />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="col-6">
                                <Label className="form-label" htmlFor="dob-input">
                                  Date of Birth *
                                </Label>
                                <div className="position-relative auth-pass-inputgroup">
                                  <Input name="DOB" value={user?.DOB} type="date" placeholder="Select DOB" disabled />
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="genderInput" className="form-label">
                                  Gender
                                </Label>
                                <Input
                                  name="gender"
                                  type="select"
                                  value={user && genderOptions?.find(option => option?.value === user?.gender)}
                                  options={genderOptions}
                                  hideSelectedOptions={false}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <Button
                                  type="submit"
                                  loading={isLoading}
                                  disabled={isLoading}
                                  className="btn btn-primary">
                                  Update Info.
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Formik>
                    </TabPane>

                    <TabPane tabId="2">
                      <UpdatePassword />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withAuthProtection(Settings);
