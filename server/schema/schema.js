// const { projects, clients } = require("../sampleData");

const User = require("../models/user");
const { hashPassword } = require("../utils/userAuth");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
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
    errMessage: { type: GraphQLString },
    // password: { type: GraphQLString },
  }),
});

// COMMENT START - For Reference
// const ProjectType = new GraphQLObjectType({
//   name: "Project",
//   fields: () => ({
//     id: { type: GraphQLID },
//     clientId: {
//       type: ClientType,
//       resolve(parent, args) {
//         return Client.findById(parent.clientId);
//       },
//     },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//     status: { type: GraphQLString },
//   }),
// });
// COMMENT END - For Reference

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const user = User.findById(args.id);
        return user;
      },
    },
    // COMMENT START - For Reference
    // projects: {
    //   type: new GraphQLList(ProjectType),
    //   resolve(parent, args) {
    //     return Project.find();
    //   },
    // },
    // project: {
    //   type: ProjectType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Project.findById(args.id);
    //   },
    // },
    // COMMENT END - For Reference
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add User
    addUser: {
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
    },

    // COMMENT START - For Reference
    // // Add Project
    // addProject: {
    //   type: ProjectType,
    //   args: {
    //     name: { type: new GraphQLNonNull(GraphQLString) },
    //     description: { type: new GraphQLNonNull(GraphQLString) },
    //     status: {
    //       type: new GraphQLEnumType({
    //         name: "ProjectStatus",
    //         values: {
    //           new: { value: "Not Started" },
    //           progress: { value: "In Progress" },
    //           completed: { value: "Completed" },
    //         },
    //       }),
    //       defaultValue: "Not Started",
    //     },
    //     clientId: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve(parent, args) {
    //     const project = new Project({
    //       name: args.name,
    //       description: args.description,
    //       status: args.status,
    //       clientId: args.clientId,
    //     });

    //     return project.save();
    //   },
    // },

    // // Edit Project
    // editProject: {
    //   type: ProjectType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) },
    //     name: { type: GraphQLString },
    //     status: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     clientId: { type: GraphQLID },
    //   },
    //   resolve(parent, args) {
    //     return Project.findByIdAndUpdate(args.id, {
    //       $set: {
    //         name: args.name,
    //         status: args.status,
    //         description: args.description,
    //         clientId: args.clientId,
    //       },
    //     });
    //   },
    // },

    // // Delete Project
    // deleteProject: {
    //   type: ProjectType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve(parent, args) {
    //     return Project.findByIdAndRemove(args.id);
    //   },
    // },
    // COMMENT END - For Reference
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
