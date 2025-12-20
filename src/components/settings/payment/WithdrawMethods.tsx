import React, { useState } from 'react';
import DepositMethods from './DepositMethods';

export default function WithdrawMethods() {
  const [message, setMessage] = useState("Hello World!");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <button onClick={() => setMessage("Welcome to React!")}>
        Click Me!
      </button>
    </div>
  );
}

