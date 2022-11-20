import { gql } from '@apollo/client'

export const GET_ME = gql`
 query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
        }
    }
 }
`;

export const QUERY_SINGLE_USER = gql`
 query singleUser($userId: ID!) {
    user(userId: $userId) {
        _id
        username
        email
        bookCount
    }
 }
`;

export const QUERY_USERS = gql`
 query Users {
    users {
    _id
    username
    email
    bookCount
    }
 }
`;