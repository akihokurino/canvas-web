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
import { getCollection, getSellOrders } from "infra/graphql/client";
import {
  CollectionModelFragment,
  SellOrderModelFragment,
} from "infra/graphql/generated/types";
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  collection: CollectionModelFragment;
  orders: SellOrderModelFragment[];
  cursor: string;
};

const CollectionDetail: NextPage<Props> = (props) => {
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
            {props.orders.map((order) => (
              <Grid.Col span={4} key={order.tokenId}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src={order.imageUrl} height={500} />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{order.name}</Text>
                    <Badge color="pink" variant="light">
                      On Sale
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    価格: {order.priceEth} ether
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    購入
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
  ParamsOf<typeof Routes.Collection>
> = async (context) => {
  try {
    const { address } = context.params ?? {};
    if (!address) {
      return {
        notFound: true,
      };
    }

    const { collection } = await getCollection(address);
    const { orders, cursor } = await getSellOrders(address);

    return {
      props: {
        collection,
        orders,
        cursor,
      },
    };
  } catch (error) {
    throw error;
  }
};

export default CollectionDetail;
