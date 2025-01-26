const LoginForm = ({ handleLogin, username, setUsername, setPassword, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="password-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
