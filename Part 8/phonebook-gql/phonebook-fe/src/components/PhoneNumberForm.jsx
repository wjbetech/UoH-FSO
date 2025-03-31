import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ALL_PERSONS, EDIT_PHONENUMBER } from "../queries/queries";

const PhoneNumberForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [editPhoneNumber, result] = useMutation(EDIT_PHONENUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }]
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, phoneNumber);
    editPhoneNumber({ variables: { name, phoneNumber } });
    setName("");
    setPhoneNumber("");
  };

  useEffect(() => {
    if (result.data && result.data.editPhoneNumber === null) {
      console.log("That person was not found!");
    }
  }, [result.data]);

  return (
    <div>
      <h2>Change Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone Number: <input value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PhoneNumberForm;
