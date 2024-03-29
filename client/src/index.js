import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./utils/ThemeContext";
import Background from "./components/Background";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/salmandabbakuti/wetube-subgraph",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Background>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <Toaster />
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Background >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
