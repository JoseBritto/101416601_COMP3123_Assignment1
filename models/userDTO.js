const zod = require('zod');
const z = zod.z;

const User = z.object({
    username: z.string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string'
    }).min(3, {message: 'Username have to be atleast 3 characters long' }),

    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }).min(3, {message: 'Password must be atleast 3 characters long' }),

    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'Invalid Email format'
    }).email({message: 'Invalid Email format'})
});

module.exports = User;

