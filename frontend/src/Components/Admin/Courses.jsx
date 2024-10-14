import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState("");

  async function fetchCourses() {
    const response = await axios("http://localhost:3000/admin/course/bulk", {
      headers: { token: localStorage.getItem("token") },
    });
    console.log(response);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return <div>Courses</div>;
};

export default Courses;
