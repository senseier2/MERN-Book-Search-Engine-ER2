const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {


}


Mutation: {
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

};