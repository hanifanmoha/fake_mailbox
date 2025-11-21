import { Email } from "@/services/models/email";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";

const DB_NAME = "fake_mailbox"
const COLLECTION_NAME = "mails"

class MailManager {

    client: MongoClient | null;
    db: Db | null;
    collection: Collection<Email> | null;
    isConnected: boolean;

    constructor() {
        this.client = null;
        this.db = null;
        this.collection = null;
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) {
            return this.db
        }

        try {
            const uri = process.env.MONGODB_URI
            if (!uri) {
                throw new Error("MONGODB_URI is not defined")
            }

            this.client = new MongoClient(uri)
            await this.client.connect()
            this.db = this.client.db(DB_NAME)
            this.collection = this.db.collection(COLLECTION_NAME)
            this.isConnected = true

            console.log("Connected to MongoDB")
            return this.db
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error)
            throw error
        }
    }

    async getInbox(email: string, timeLimit?: Date, limit: number = 100, offset: number = 0): Promise<{ mails: Email[], total: number }> {

        console.log(`getInbox email: ${email}, timeLimit: ${timeLimit}, limit: ${limit}, offset: ${offset}`)

        await this.connect()
        if (!this.collection) {
            throw new Error("Collection is not initialized")
        }

        const query: any = { to: email }

        if (timeLimit) {
            query.createdAt = { $gte: timeLimit }
        }

        try {
            const mails = await this.collection
                .find(query)
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit)
                .toArray()
            const total = await this.collection.countDocuments(query)
            return { mails, total }
        } catch (error) {
            console.error("Failed to get inbox:", error)
            throw error
        }
    }

    async createEmail(email: Email): Promise<Email> {
        await this.connect()
        if (!this.collection) {
            throw new Error("Collection is not initialized")
        }

        const newEmail: Email = {
            ...email,
            createdAt: new Date()
        }

        try {
            const result = await this.collection.insertOne(newEmail)
            return {
                ...newEmail,
                _id: result.insertedId
            }
        } catch (error) {
            console.error("Failed to create email:", error)
            throw error
        }
    }

    async deleteOldEmails(timeLimit: Date) {
        // delete all emails with created at before time limit
        await this.connect()
        if (!this.collection) {
            throw new Error("Collection is not initialized")
        }

        try {
            await this.collection.deleteMany({ createdAt: { $lt: timeLimit } })
        } catch (error) {
            console.error("Failed to delete old emails:", error)
            throw error
        }
    }

}

const mailManagerInstance = new MailManager()

export default mailManagerInstance

export { MailManager }

