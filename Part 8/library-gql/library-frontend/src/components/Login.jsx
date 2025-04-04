import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result.data) {
    }
  }, []);

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
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="login-form password-input">
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>;
};
