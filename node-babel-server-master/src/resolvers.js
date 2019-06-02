
import uuidv4 from 'uuid/v4';

export default {
    Query: {
      me: (parent, args, {me}, info) => {
        return me;
      },
      user: (parent, {id}, {models}, info) => {
        return models.users[id];
      },
      users: (parent, args, {models}, info) => {
        return Object.values(models.users);
      },
      messages: (parent, args, {models}, info) => {
        return Object.values(models.messages);
      },
      message: (parent, {id}, {models}, info) => {
        return models.messages[id];
      }
    },
  
    Mutation: {
      createMessage: (parent, {text }, { me, models }) => {
        const id = uuidv4();
        const message = {
          id,
          text,
          userId: me.id
        };
  
        models.messages[id] = message;
        models.users[me.id].messageIds.push(id);
  
        return message;
      },
      deleteMessage: (parent, {id }, {models}) => {
        const { [id]: message, ...otherMessages } = models.messages;
  
        if(!message) {
          return false;
        }
        
        models.messages = otherMesssages;
  
        return true;
      }
    },
  
    User: {
      messages: (user, args, {models}) => {
        return Object.values(models.messages).filter (
          message => message.userId === user.id
        );
      }
    },
  
    Message: {
      user: (message, args, {models}) => {
        return models.users[message.userId];
      }
    }
  };