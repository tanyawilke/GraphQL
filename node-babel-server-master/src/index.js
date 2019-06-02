import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);

const PORT = 3000;
const app = express();

app.use(cors());

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: "Tanya Wilke"
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(PORT);