import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  const url = `${
    isAdmin
      ? "http://localhost:3000/admin/signup"
      : "http://localhost:3000/user/signup"
  }`;

  async function handleSignup(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert("please fill all the details");
      return;
    }
    const response = await axios.post(url, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    const message = response.data.message;
    alert(message);
  }

  return (
    <div className="w-1/2  border-4 shadow shadow-blue-500/40">
      <form onSubmit={handleSignup} className="p-10 flex  flex-col gap-5 ">
        <input
          className=" size-full p-2 border-1 "
          type="text"
          name="first-name"
          id="first-name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="size-full p-2"
          type="text"
          name="last-name"
          id="last-name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className=" size-full p-2"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className=" size-full p-2"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
