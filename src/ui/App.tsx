import React, { useState, useEffect } from "react";
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
import introspectionResult from "../generated/graphql.schema.json";
import { withScalars } from "apollo-link-scalars";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WorkList } from "./WorkList";
import { WorkDetail } from "./WorkDetail";
import { getAuth, signInAnonymously } from "firebase/auth";

const GRAPHQL_ENDPOINT = "https://canvas-329810.an.r.appspot.com/query";

const authLink = setContext(async (_, { headers, ...context }) => {
  const auth = getAuth();
  const token = await auth.currentUser!.getIdToken();

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

function App() {
  const [logined, setLogined] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setLogined(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorMessage}, code = ${errorCode}`);
      });
  }, []);

  const render = () => {
    if (logined) {
      return (
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<WorkList />} />
              <Route path="/:work_id" element={<WorkDetail />} />
            </Routes>
          </Router>
        </ApolloProvider>
      );
    } else {
      return <div></div>;
    }
  };

  return <div>{render()}</div>;
}

export default App;
