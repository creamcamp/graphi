/* eslint-disable no-useless-catch */
const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const bcryptSalt = 12;

const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            // eslint-disable-next-line no-use-before-define
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

const events = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        events.map((event) => ({
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event.creator)
        }));

        return events;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => ({
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event._doc.creator)
            }));
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
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
            price: +sPrice,
            date: new Date(sDate),
            creator: '607dcde7b22222b16f9d0380'
        });

        let createdEvent;

        try {
            const result = await event.save();
            createdEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('607dcde7b22222b16f9d0380');

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent;
        } catch (err) {
            throw err;
        }
    },
    createUser: async (args) => {
        try {
            const {
                userInput: {
                    email: sEmail,
                    password: sPassword
                }
            } = args;
            const existingUser = await User.findOne({ email: sEmail });

            if (existingUser) {
                throw new Error('User exists already.');
            }

            const hashedPassword = await bcrypt.hash(sPassword, bcryptSalt);
            const user = new User({
                email: sEmail,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }
};
