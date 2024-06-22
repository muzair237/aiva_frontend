import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Enquiry = () => {
  const initialValues = { name: '', email: '', subject: '', message: '' };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Please enter your name!')
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be less than 50 characters long'),
    email: Yup.string().required('Please enter your email!').email('Please enter a valid email!'),
    subject: Yup.string()
      .required('Please enter a subject!')
      .min(5, 'Subject must be at least 5 characters long')
      .max(100, 'Subject must be less than 100 characters long'),
    message: Yup.string()
      .required('Please enter your message!')
      .min(10, 'Message must be at least 10 characters long')
      .max(500, 'Message must be less than 500 characters long'),
  });

  const onSubmit = async payload => {
    // dispatch(authThunk.login({ payload, router }));
  };

  return (
    <>
      <section className="section" id="enquiry">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">Get In Touch</h3>
                <p className="text-muted mb-4 ff-secondary">
                  We value your feedback and suggestions. If you need to contact higher authorities or provide any
                  recommendations, feel free to reach out. You can also ask any of your questions through WebNova, our
                  intelligent virtual assistant, for quick and accurate responses.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="gy-4">
            <Col lg={4}>
              <div>
                <div className="mt-4">
                  <h5 className="fs-13 text-muted text-uppercase">Office Address 1:</h5>
                  <div className="ff-secondary fw-semibold">
                    47 Tufail Road, Saddar Town,
                    <br />
                    Lahore, Punjab
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fs-13 text-muted text-uppercase">Working Hours:</h5>
                  <div className="ff-secondary fw-semibold">08:00am to 06:00pm</div>
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <div>
                <Formik initialValues={initialValues} validationSchema={validationSchema}>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-4">
                          <label htmlFor="name" className="form-label fs-13">
                            Name
                          </label>
                          <Input
                            name="name"
                            id="name"
                            type="text"
                            className="form-control bg-light border-light"
                            placeholder="Your name*"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-4">
                          <label htmlFor="email" className="form-label fs-13">
                            Email
                          </label>
                          <Input
                            name="email"
                            id="email"
                            type="email"
                            className="form-control bg-light border-light"
                            placeholder="Your email*"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-4">
                          <label htmlFor="subject" className="form-label fs-13">
                            Subject
                          </label>
                          <Input
                            type="text"
                            className="form-control bg-light border-light"
                            id="subject"
                            name="subject"
                            placeholder="Your Subject.."
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <label htmlFor="comments" className="form-label fs-13">
                            Message
                          </label>
                          <Input
                            name="message"
                            rows="3"
                            type="textarea"
                            className="form-control bg-light border-light"
                            placeholder="Your message..."
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} className="text-end">
                        <Button
                          color="primary"
                          // loading={isLoading}
                          // disabled={isLoading}
                          type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Enquiry;
