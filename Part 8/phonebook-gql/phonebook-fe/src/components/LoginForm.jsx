import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

const LoginForm = ({ setError, setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonebook-user-token", token);
    }
  }, [result.data, setToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("handleSubmit data: ", username, password);
    console.log("LoginForm token: ", token);

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
