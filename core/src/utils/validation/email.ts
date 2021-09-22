import { emailRegex } from './regex'

export function sanitizeEmail(email: string) {
    if (emailRegex.test(email.trim())) {
        return email
    }

    return null
}
