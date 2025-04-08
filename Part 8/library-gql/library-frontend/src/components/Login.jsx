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
    if (result) {
      console.log("Login component result: ", result); // debugging
      if (result.data && result.data.login) {
        try {
          const token = result.data.login.value;
          // console.log("Login component token: ", token); // debugging
          setToken(token);
          localStorage.setItem("library-user-token", token);

          setUsername("");
          setPassword("");
        } catch (error) {
          console.error("Error in Login useEffect setting token: ", error.message);
        }
      }
    }
  }, [result.data, setToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Login handleSubmit data: ", username, password);
      login({
        variables: { username, password }
      });
    } catch (error) {
      console.error("Error in Login handleSubmit: ", error.message);
    }
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default Login;
