import ReactDOM from "react-dom/client";
import "./styles.css";

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  uri: "http://localhost:4000",
  headers: {
    authorization: localStorage.getItem("library-user-token")
      ? `Bearer ${localStorage.getItem("library-user-token")}`
      : null
  }
});

// react-router
import { BrowserRouter as Router } from "react-router-dom";

// components
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
