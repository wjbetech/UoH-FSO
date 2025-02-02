const LoginForm = ({ handleLogin, username, handleUserChange, handlePasswordChange, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => handleUserChange(target.value)}
        />
      </div>
      <div className="password-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
