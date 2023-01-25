const User = require("../models/user");
const ChatMessages = require("../models/ChatMessages");

const { UserType } = require("./userSchema");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
} = require("graphql");

const ChatMsgType = new GraphQLObjectType({
  name: "ChatMsg",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    validflag: { type: GraphQLInt },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.sender);
      },
    },
    recipient: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.recipient);
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

const chatMsgsQuery = {
  type: new GraphQLList(ChatMsgType),
  args: {
    loggedInUser: {
      type: GraphQLID,
    },
  },
  resolve(parent, args) {
    return ChatMessages.find({
      $or: [{ sender: args.loggedInUser }, { recipient: args.loggedInUser }],
    }).sort({ createdAt: 1 });
  },
};

const addChatMutation = {
  type: ChatMsgType,
  args: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    recipient: { type: GraphQLID },
    sender: { type: GraphQLID },
  },
  resolve(parent, args, context) {
    const newChat = new ChatMessages({
      message: args.message,
      recipient: args.recipient,
      sender: context.user ? context.user._id : args.sender,
    });
    return newChat.save();
  },
};

module.exports = {
  ChatMsgType,
  chatMsgsQuery,
  addChatMutation,
};
