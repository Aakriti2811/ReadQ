import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Wishlist from "./components/Wishlist";
import About from "./components/About";
import FreeReads from "./components/FreeReads";
import PDFViewerPage from "./components/PdfViewer";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={ <Courses />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/freereads" element={<FreeReads />} />
          <Route path="/read/:gridfsId" element={<PDFViewerPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
