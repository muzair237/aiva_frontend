import React, { useState, useEffect } from 'react';
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
import Input from '@/components/Atoms/Input';
import classnames from 'classnames';
import profileBg from '../../public/images/cover-pattern.png';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
// import { updateProfile, editProfilePicture, resetPassword } from '../../slices/auth/thunk';
import avatar1 from '../../public/images/users/user-avatar.png';
import UpdatePassword from '@/components/Organisms/UpdatePassword';
import Button from '@/components/Atoms/Button';

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
  const heights = [];
  for (let i = 100; i <= 250; i++) {
    heights.push(i);
  }
  const weights = [];
  const increment = 1;
  const maxWeight = 150;

  for (let i = 30; i <= maxWeight; i += increment) {
    weights.push(i);
  }
  const user = useSelector(state => state?.Auth?.user);
  const userId = useSelector(state => state?.Login?.user?._id);
  const [activeTab, setActiveTab] = useState('1');

  const tabChange = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    gender: user?.gender ? user?.gender : '',
  };
  const validationSchema = yup.object().shape({
    first_name: yup.string().min(3, 'First Name should be atleast 3 Characters').required('First name is required'),
    last_name: yup.string().min(3, 'Last Name should be atleast 3 Characters').required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    gender: yup.string(),
  });
  const onSubmit = values => {
    const profileInfo = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      DOBmonths: values.DOBmonths,
      DOBdays: values.DOBdays,
      DOByears: values.DOByears,
      country: values.country,
      city: values.city,
      gender: values.gender,
      bloodGroup: values.bloodGroup,
      age: values.age,
      height: values.height,
      weight: values.weight,
    };
    dispatch(updateProfile({ profileInfo, userId }));
  };

  // Count the number of fields that are not empty
  // const filledFieldCount = [
  //   firstname,
  //   lastname,
  //   email,
  //   DOBmonths,
  //   DOBdays,
  //   DOByears,
  //   country,
  //   city,
  //   gender,
  //   bloodGroup,
  //   age,
  //   height,
  //   weight,
  // ].filter(value => value !== '').length;

  // // Calculate the progress percentage
  // const totalFieldCount = 13; // Total number of fields
  // const progressPercentagee = Math.floor((filledFieldCount / totalFieldCount) * 100);

  const handleFileChange = event => {
    const file = event.target.files[0];

    const payload = new FormData();
    payload.append('userId', user?._id);
    payload.append('profilePicture', file);
    dispatch(editProfilePicture({ payload }));
  };
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorSignal, setPasswordErrorSignal] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const handleChangePassword = () => {
    if (confirmPassword !== newPassword) {
      setPasswordError('Password must match!');
      setPasswordErrorSignal(true);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password must contain at least 6 characters, one uppercase letter, and one special character (@, $, !, %, *, ?, or &)',
      );
      setPasswordErrorSignal(true);
      return;
    }
    const passwordInfo = {
      email: user?.email,
      newPassword: confirmPassword,
    };
    console.log(passwordInfo);
    dispatch(resetPassword({ passwordInfo }));
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
                      <Image
                        src={user?.profile_picture || avatar1}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <input
                          id="profile-img-file-input"
                          onChange={event => handleFileChange(event)}
                          type="file"
                          className="profile-img-file-input"
                        />
                        <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">{user ? user?.first_name + ' ' + user?.last_name : null}</h5>
                    <p className="text-muted mb-0">{user ? user?.email : null}</p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-5">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Complete Your Settings</h5>
                    </div>
                    <div className="flex-shrink-0"></div>
                  </div>
                  {/* <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: `${progressPercentagee}%` }}
                      aria-valuenow={`${progressPercentagee}`}
                      aria-valuemin="0"
                      aria-valuemax="100">
                      <div className="label">{progressPercentagee}%</div>
                    </div>
                  </div> */}
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
                                  type="select"
                                  name="gender"
                                  value={genderOptions?.find(option => option?.value === user?.gender) || ''}
                                  options={genderOptions}
                                  hideSelectedOptions={false}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <Button type="submit" className="btn btn-primary">
                                  Update
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

export default Settings;
