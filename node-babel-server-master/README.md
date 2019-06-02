# Simple Node Server with Babel

query {
  user(id: "2") {
  	username# Write your query or mutation here
	}
  me {
    username
  }
  users {
    username
  }
  message(id: "2") {
    id
    text
    user {
      id
      username
    }
  }
  messages {
    id
    text
    user {
      id
    }
  }
}

mutation {
  createMessage(text: "Hello GraphQL") {
    id
    text
  }
}
