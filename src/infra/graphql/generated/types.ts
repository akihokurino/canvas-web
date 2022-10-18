import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String'];
  sellOrders: Array<SellOrder>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  edges: Array<CollectionEdge>;
  nextKey: Scalars['String'];
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  node: Collection;
};

export type Frame = {
  __typename?: 'Frame';
  id: Scalars['String'];
  imagePath: Scalars['String'];
  signedImageUrl: Scalars['String'];
  work: Work;
  workId: Scalars['String'];
};

export type FrameConnection = {
  __typename?: 'FrameConnection';
  edges: Array<FrameEdge>;
  nextKey: Scalars['String'];
  totalCount?: Maybe<Scalars['Int']>;
};

export type FrameEdge = {
  __typename?: 'FrameEdge';
  node: Frame;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  collection: Collection;
  collections: CollectionConnection;
  frames: FrameConnection;
  sellOrders: SellOrderConnection;
  work: Work;
  works: WorkConnection;
};


export type QueryRootCollectionArgs = {
  address: Scalars['String'];
};


export type QueryRootCollectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['String']>;
};


export type QueryRootFramesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['String']>;
  workId: Scalars['String'];
};


export type QueryRootSellOrdersArgs = {
  address: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['String']>;
};


export type QueryRootWorkArgs = {
  id: Scalars['String'];
};


export type QueryRootWorksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['String']>;
};

export type SellOrder = {
  __typename?: 'SellOrder';
  address: Scalars['String'];
  contract: Collection;
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  priceEth?: Maybe<Scalars['Float']>;
  tokenId: Scalars['String'];
};

export type SellOrderConnection = {
  __typename?: 'SellOrderConnection';
  edges: Array<SellOrderEdge>;
  nextKey: Scalars['String'];
  totalCount?: Maybe<Scalars['Int']>;
};

export type SellOrderEdge = {
  __typename?: 'SellOrderEdge';
  node: SellOrder;
};

export type Work = {
  __typename?: 'Work';
  frames: Array<Frame>;
  id: Scalars['String'];
  signedVideoUrl: Scalars['String'];
  videoPath: Scalars['String'];
};

export type WorkConnection = {
  __typename?: 'WorkConnection';
  edges: Array<WorkEdge>;
  nextKey: Scalars['String'];
  totalCount?: Maybe<Scalars['Int']>;
};

export type WorkEdge = {
  __typename?: 'WorkEdge';
  node: Work;
};

export type WorksQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type WorksQuery = { __typename?: 'QueryRoot', works: { __typename?: 'WorkConnection', nextKey: string, edges: Array<{ __typename?: 'WorkEdge', node: { __typename?: 'Work', id: string, signedVideoUrl: string, frames: Array<{ __typename?: 'Frame', id: string, signedImageUrl: string }> } }> } };

export type WorkQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type WorkQuery = { __typename?: 'QueryRoot', work: { __typename?: 'Work', id: string, signedVideoUrl: string, frames: Array<{ __typename?: 'Frame', id: string, signedImageUrl: string }> } };

export type CollectionsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type CollectionsQuery = { __typename?: 'QueryRoot', collections: { __typename?: 'CollectionConnection', nextKey: string, edges: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', address: string, sellOrders: Array<{ __typename?: 'SellOrder', address: string, tokenId: string, name: string, description: string, imageUrl: string, priceEth?: number | null }> } }> } };

export type CollectionQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type CollectionQuery = { __typename?: 'QueryRoot', collection: { __typename?: 'Collection', address: string, sellOrders: Array<{ __typename?: 'SellOrder', address: string, tokenId: string, name: string, description: string, imageUrl: string, priceEth?: number | null }> } };

export type SellOrdersQueryVariables = Exact<{
  address: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type SellOrdersQuery = { __typename?: 'QueryRoot', sellOrders: { __typename?: 'SellOrderConnection', nextKey: string, edges: Array<{ __typename?: 'SellOrderEdge', node: { __typename?: 'SellOrder', address: string, tokenId: string, name: string, description: string, imageUrl: string, priceEth?: number | null } }> } };

export type WorkModelFragment = { __typename?: 'Work', id: string, signedVideoUrl: string, frames: Array<{ __typename?: 'Frame', id: string, signedImageUrl: string }> };

export type FrameModelFragment = { __typename?: 'Frame', id: string, signedImageUrl: string };

export type CollectionModelFragment = { __typename?: 'Collection', address: string, sellOrders: Array<{ __typename?: 'SellOrder', address: string, tokenId: string, name: string, description: string, imageUrl: string, priceEth?: number | null }> };

export type SellOrderModelFragment = { __typename?: 'SellOrder', address: string, tokenId: string, name: string, description: string, imageUrl: string, priceEth?: number | null };

export const FrameModelFragmentDoc = gql`
    fragment FrameModel on Frame {
  id
  signedImageUrl
}
    `;
export const WorkModelFragmentDoc = gql`
    fragment WorkModel on Work {
  id
  signedVideoUrl
  frames {
    ...FrameModel
  }
}
    ${FrameModelFragmentDoc}`;
export const SellOrderModelFragmentDoc = gql`
    fragment SellOrderModel on SellOrder {
  address
  tokenId
  name
  description
  imageUrl
  priceEth
}
    `;
export const CollectionModelFragmentDoc = gql`
    fragment CollectionModel on Collection {
  address
  sellOrders {
    ...SellOrderModel
  }
}
    ${SellOrderModelFragmentDoc}`;
export const WorksDocument = gql`
    query Works($cursor: String, $limit: Int) {
  works(nextKey: $cursor, limit: $limit) {
    edges {
      node {
        ...WorkModel
      }
    }
    nextKey
  }
}
    ${WorkModelFragmentDoc}`;
export const WorkDocument = gql`
    query Work($id: String!) {
  work(id: $id) {
    ...WorkModel
  }
}
    ${WorkModelFragmentDoc}`;
export const CollectionsDocument = gql`
    query Collections($cursor: String, $limit: Int!) {
  collections(nextKey: $cursor, limit: $limit) {
    edges {
      node {
        ...CollectionModel
      }
    }
    nextKey
  }
}
    ${CollectionModelFragmentDoc}`;
export const CollectionDocument = gql`
    query Collection($address: String!) {
  collection(address: $address) {
    ...CollectionModel
  }
}
    ${CollectionModelFragmentDoc}`;
export const SellOrdersDocument = gql`
    query SellOrders($address: String!, $cursor: String, $limit: Int!) {
  sellOrders(address: $address, nextKey: $cursor, limit: $limit) {
    edges {
      node {
        ...SellOrderModel
      }
    }
    nextKey
  }
}
    ${SellOrderModelFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Works(variables?: WorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<WorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorksQuery>(WorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Works', 'query');
    },
    Work(variables: WorkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<WorkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkQuery>(WorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Work', 'query');
    },
    Collections(variables: CollectionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionsQuery>(CollectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Collections', 'query');
    },
    Collection(variables: CollectionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionQuery>(CollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Collection', 'query');
    },
    SellOrders(variables: SellOrdersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SellOrdersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SellOrdersQuery>(SellOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SellOrders', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;