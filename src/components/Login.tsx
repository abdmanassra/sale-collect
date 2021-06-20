import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Form, Input, Button, message, Row, Col } from 'antd';
import usersApi from '../api/users';
import logo from '../images/logo.svg';

const layout = {
  wrapperCol: { span: 24 },
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
    font-size: 13px;
    line-height: 22px;
  }
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 358px;
  height: 300px;
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

const Login = ({ history }) => {
  const onFinish = async (values: any) => {
    try {
      await usersApi.signIn(values);
      history.push('/app');
    } catch (error) {
      const errorMessage = error.message;
      message.error(errorMessage, 5);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <img alt="logo" src={logo} />
      <LoginForm>
        <Text>
          <p> Sign in </p>
        </Text>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <Row>
            <Col span={18}>
              <span className="spanTxt">Don't have an account?</span>
            </Col>
            <Col span={6}>
              <span className="spanTxt">
                <Link to="/sign-up">Sign up</Link>
              </span>
            </Col>
          </Row>
        </Form>
      </LoginForm>
    </Container>
  );
};

export default Login;
