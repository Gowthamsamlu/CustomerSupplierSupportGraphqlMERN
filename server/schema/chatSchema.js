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

const ChatListType = new GraphQLObjectType({
  name: "ChatList",
  fields: () => ({
    id: { type: GraphQLID },
    person2: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.person2);
      },
    },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

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

const chatListQuery = {
  type: new GraphQLList(ChatListType),
  args: {
    loggedInUser: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args, context) {
    const chatList = await ChatMessages.find({
      $or: [
        { sender: context.user ? context.user._id : args.loggedInUser },
        { recipient: context.user ? context.user._id : args.loggedInUser },
      ],
    }).sort({ updatedAt: -1 });
    const refinedList = [];
    chatList.map((item) => {
      const person2 =
        item.sender.toString() ===
        (context.user ? context.user._id : args.loggedInUser)
          ? item.recipient
          : item.sender;
      const refinedItem = {
        id: item._id,
        person2,
        message: item.message,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      if (
        refinedList.filter((item) => {
          return item.person2.toString() === person2.toString();
        }).length === 0
      )
        refinedList.push(refinedItem);
    });
    return refinedList;
  },
};

const chatMsgsQuery = {
  type: new GraphQLList(ChatMsgType),
  args: {
    loggedInUser: {
      type: GraphQLID,
    },
    secondPerson: {
      type: GraphQLID,
    },
  },
  resolve(parent, args) {
    return ChatMessages.find({
      $or: [
        {
          $and: [
            { sender: args.secondPerson },
            { recipient: args.loggedInUser },
          ],
        },
        {
          $and: [
            { sender: args.loggedInUser },
            { recipient: args.secondPerson },
          ],
        },
      ],
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
  chatListQuery,
  addChatMutation,
};
