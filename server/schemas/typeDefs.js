const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]
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
 }

 type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveBook(book: SavedBookInput): User
   removeBook(bookId: String): User
 }


type User {
    _id: ID
    username: String
    email: String 
    bookCount: Number
    savedBooks:[Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    forSale: String
}

type Auth {
    token: ID!
    user: User
}
`;