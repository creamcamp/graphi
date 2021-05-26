const Event = require('../../models/event');

const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        const events = await Event.find();
        return events.map((event) => transformEvent(event));
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '60ae7b79862a7019c10b6205'
        });
        let createdEvent;
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById('60ae7b79862a7019c10b6205');

        if (!creator) {
            throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();

        return createdEvent;
    }
};
