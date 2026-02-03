import { User } from "../models/userClass";

export class Validator {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && !User.emailExists(email)) {
            return false;
        }else{
            return true;
        }
    }
}
