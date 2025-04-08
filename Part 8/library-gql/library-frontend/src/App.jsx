import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("library-user-token") || "");
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const savedtoken = localStorage.getItem("library-user-token");
    if (savedtoken) {
      try {
        setToken(savedtoken);
        console.log("App component token set from localStorage: ", savedtoken);
      } catch (error) {
        console.error("Error in App component useEffect setting token: ", error.message);
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();

    // handle redirecting to login after logging out from Add Book view
    if (window.location.pathname === "/addbook") {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="links">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/authors">
          <button>Authors</button>
        </Link>
        <Link to="/books">
          <button>Books</button>
        </Link>
        {token ? (
          <>
            <Link to="/addbook">
              <button>Add Book</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/addbook" element={<NewBook />}></Route>
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
