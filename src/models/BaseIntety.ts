import { now } from "../utils/utilTypes";
import { validateEmail } from "../services";

export class BaseEntity {
    protected name : string;
    protected email: string;
    protected createdAt: string;

    constructor(name : string, email: string, createdAt: string)
    {
        if (validateEmail(email) == false){
            throw new Error(`"Email invalid"`);
        }
    this.name = name;
    this.email = email;
    this.createdAt = now();
    }
}

//ex 1 , 2, 3 e 4