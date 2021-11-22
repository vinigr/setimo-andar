import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { UserConnection } from "../modules/user/UserType";

export default new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    users: {
      type: GraphQLNonNull(UserConnection),
      args: connectionArgs,
      resolve: (_, args, context) => {
        return connectionFromArray([], args);
      },
    },
  }),
});
