const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
 }

 type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    forSale: String
    link: String
    title: String
 }

 type Query {
    me: User
    getSingleUser(userId: ID!): User
    users: [User]!
 }

 type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveBook( authors: [String], description: String, title: String!, bookId: String!, link: String): User
   removeBook(bookId: String!): User
 }


type User {
    _id: ID
    username: String
    email: String 
    bookCount: Int
    savedBooks:[Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}
`;

module.exports = typeDefs;