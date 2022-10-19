import { GraphQLClient } from "graphql-request";
import {
  CollectionDocument,
  CollectionModelFragment,
  CollectionQuery,
  CollectionQueryVariables,
  CollectionsDocument,
  CollectionsQuery,
  CollectionsQueryVariables,
  SellOrderModelFragment,
  SellOrdersDocument,
  SellOrdersQuery,
  SellOrdersQueryVariables,
  WorkDocument,
  WorkModelFragment,
  WorkQuery,
  WorkQueryVariables,
  WorksDocument,
  WorksQuery,
  WorksQueryVariables,
} from "./generated/types";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPH_URI!, {
  headers: {
    "x-market-token": process.env.MARKET_TOKEN!,
  },
});

export const getCollections = async (
  cursor?: string
): Promise<{ collections: CollectionModelFragment[]; cursor: string }> => {
  try {
    const result = await client.request<
      CollectionsQuery,
      CollectionsQueryVariables
    >(CollectionsDocument, {
      cursor,
      limit: 100,
    });
    return {
      collections: result.collections.edges.map((v) => v.node),
      cursor: result.collections.nextKey,
    };
  } catch (error) {
    throw error;
  }
};

export const getCollection = async (
  address: string
): Promise<{ collection: CollectionModelFragment }> => {
  try {
    const result = await client.request<
      CollectionQuery,
      CollectionQueryVariables
    >(CollectionDocument, {
      address,
    });
    return {
      collection: result.collection,
    };
  } catch (error) {
    throw error;
  }
};

export const getSellOrders = async (
  address: string,
  cursor?: string
): Promise<{ orders: SellOrderModelFragment[]; cursor: string }> => {
  try {
    const result = await client.request<
      SellOrdersQuery,
      SellOrdersQueryVariables
    >(SellOrdersDocument, {
      address,
      cursor,
      limit: 100,
    });
    return {
      orders: result.sellOrders.edges.map((v) => v.node),
      cursor: result.sellOrders.nextKey,
    };
  } catch (error) {
    throw error;
  }
};

export const getArchives = async (
  limit: number,
  cursor?: string
): Promise<{ works: WorkModelFragment[]; cursor: string }> => {
  try {
    const result = await client.request<WorksQuery, WorksQueryVariables>(
      WorksDocument,
      {
        cursor,
        limit,
      }
    );
    return {
      works: result.works.edges.map((v) => v.node),
      cursor: result.works.nextKey,
    };
  } catch (error) {
    throw error;
  }
};

export const getArchive = async (
  id: string
): Promise<{ work: WorkModelFragment }> => {
  try {
    const result = await client.request<WorkQuery, WorkQueryVariables>(
      WorkDocument,
      {
        id,
      }
    );
    return {
      work: result.work,
    };
  } catch (error) {
    throw error;
  }
};
