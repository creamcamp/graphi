const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const Event = require('./models/event');

const PORT = 3000;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then((events) => {
                return events.map((event) => {
                    return { ...event._doc, _id: event.id }
                })
            }).catch((err) => {
                throw err;
            })
        },
        createEvent: (args) => {
            const {
                eventInput: {
                    title: sTitle,
                    description: sDescription,
                    price: sPrice,
                    date: sDate
                } = {}
            } = args;

            const event = new Event({
                title: sTitle,
                description: sDescription,
                price: sPrice,
                date: new Date(sDate)
            });

            return event
            .save()
            .then((result) => {
                console.log(result);
                return { ...result._doc, _id: result.id };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
        }
    },
    graphiql: true
}));

mongoose
.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mysuperheroes.ucexn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => app.listen(3000));