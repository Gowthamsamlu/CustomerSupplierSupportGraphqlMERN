const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const userSchema = require("./userSchema");
const chatSchema = require("./chatSchema");

// Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: userSchema.usersQuery,
    user: userSchema.userQuery,
    usersByAccType: userSchema.usersByAccountType,
    chatListQuery: chatSchema.chatListQuery,
    chatMsgsQuery: chatSchema.chatMsgsQuery,
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: userSchema.addUserMutation,
    changePassword: userSchema.changePasswordMutation,
    deactivateUser: userSchema.deactivateUserMutation,
    addChat: chatSchema.addChatMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
