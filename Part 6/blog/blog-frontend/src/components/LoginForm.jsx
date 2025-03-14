const LoginForm = ({ handleLogin, username, setUsername, setPassword, password, setLoginVisible }) => {
  return (
    <div className="form">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className="username-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            data-testid="username"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            data-testid="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <button
        className="login-form-button"
        onClick={() => setLoginVisible(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default LoginForm;
