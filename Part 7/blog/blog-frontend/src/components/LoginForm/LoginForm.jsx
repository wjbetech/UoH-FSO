// mui components
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  setPassword,
  password,
  setLoginVisible,
}) => {
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
        <Button
          type="submit"
          data-testid="login-submit-button"
          onClick={handleLogin}
          sx={{ marginTop: "8px", marginBottom: "12px", width: "200px" }}
          variant="contained"
        >
          Login
          <LoginIcon sx={{ marginLeft: "8px" }} />
        </Button>
      </form>
      <Button
        variant="contained"
        color="error"
        sx={{ width: "200px" }}
        onClick={() => setLoginVisible(false)}
      >
        Cancel
        <CloseIcon sx={{ marginLeft: "8px" }} />
      </Button>
    </div>
  );
};

export default LoginForm;
