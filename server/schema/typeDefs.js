const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    favorites: [Product!]!
    favoritesLength: Int
    orders: [Order]
  }

  type Category {
    _id: ID
    name: String
  }

  type SubCategory {
    _id: ID
    name: String
    title: String
    category: Category
  }

  type Product {
    _id: ID
    name: String!
    description: String
    image: [String]
    price: Float
    stock: Int
    sizes: [String]
    cupSizes: [String]
    bandSizes: [Int]
    topSizes: [String]
    bottomSizes: [String]
    style: String
    colors: [String]
    scents: [String]
    quantity: Int
    subcategory: SubCategory,
    isFavorite: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    items: [Product]
  }

  type Favorites {
    _id: ID
    items: [Product]
  }

  type Checkout {
    session: ID
  }
  type Auth {
    token: ID!
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    price: Float
  }

  input FavoriteInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: [String]
    price: Float
    quantity: Int
  }

  type Query {
    users: [User]!
    user: User
    categories: [Category]
    category(categoryId: ID!): Category
    subcategories(category: ID, name: String): [SubCategory]
    subcategory(subcategoryId: ID!): [SubCategory]
    products(subcategory: ID): [Product]
    product(productId: ID!): [Product]
    productsByCategory(categoryId: ID!): [Product]
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    favorite(_id: ID!): Favorites
  }
  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    toggleFavorite(id: ID!): Product
    addFavorite(products: [ID!]): Product
    removeFavorite(products: [ID!]): Product
  }
`;

module.exports = typeDefs;

// updateUser(userId: ID!, username: String, email: String, password: String): User
//     editUser(userId: ID!, username: String, email: String, password: String): Auth
//     addCategory(name: String!): Category
//     removeCategory(categoryId: ID!): Category
//     addSubCategory(name: String, category: ID!): SubCategory
//     removeSubCategory(subcategoryId: ID!): SubCategory

// addProduct(name: String!, subcategory: SubCategory!): Product

// editCategory
// editSubCategory
// editProduct


// removeProduct

