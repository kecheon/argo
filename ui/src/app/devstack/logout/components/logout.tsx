import * as React from 'react';
import { useEffect, useState } from 'react';
import {uiUrl} from '../../../shared/base';

export const Logout = () => {
    const [user, setUser] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = () => {
        console.log(username, password);
        setUser(null);
        setUsername('');
        setPassword('');
        localStorage.clear();
        document.location.href=uiUrl('login');
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
      <div>
          You are logging out... wait for a moment.
          <button onClick={handleLogout}>logout</button>
      </div>
    );
}
