import React from 'react';
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { useSelector } from 'react-redux';
import { isAuthenticated } from './redux/selectors/auth';

const App: React.FC = () => {
  const a = '123';
  const handleLoginBtnClick = async () => {
    const url = 'http://localhost:3000/auth/login';
    const res = await axios.get<{ success: boolean, token: string }>(
      url, { withCredentials: true },
    );
    if (res.status === 200) {
      const { token } = res.data;
      await sessionService.saveSession(token);
    }
  };

  const handleCheckBtnClick = async () => {
    await axios.get('http://localhost:3000/auth/check-session', { withCredentials: true });
  };

  const handleLogoutBtnClick = async () => {
    const url = 'http://localhost:3000/auth/logout';
    const { data } = await axios.get<{ success: boolean }>(url, { withCredentials: true });
    if (data.success) {
      await sessionService.deleteSession();
    }
  };

  const isAuth = useSelector(isAuthenticated);

  return (
    <div>
      { a }
      My React and TypeScript App!
      {
        !isAuth
          ? <button type="button" onClick={handleLoginBtnClick}>Login</button>
          : <button type="button" onClick={handleLogoutBtnClick}>Logout</button>
      }
      <button type="button" onClick={handleCheckBtnClick}>Check session</button>
    </div>
  );
};

export default App;
