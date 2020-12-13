import { Page } from 'argo-ui';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {uiUrl} from '../../../shared/base';
import {UserService} from '../../services/user-service';
import axios from 'axios';
import {endpoint} from '../../../devstack/classes/constants';

export const Logout = () => {

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        try {
          const response = await axios.get(`${endpoint}/account/logout`);
          if (response.status === 200) {
            document.location.href = uiUrl('login');
          } else {
            window.alert('logout failure');
          }
        } catch(err) {
          console.log(err);
        }
    };

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
