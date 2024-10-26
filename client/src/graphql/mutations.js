import gql from "graphql-tag";

export const ADD_ORDER = gql`
  mutation AddOrder($items: [ItemInput!]!, $price: Float!) {
    addOrder(items: $items, price: $price)
  }
`;
