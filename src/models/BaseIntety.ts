import { now } from "../utils/utilTypes";
import { validateEmail } from "../services";

export class BaseEntity {
    protected name : string;
    protected email: string;
    protected createdAt: string;
    static totalEntities: number = 0;

    constructor(name : string, email: string, createdAt: string)
    {
        if (validateEmail(email) == false){
            throw new Error(`"Email invalid"`);
        }
    this.name = name;
    this.email = email;
    this.createdAt = now();
    BaseEntity.totalEntities++;
    }
    static getTotalEntities(): number {
        return BaseEntity.totalEntities;
    }
}

//ex 1 , 2, 3 e 4


