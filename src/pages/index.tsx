import Routes from "app/routes";
import { ParamsOf } from "hooks/use-match";
import { getCollections } from "infra/graphql/client";
import { CollectionModelFragment } from "infra/graphql/generated/types";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Canvas Nft Market</title>
        <meta name="description" content="goerli nft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="">Hello world!</h1>
      </main>
    </>
  );
};

type Props = {
  collections: CollectionModelFragment[];
  cursor: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  ParamsOf<typeof Routes.Home>
> = async () => {
  try {
    const { collections, cursor } = await getCollections();

    return {
      props: {
        collections,
        cursor,
      },
    };
  } catch (error) {
    throw error;
  }
};

export default Home;
