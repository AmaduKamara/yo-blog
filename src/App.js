import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("signin");
      navigate("/auth");
    });
  };

  return (
    <div>
      <Header
        active={active}
        setActive={setActive}
        user={user}
        handleLogOut={handleLogOut}
      />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
