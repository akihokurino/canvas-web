import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/link-context";
import { buildClientSchema } from "graphql";
import introspectionResult from "./generated/graphql.schema.json";
import { withScalars } from "apollo-link-scalars";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: "canvas-329810.firebaseapp.com",
  projectId: "canvas-329810",
  storageBucket: "canvas-329810.appspot.com",
  messagingSenderId: "1077059530284",
  appId: "1:1077059530284:web:95fd5ede890db7a356eb89",
};
initializeApp(firebaseConfig);

const GRAPHQL_ENDPOINT = "https://canvas-329810.an.r.appspot.com/query";

const authLink = setContext(async (_, { headers, ...context }) => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();

  return {
    headers: {
      ...headers,
      Authorization: `bearer ${token}`,
    },
    ...context,
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    ApolloLink.from([
      withScalars({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        schema: buildClientSchema(introspectionResult as any),
      }),
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors && graphQLErrors.length > 0) {
          const error = graphQLErrors[0];
          console.log(
            `[GraphQL error]: Message: ${
              error.message
            }, Location: ${JSON.stringify(error.locations)}, Path: ${
              error.path
            }, Extensions: ${error.extensions}`
          );
        }

        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
          alert("ネットワークエラーです");
        }
      }),
      new HttpLink({ uri: GRAPHQL_ENDPOINT }),
    ])
  ),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
