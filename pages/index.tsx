import type { NextPage } from "next";
import Head from "next/head";

const Root: NextPage = () => {
  return (
    <>
      <Head>
        <title>Canvas Nft Market</title>
        <meta name="description" content="goerli nft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
};

export default Root;
