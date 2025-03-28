import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_PHONENUMBER } from "../queries/queries";

const PhoneNumberForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [changePhoneNumber] = useMutation(EDIT_PHONENUMBER);

  const handleSubmit = (event) => {
    event.preventDefault();
    changePhoneNumber({ variables: { name, phoneNumber } });
    setName("");
    setPhoneNumber("");
  };

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
