import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS, ALL_GENRES } from "./queries/queries";
import updateCache from "./utils/updateCache";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("library-user-token") || "");
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const savedtoken = localStorage.getItem("library-user-token");
    if (savedtoken) {
      try {
        setToken(savedtoken);
        console.log("Token set in App/useEffect!");
      } catch (error) {
        console.error("Error in App component useEffect setting token: ", error.message);
      }
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);

      // Update ALL_GENRES query
      client.cache.updateQuery({ query: ALL_GENRES }, (data) => ({
        allGenres: [...new Set([...(data?.allGenres || []), ...addedBook.genres])]
      }));
    }
  });
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
            <Link to="/recommendations">
              <button>Recommend</button>
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
        <Route path="/recommendations" element={<Recommendations />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
