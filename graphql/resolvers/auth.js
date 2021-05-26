const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        const existingUser = await User.findOne({ email: args.userInput.email });
        const salt = 12;

        if (existingUser) {
            throw new Error('User exists already.');
        }

        const hashedPassword = await bcrypt.hash(args.userInput.password, salt);
        const user = new User({
            email: args.userInput.email,
            password: hashedPassword
        });

        const result = await user.save();

        return { ...result._doc, password: null, _id: result.id };
    }
};
