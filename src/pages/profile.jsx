import React from 'react';
import Head from 'next/head';
import avatar from '../../public/images/users/user-avatar.png';
import { Container, Row, Col, Card, Alert, CardBody, Label } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from '../components/Atoms/Input';
import { useSelector } from 'react-redux';
import withAuthProtection from '@/components/Common/withAuthProtection';
import Image from 'next/image';

const Profile = () => {
  const user = useSelector(state => state?.Auth?.user);
  return (
    <>
      <Head>
        <title>WebNova | PROFILE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Alert color="warning">
              If you would like to update your profile information, please navigate to the Settings page.
            </Alert>

            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <Image
                        src={user?.profile_picture || avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{`${user?.first_name} ${user?.last_name}`}</h5>
                        <p className="mb-1">{user?.email}</p>
                        <p className="mb-0">{user?.role?.type}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Profile Information</h4>

          <Card>
            <CardBody>
              <Formik>
                <Form>
                  <Row>
                    <Col xs={6}>
                      <div className="form-group">
                        <Label className="form-label">First Name</Label>
                        <Input
                          name="first_name"
                          value={user?.first_name}
                          placeholder="Enter First Name"
                          type="text"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="form-group">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="first_name"
                          value={user?.last_name}
                          placeholder="Enter First Name"
                          type="text"
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col xs={6}>
                      <div className="form-group">
                        <Label className="form-label">Email</Label>
                        <Input name="email" value={user?.email} placeholder="Enter Email" type="text" disabled />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="form-group">
                        <Label className="form-label">Date of Birth</Label>
                        <Input
                          name="email"
                          value={new Date(user?.DOB).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                          placeholder="Enter Email"
                          type="text"
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Formik>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withAuthProtection(Profile);
