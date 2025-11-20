import mailManagerInstance, { MailManager } from "@/repositories/mail-db";
import { Email } from "./models/email";
import { CreateEmailSchema } from "./schema/email";

const LIMIT_PER_PAGE = 10

class MailService {

    mailManager: MailManager

    constructor(_mailManager: MailManager) {
        this.mailManager = _mailManager
    }

    getInbox(email: string, page: number = 1): Promise<{ emails: Email[], total: number }> {
        const limit = LIMIT_PER_PAGE
        const offset = (page - 1) * limit
        return this.mailManager.getInbox(email, limit, offset)
    }

    sendEmail(email: CreateEmailSchema): Promise<Email> {
        const newEmail: Email = {
            ...email,
            createdAt: new Date()
        }
        return this.mailManager.createEmail(newEmail)
    }

}

const mailServiceInstance = new MailService(mailManagerInstance)

export default mailServiceInstance
