import React from 'react';
import './Error.css'; // Make sure to create and import the corresponding CSS file

interface ErrorProps {
  errStr: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ errStr }) => {
  return (
    <div id="err-page">
      <div id="err-container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <h3>{errStr}</h3>
      </div>
    </div>
  );
};

export default ErrorComponent;
