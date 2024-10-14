import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

export function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="flex justify-between mx-10">
          <div>My Course Selling App</div>
          <ul className="flex justify-between">
            <Link to="/">Home</Link>
            <Link className="mx-3" to="/signup">
              Signup
            </Link>
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
      </main>
    </BrowserRouter>
  );
}
