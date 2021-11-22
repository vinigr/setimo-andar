import { GraphQLSchema } from "graphql";
import QueryType from "./types/QueryType";

export const schema = new GraphQLSchema({
  query: QueryType,
  // mutation: MutationType,
});
