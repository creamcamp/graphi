# React and GraphQL events booking service

### Query `events`
```graphql
query {
  events {
    creator {
      email
      createdEvents {
        title
        description
      }
    }
  }
}
```

### Mutation `createEvent`

```graphql
mutation {
  createEvent(eventInput: {
    title: "",
    description: "",
    price: 0.00,
    date: "2021-12-24T17:05:00.471Z"
  }) {
    title,
    date,
    creator {
      email
    }
  }
}
```

### Mutation `createUser`

```graphql
mutation($email: String!, $password: String!){
  createUser(userInput: { email: $email, password: $password }) {
    email,
    password
  }
}
```

### Mutation `createBooking`

```graphql
mutation {
  bookEvent(eventId: "") {
    event {
      title,
      description,
      date
      creator {
        email
      }
    }
  }
}
```

### Mutation `cancelBooking`

```graphql
mutation {
  cancelBooking(bookingId: "") {
    title,
    creator {
      email
    }
  }
}
```

The variables for input above might look like:
```json
{
  "email": "test@dev.com",
  "password": "password"
}
```
