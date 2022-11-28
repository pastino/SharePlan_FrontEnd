import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { AsyncStorage } from "react-native";
import options from "./apollo";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        flower: require("./assets/fonts/GamjaFlower.ttf"),
      });
      await Asset.loadAsync([require("./assets/basicPicture.jpg")]);

      const cache = new InMemoryCache();

      const request = async (operation) => {
        const token = await AsyncStorage.getItem("jwt");

        return operation.setContext({
          headers: { Authorization: `Bearer ${token}` },
        });
      };

      const requestLink = new ApolloLink(
        (operation, forward) =>
          new Observable((observer) => {
            let handle;
            Promise.resolve(operation)
              .then((oper) => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(observer.error.bind(observer));

            return () => {
              if (handle) handle.unsubscribe();
            };
          })
      );

      const httpLink = new HttpLink({
        uri: options.httpLink,
        credentials: "include",
      });

      const wsLink = new WebSocketLink({
        uri: options.wsLink,
        options: {
          reconnect: true,
        },
      });

      const client = new ApolloClient({
        link: ApolloLink.from([
          requestLink,
          split(
            // split based on operation type
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
              );
            },
            wsLink,
            httpLink
          ),
        ]),
        cache,
      });

      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
