import ReactDOM from "react-dom/client";
import "./styles.css";

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

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

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/"
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
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
