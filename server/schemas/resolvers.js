const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { saveBook } = require('../controllers/user-controller');
const { model } = require('mongoose');

//Refactor the UserController here for resolvers and Mutations
const resolvers = {
 Query: {
    // get a single user
    getSingleUser: async (parent, { userId }) => {
        return User.findOne({ _id: profileId });
      },
    // create a User
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return ({ token, user });
      },
    },

Mutation: {
    //login user
    login: async (parent, { username, email }) => {
        const profile = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("Can't find this user!");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Wrong password!');
        }
  
        const token = signToken(profile);
        return { token, user };
      },

      //Save a book to the users saved book
      saveBook: async (parent, { userId, savedBooks }, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: { savedBooks: savedBooks },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('You need to be logged in!');
      },

      //Remove a book from savedBooks
      deleteBook: async (parent, { savedBooks }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: savedBooks } }, //possibly book instead
            { new: true }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
};

model.exports = resolvers;