import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';


import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const userCredentials = { firstname: 'Tanya' };
const userDetails = { nationality: 'CentralRepublicOfAnywhere' };

const user = {
  ...userCredentials,
  ...userDetails,
};

const PORT = 3000;
const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: models.users[1]
  }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(PORT);