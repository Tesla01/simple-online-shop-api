import { object, string } from 'zod';

const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }),
        password: string({
            required_error: "Passwor di required"
        })
    })
})

export default createSessionSchema;