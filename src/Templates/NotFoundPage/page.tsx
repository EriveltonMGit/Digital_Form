import React from 'react';
import { Button } from 'antd'; 
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not_found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Page Not Found</p>
        <p className="not-found-description">The page you are looking for does not exist.</p>
        <Button className="back-home-button" type="primary" href="/">
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
