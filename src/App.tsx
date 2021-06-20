import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { UserOutlined } from '@ant-design/icons';

import { PageHeader, Avatar } from 'antd';
import styled from 'styled-components';

import UserApi from './api/users';
import Login from './components/Login';
import SignUp from './components/Signup';
import firebase from './firebase/index';
import MainPage from './components/MainPage';
import logo from './images/logo-header.svg';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  align-items: center;
`;

const UserInfo = () => {
  return (
    <UserInfoContainer>
      <Avatar size="medium" icon={<UserOutlined />} />
      <div>
        <div>{UserApi.getCurrentUser()?.email}</div>
        <a onClick={() => firebase.auth.signOut()}>Sign out</a>
      </div>
      ,
    </UserInfoContainer>
  );
};

const SecureApp = () => {
  return (
    <div>
      <PageHeader
        title={<img src={logo}></img>}
        className="page-header"
        extra={<UserInfo />}
      />
      <MainPage />
    </div>
  );
};

const AuthenticationApp = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route component={Login} />
    </Switch>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(firebase.auth.currentUser);
  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  const isSignedIn = Boolean(currentUser);
  return (
    <Switch>
      {!isSignedIn ? <Route component={AuthenticationApp} /> : null}
      <Route path="/app" component={SecureApp} />
      <Route component={SecureApp} />
    </Switch>
  );
};
export default App;
