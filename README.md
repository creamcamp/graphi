
### Query ``
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

```

```json

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

The variables for input above might look like:
```json
{
  "email": "test@dev.com",
  "password": "password"
}
```
