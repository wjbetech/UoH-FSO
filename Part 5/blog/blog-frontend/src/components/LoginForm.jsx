const LoginForm = ({ handleLogin, username, setUsername, setPassword, password, hideLogin }) => {
  return (
    <div>
      <form
        className=""
        onSubmit={handleLogin}
      >
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
        <button
          type="submit"
          onClick={hideLogin}
        >
          Hide Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
