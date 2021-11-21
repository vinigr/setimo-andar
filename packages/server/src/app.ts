import cors from "@koa/cors";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import graphqlHttp from "koa-graphql";
import logger from "koa-logger";
import Router from "koa-router";
import { schema } from "./schema";

const app = new Koa<any, Context>();

if (process.env.NODE_ENV === "production") {
  app.proxy = true;
}

const router = new Router<any, Context>();

router.get("/api", (ctx) => {
  ctx.body = "API running";
});

const graphqlSettingsPerReq = async (req: Request) => {
  return {
    graphiql: true,
    schema,
    context: {
      req,
    },
    formatError: (error) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = graphqlHttp(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);

app.use(router.routes()).use(router.allowedMethods());
app.use(logger());
app.use(cors({ maxAge: 86_400 }));
app.use(bodyParser());

export default app;
