import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Data",
  fields: () => ({
    id: globalIdField("User"),
    _id: {
      type: GraphQLString,
      resolve: (user) => user._id.toString(),
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    active: {
      type: GraphQLBoolean,
      resolve: (user) => user.active,
    },
  }),
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});

export { UserConnection, UserEdge };

export default UserType;
