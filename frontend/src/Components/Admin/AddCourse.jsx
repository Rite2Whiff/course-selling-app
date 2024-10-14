import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  async function addCourse(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/admin/course",
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      },
      { headers: { token: localStorage.getItem("token") } }
    );

    const message = response.data.message;
    alert(message);
  }

  return (
    <div className="w-1/2  border-4 shadow shadow-blue-500/40">
      <form onSubmit={addCourse} className="p-10 flex  flex-col gap-5 ">
        <input
          className=" size-full p-2"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className=" size-full p-2"
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className=" size-full p-2"
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="ImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          className=" size-full p-2"
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default Signup;
