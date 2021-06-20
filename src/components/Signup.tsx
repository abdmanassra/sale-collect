import React from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import usersApi from '../api/users';
import logo from '../images/logo.svg';

const formItemLayout = {
  wrapperCol: { span: 24 },
};

const RegistrationForm = ({ history }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await usersApi.signUp(values);
      history.push('/app');
    } catch (error) {
      message.error(error.message);
    }
  };

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    img {
      margin-bottom: 20px;
    }

    .spanTxt {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
    }
  `;

  const SignupForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 358px;
    height: 332px;
    background: #f4faff;
    box-shadow: 0px 0px 20px -13px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  `;

  const Text = styled.span`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
  `;

  return (
    <Container>
      <img alt="logo" src={logo} />
      <SignupForm>
        <Text>
          <p> Sign up </p>
        </Text>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Row>
            <Col span={18}>
              <span className="spanTxt">Already have an account?</span>
            </Col>
            <Col span={6}>
              <span className="spanTxt">
                <Link to="/sign-in">Sign in</Link>
              </span>
            </Col>
          </Row>
        </Form>
      </SignupForm>
    </Container>
  );
};

export default RegistrationForm;
