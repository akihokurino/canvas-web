import { MantineProvider } from "@mantine/core";
import { WalletProvider } from "context/wallet";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Canvas Nft Market</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
