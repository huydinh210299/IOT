import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, registerAction } from '../../redux/actions/authAction';
import { Spin } from 'antd';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { Form, Input, Card, Button } from 'antd';
import video from '../../assets/iot_login.mp4';

const videoS = {
  position: 'fixed',
  right: '0',
  bottom: '0',
  minWidth: '100%',
  minHeight: '100%',
  zIndex: 0,
};

const LoginRegister = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isRequesting } = useSelector((state) => state.authReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const history = useHistory();
  if (isRequesting) {
    console.log('Requesting!');
  }

  // {
  //   email: 'pasestars@gmail.com',
  //   password: 'cuongdv172986',
  // }
  const onFinish = (values) => {
    if (tab == 'Login') {
      dispatch(loginAction(values));
    } else {
      delete values.confirm;
      dispatch(registerAction(values));
    }
    console.log('Input login - register:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed login:', errorInfo);
  };

  const listContentTabs = {
    Login: (
      <Form
        layout="vertical"
        name="basic"
        size="middle"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Your email is invalid!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              type: 'string',
              min: 8,
              required: true,
              message: 'Must be 8 characters!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className="_center">
            <Button
              type="primary"
              style={{ width: '100%' }}
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </div>
        </Form.Item>
      </Form>
    ),
    Register: (
      <Form
        layout="vertical"
        // {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter your name 6 to 30 charaters!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
        // {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  const [tab, setTab] = useState('Login');

  const tabList = [
    {
      key: 'Login',
      tab: 'Login',
    },
    {
      key: 'Register',
      tab: 'Register',
    },
  ];
  if (isAuthenticated === true) {
    if (history.location.state && history.location.state.from) {
      history.replace(history.location.state.from);
      return null;
    } else
      return (
        <Redirect
          to={{ pathname: '/home', state: { from: history.location } }}
        />
      );
  } else
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <div>
          <video style={videoS} autoPlay muted loop id="myVideo">
            <source src={video} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
        {isRequesting ? (
          <Spin spinning={isRequesting}>
            <Card
              style={{ minWidth: '400px' }}
              tabList={tabList}
              activeTabKey={tab}
              onTabChange={(key) => {
                setTab(key);
              }}
            >
              {listContentTabs[tab]}
            </Card>
          </Spin>
        ) : (
          <Card
            style={{ minWidth: '400px' }}
            tabList={tabList}
            activeTabKey={tab}
            onTabChange={(key) => {
              setTab(key);
            }}
          >
            {listContentTabs[tab]}
          </Card>
        )}
      </div>
    );
};
LoginRegister.propTypes = {};

export default LoginRegister;
