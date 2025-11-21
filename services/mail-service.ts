import mailManagerInstance, { MailManager } from "@/repositories/mail-db";
import { Email } from "./models/email";
import { CreateEmailSchema } from "./schema/email";

const LIMIT_PER_PAGE = 10
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000

class MailService {

    mailManager: MailManager

    constructor(_mailManager: MailManager) {
        this.mailManager = _mailManager
    }

    async getInbox(email: string, page: number = 1): Promise<{ mails: Email[], total: number, limit: number }> {
        const limit = LIMIT_PER_PAGE
        const offset = (page - 1) * limit

        const timeLimit = new Date(Date.now() - ONE_HOUR_IN_MILLISECONDS)

        // delete old emails to maintain storage
        this.mailManager.deleteOldEmails(timeLimit)

        const { mails, total } = await this.mailManager.getInbox(email, timeLimit, limit, offset)
        return { mails, total, limit }
    }

    async getMail(id: string): Promise<Email> {
        return await this.mailManager.getMail(id)
    }

    async sendEmail(email: CreateEmailSchema): Promise<Email> {
        const newEmail: Email = {
            ...email,
            createdAt: new Date()
        }
        return await this.mailManager.createEmail(newEmail)
    }

}

const mailServiceInstance = new MailService(mailManagerInstance)

export default mailServiceInstance
