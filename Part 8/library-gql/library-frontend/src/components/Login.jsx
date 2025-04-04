import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data, setToken]);

  const handleSubmit = (event) => {
    event.preventDefault;
    console.log("login handleSubmit data: ", username, password);
    login({
      variables: { username, password }
    });
  };

  return <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div className="login-form username-input">
        <label>Username:</label>
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div className="login-form password-input">
        <label>Password:</label>
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>;
};

export default Login;