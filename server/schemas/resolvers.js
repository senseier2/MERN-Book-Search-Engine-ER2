const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//Refactor the UserController here for resolvers and Mutations
const resolvers = {
 Query: {
    // get a single user
    getSingleUser: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },

    users: async () => {
        // Populate the classes and professor subdocuments when querying for schools
        return await User.find({}).populate('savedBooks')
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
},


Mutation: {

    // create a User
    addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
    
          return ({ token, user });
    },
      
    //login user
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        const correctPw = await user.isCorrectPassword(password);
  
        if (!user || !correctPw) {
          throw new AuthenticationError("Invalid user credentials!");
        }
  
        const token = signToken(user);
        return { token, user };
    },

    //Save a book to the users saved book
    saveBook: async (parent, { authors, description, title, bookId, link}, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { savedBooks:  { authors, description, title, bookId, link} },
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
    removeBook: async (parent, {bookId}, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: { savedBooks:  { bookId: {$eq: bookId}} },
            },
            {
              new: true,
            }
          );}
        throw new AuthenticationError('You need to be logged in!');
    },
  },

};

module.exports = resolvers;