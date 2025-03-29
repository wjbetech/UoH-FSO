import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Routes>
        <Route>
          <Link to="/authors" component={<Authors show={page === "authors"} />}></Link>
        </Route>

        <Route to="/books" component={<Books show={page === "books"} />}></Route>
        <Route to="/newbook" component={<NewBook show={page === "add"} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
