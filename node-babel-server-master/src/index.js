import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';

const userCredentials = { firstname: 'Tanya' };
const userDetails = { nationality: 'CentralRepublicOfAnywhere' };

let users = {
  1: {
    id: '1',
    username: 'Tanya Wilke',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Happy Gilmour',
    messageIds: [2]
  }
}

let messages = {
  1: {
    id: '1',
    text: 'Message 1',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'Message 2',
    userId: '2'
  }
}

const user = {
  ...userCredentials,
  ...userDetails,
};

const PORT = 3000;
const app = express();

app.use(cors());

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, {me}, info) => {
      return me;
    },
    user: (parent, {id}, context, info) => {
      return users[id];
    },
    users: (parent, args, context, info) => {
      return Object.values(users);
    },
    messages: (parent, args, context, info) => {
      return Object.values(messages);
    },
    message: (parent, {id}, context, info) => {
      return messages[id];
    }
  },

  Mutation: {
    createMessage: (parent, {text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, {id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if(!message) {
        return false;
      }
      
      messages = otherMesssages;

      return true;
    }
  },

  User: {
    messages: user => {
      return Object.values(messages).filter (
        message => message.userId === user.id
      );
    }
  },

  Message: {
    user: message => {
      return users[message.userId];
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(PORT);