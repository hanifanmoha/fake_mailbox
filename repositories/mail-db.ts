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

            // create index
            // skip for now

            console.log("Connected to MongoDB")
            return this.db
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error)
            throw error
        }
    }

    async getInbox(email: string, limit: number = 100, offset: number = 0): Promise<{ emails: Email[], total: number }> {
        await this.connect()
        if (!this.collection) {
            throw new Error("Collection is not initialized")
        }

        try {
            const emails = await this.collection
                .find({ to: email })
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit)
                .toArray()
            const total = await this.collection.countDocuments({ to: email })
            return { emails, total }
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


}

const mailManagerInstance = new MailManager()

export default mailManagerInstance

export { MailManager }

