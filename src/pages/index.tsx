import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import Routes from "app/routes";
import { AppHeader } from "components/header";
import { ParamsOf } from "hooks/use-match";
import { CollectionModelFragment } from "infra/graphql/generated/types";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  collections: CollectionModelFragment[];
  cursor: string;
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <main>
        <AppHeader />
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

                  <Link href={`/collection/${collection.address}`}>
                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      mt="md"
                      radius="md"
                    >
                      詳細
                    </Button>
                  </Link>
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
    // const { collections, cursor } = await getCollections();

    // return {
    //   props: {
    //     collections: collections.filter((v) => v.sellOrders.length > 0),
    //     cursor,
    //   },
    // };

    return {
      props: {
        collections: [],
        cursor: "",
      },
    };
  } catch (error) {
    throw error;
  }
};

export default Home;
