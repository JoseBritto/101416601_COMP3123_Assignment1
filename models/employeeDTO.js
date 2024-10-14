const zod = require('zod');
const z = zod.z;

const Employee = z.object({
    employee_id: z.string({
        required_error: 'employee_id is required',
        invalid_type_error: 'employee_id must be a string'
    }).optional(),
    first_name: z.string({
        required_error: 'first_name is required',
        invalid_type_error: 'first_name must be a string'
    }),
    last_name: z.string({
        required_error: 'last_name is required',
        invalid_type_error: 'last_name must be a string'
    }),
    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string'
    }).email({
        message: 'email is in invalid format'
    }),
    position: z.string({
        required_error: 'position is not specified',
        invalid_type_error: 'position must be string'
    }),
    salary: z.number({
        required_error: 'salary not specified',
        invalid_type_error: 'salary must be a number'
    }),
    date_of_joining: z.string({
        required_error: 'date_of_joining is required',
        invalid_type_error: 'date_of_joining should be a string'
    }).refine((date) => {
        return !isNaN(new Date(date).getTime())
    }, 'date_of_joining is not a valid date'),
    department: z.string({
        required_error: 'department is not specified'
    })
});

module.exports = Employee;