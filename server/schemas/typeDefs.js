const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User { //me?
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]
 }

 type bookSchema {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
 }

 type Query {
    getSingleUser: [User]
    createUser: [User]
 }

 type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveBook: [authors]// not sure how to finish this one "look into input type to handle parameters"
   removeBook(bookId:): User
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
}

type Auth {
    token: String
    user: User
}


`