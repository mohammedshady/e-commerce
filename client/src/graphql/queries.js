import gql from "graphql-tag";

export const GET_ITEMS = gql`
  query GetItems($category: String!) {
    products(category: $category) {
      id
      name
      gallery
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      category
      in_stock
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetItems($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      category
      description
      in_stock
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;
