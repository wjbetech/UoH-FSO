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

  return <div></div>;
};
