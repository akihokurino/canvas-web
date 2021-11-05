import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { buildClientSchema } from "graphql";
import introspectionResult from "../generated/graphql.schema.json";
import { withScalars } from "apollo-link-scalars";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WorkList } from "./WorkList";
import { WorkDetail } from "./WorkDetail";

const GRAPHQL_ENDPOINT = "https://canvas-329810.an.r.appspot.com/query";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "X-User-Id": "1",
    },
  });
  return forward(operation);
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
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      ExchangeRate: {
        keyFields: ["currency"],
      },
    },
  }),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<WorkList />} />
            <Route path="/:work_id" element={<WorkDetail />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
