import { ObjectId } from "mongodb";

export interface Email {
    _id?: ObjectId;
    to: string;
    from: string;
    subject: string;
    body: string; // HTML content
    createdAt: Date;
}