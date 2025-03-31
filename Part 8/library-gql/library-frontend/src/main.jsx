import ReactDOM from "react-dom/client";
import "./styles.css";

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
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
