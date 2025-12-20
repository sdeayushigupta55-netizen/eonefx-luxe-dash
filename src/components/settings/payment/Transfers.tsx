import React, { useState } from 'react';
import DepositMethods from './DepositMethods';

export default function Transfers() {
  const [message, setMessage] = useState("Hello World!");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
    
    </div>
  );
}

