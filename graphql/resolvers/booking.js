const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('./merge');

module.exports = {
    bookings: async () => {
        const bookings = await Booking.find();
        return bookings.map((booking) => transformBooking(booking));
    },
    bookEvent: async (args) => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: '60ae7b79862a7019c10b6205',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (args) => {
        const booking = await Booking.findById(args.bookingId).populate('event');
        const event = transformEvent(booking.event);
        await Booking.deleteOne({ _id: args.bookingId });
        return event;
    }
};
