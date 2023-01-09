
import React, { useState } from 'react';
import "./login.css";

function LoginForm() {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a POST request to the server with the login credentials
    await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          
          throw new Error('Invalid email or password');
        }
        return res.json();
      })
      .then((data) => {
         window.localStorage.setItem('user', JSON.stringify(data.username))
         window.location.href = '/';

      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label htmlFor="email">Email:</label><br/>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      /><br/>
      <label htmlFor="password">Password:</label><br/>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      /><br/><br/>
      <button type="submit">Log in</button>
      <a href="/signup"><button type="button" >Sign Up</button></a>
    </form>
    </div>
  );
}

export default LoginForm;