import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($subcategory: ID) {
    products(subcategory: $subcategory) {
      _id
      name
      description
      image
      price
      stock
      sizes
      cupSizes
      bandSizes
      style
      colors
      scents
      subcategory {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      image
      price
      stock
      sizes
      cupSizes
      bandSizes
      style
      colors
      scents
      isFavorite
      subcategory {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_SUBCATEGORIES = gql`
  {
    subcategories {
      _id
      name
      title
      category {
        name
      }
    }
  }
`;

export const QUERY_AUTH = gql`
  {
    auth {
      user {
        firstName
        lastName
        username
      }
    }
  }
`;

// orders {
//   _id
//   purchaseDate
//   products {
//     _id
//     name
//     description
//     price
//     stock
//     image
//   }
// }

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      username
    }
  }
`;
