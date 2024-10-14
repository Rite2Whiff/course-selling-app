import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  const url = `${
    isAdmin
      ? "http://localhost:3000/admin/login"
      : "http://localhost:3000/user/login"
  }`;

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("please fill all the details");
      return;
    }
    const response = await axios.post(url, {
      email: email,
      password: password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    alert("sucessfully signed in");
  }

  return (
    <div className="w-1/2  border-4 shadow shadow-blue-500/40">
      <form onSubmit={handleLogin} className="p-10 flex  flex-col gap-5 ">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signup;
