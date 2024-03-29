import React from 'react';
import "./login.css";

const dummyApi = [
  { email: 'levan@levan.com', password: 'levan1', userId: 1 },
  { email: 'giorgi@giorgi.com', password: 'giorgi1', userId: 2 },
];

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const user = dummyApi.find((user) => user.email === email && user.password === password);

    if (user) {
      const token = Math.random().toString(36).substr(2);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.userId.toString()); 
      window.location.href = '/';
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className='login-cont'>
      <form onSubmit={handleSubmit}>
        <h5>E-Mail</h5>
        <input type='email' id="email" required />
        <h5>Password</h5>
        <input type='password' id="password" required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
