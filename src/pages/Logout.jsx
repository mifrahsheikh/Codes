import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    navigate('/sign-in');
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
