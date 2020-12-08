import { Page } from 'argo-ui';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {uiUrl} from '../../../shared/base';
import {UserService} from '../../services/user-service';
import axios from 'axios';

export const Logout = () => {
    const [user, setUser] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = async () => {
        console.log(username, password);
        setUser(null);
        setUsername('');
        setPassword('');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        const endpoint = 'http://localhost:3000';
        try {
          const response = await axios.get(`${endpoint}/account/logout`);
          if (response.data.status === 'success') {
            document.location.href = uiUrl('login');
          } else {
            window.alert('logout failure');
          }
        } catch(err) {
          console.log(err);
        }
    };

    if (user) {
        return (
          <div>
            You are already loggged in
            <button onClick={handleLogout}>logout</button>
          </div>
        );
    }
    useEffect(() => {
        handleLogout();
    })
    return (
      <Page title='logout'>
          <div className='login__logo width-control'>
            <img className='logo-image' src='assets/images/devstack/logo.png' alt='devStack' />
            <div className='width-control'>
              You are logging out... wait for a moment.
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
      </Page>
    );
}
