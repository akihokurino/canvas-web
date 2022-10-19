import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Header,
  Image,
  Text,
  Title,
} from "@mantine/core";
import Routes from "app/routes";
import { ParamsOf } from "hooks/use-match";
import { getCollections } from "infra/graphql/client";
import { CollectionModelFragment } from "infra/graphql/generated/types";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

type Props = {
  collections: CollectionModelFragment[];
  cursor: string;
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Canvas Nft Market</title>
        <meta name="description" content="goerli nft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Title order={2}>NFT Market in Goerli</Title>
          </div>
        </Header>
        <Box
          sx={(theme) => ({
            padding: 20,
          })}
        >
          <Grid>
            {props.collections.map((collection) => (
              <Grid.Col span={4} key={collection.address}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Card.Section>
                    <Grid
                      sx={(theme) => ({
                        padding: 15,
                      })}
                    >
                      {collection.sellOrders.map((order) => (
                        <Grid.Col span={4} key={order.tokenId}>
                          <Image
                            src={order.imageUrl}
                            height={200}
                            radius="md"
                          />
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{collection.name}</Text>
                    <Badge color="pink" variant="light">
                      On Sale
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {collection.address}
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    詳細
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  ParamsOf<typeof Routes.Home>
> = async () => {
  try {
    const { collections, cursor } = await getCollections();

    return {
      props: {
        collections: collections.filter((v) => v.sellOrders.length > 0),
        cursor,
      },
    };
  } catch (error) {
    throw error;
  }
};

export default Home;
