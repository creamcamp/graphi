const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'somesupersecretkey',
            {
                expiresIn: '1h'
            }
        );

        return { userId: user.id, token, tokenExpiration: 1 };
    }
};
