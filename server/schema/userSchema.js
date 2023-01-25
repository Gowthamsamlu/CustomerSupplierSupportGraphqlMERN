const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/userAuth");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    accountType: { type: GraphQLString },
    accountStatus: { type: GraphQLString },
    errMessage: { type: GraphQLString },
    // password: { type: GraphQLString },
  }),
});

const usersQuery = {
  type: new GraphQLList(UserType),
  resolve(parent, args, context) {
    console.log(context);
    return User.find();
  },
};

const userQuery = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};

const usersByAccountType = {
  type: new GraphQLList(UserType),
  args: {
    accountType: {
      type: new GraphQLEnumType({
        name: "UserAccountTypeFilter",
        values: {
          supp: { value: "supplier" },
          cust: { value: "customer" },
          admin: { value: "admin" },
        },
      }),
      defaultValue: "customer",
    },
  },
  resolve(parent, args) {
    return User.find({ accountType: args.accountType });
  },
};

const addUserMutation = {
  type: UserType,
  args: {
    firstname: { type: GraphQLString },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    accountType: {
      type: new GraphQLEnumType({
        name: "UserAccountType",
        values: {
          supp: { value: "supplier" },
          cust: { value: "customer" },
          admin: { value: "admin" },
        },
      }),
      defaultValue: "customer",
    },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const existingUser = await User.findOne({
      $or: [{ email: args.email }, { phone: args.phone }],
    });
    if (existingUser) {
      if (existingUser.phone === args.phone)
        return { errMessage: "Phone number already exists" };
      else return { errMessage: "Email already exists" };
    } else {
      const user = new User({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        phone: args.phone,
        accountType: args.accountType,
        password: await hashPassword(args.password),
      });
      return user.save();
    }
  },
};

const changePasswordMutation = {
  type: UserType,
  args: {
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const requestedUser = User.findById(context.user._id);
    if (!requestedUser) {
      return { errMessage: "User doesn't exist" };
    }
    const isMatched = await comparePassword(
      args.oldPassword,
      requestedUser.password,
    );
    if (!isMatched) {
      return { errMessage: "Old password doesn't match" };
    }
    const updatedUser = User.findByIdAndUpdate(context.user._id, {
      $set: {
        password: await hashPassword(args.newPassword),
      },
    });
    return updatedUser;
  },
};

const deactivateUserMutation = {
  type: UserType,
  args: {
    targetId: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const updatedUser = User.findByIdAndUpdate(args.targetId, {
      $set: {
        accountStatus: "blocked",
      },
    });
    return updatedUser;
  },
};

module.exports = {
  UserType,
  usersQuery,
  userQuery,
  usersByAccountType,
  changePasswordMutation,
  deactivateUserMutation,
  addUserMutation,
};
