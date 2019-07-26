import React, { useState } from "react";
import axios from "axios";

// Login Component
const App = ({ submitRequest }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [error, setError] = useState("");

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (username.length > 3 && password.length > 8) {
      try {
        const res = submitRequest({
          username,
          password
        });
        setLoggedIn(res);
      } catch (e) {
        setError(e);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={username}
          type="text"
          name="something"
          id="username"
          onChange={handleUsername}
        />
        <input
          placeholder="password"
          value={password}
          id="password"
          type="text"
          onChange={handlePassword}
        />
        <button onClick={handleSubmit} id="button" type="submit">
          Submit
        </button>
      </form>
      {loggedIn && <p className="login">You have been logged in!</p>}
      {error && <p className="error">WTF IS WRONG WITH YOU!</p>}
    </div>
  );
};

export default App;
