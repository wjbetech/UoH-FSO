import { Home } from "./components/Home";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
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
        <Link to="/addbook">
          <button>Add Book</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/addbook" element={<NewBook />}></Route>
        <Route path="/authors" element={<Authors />}></Route>
      </Routes>
    </div>
  );
};

export default App;
