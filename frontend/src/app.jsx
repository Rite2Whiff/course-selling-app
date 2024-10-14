import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddCourse from "./Components/Admin/AddCourse";
import Courses from "./Components/Admin/Courses";
export function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="flex py-5 justify-between mx-10">
          <div>My Course Selling App</div>
          <ul className="flex gap-x-5 justify-between">
            <Link to="/">Home</Link>
            {localStorage.getItem("token") ? (
              <Link className="mx-3" to="/signup">
                Signup
              </Link>
            ) : null}
            <Link to="/login">Login</Link>
          </ul>
        </div>
      </header>
      <main className="max-w-screen-xl mx-auto flex justify-center items-center h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/courses" element={<Courses />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
