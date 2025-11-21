import { Email } from "@/services/models/email"


const receiverEmail = "hanifanmohamad@gmail.com"
const baseURL = "http://localhost:3000"
const mockMailURL = `https://no-land.vercel.app/api/mock?__q=eyJpZCI6ImY5NDFkN2NlLTMwM2EtNDA2Zi1iMGUwLWRjMGQ2NDhhMDA1ZiIsInBhdGgiOiIiLCJtZXRob2QiOiJHRVQiLCJmaWVsZCI6eyJrZXkiOiJjY2EwYWViMS04ZTdhLTQ0NTMtOGZlYi0wOTEwZmY0YWRkYTkiLCJuYW1lIjoiOnJvb3Q6IiwidHlwZSI6ImFycmF5IiwiaXNSb290Ijp0cnVlLCJjb25maWciOnsibWluTGVuZ3RoIjoxMSwibWF4TGVuZ3RoIjoxOSwic3RhdGljVmFsdWUiOnt9fSwiY2hpbGRyZW4iOlt7ImtleSI6IjY5YWZiZWNhLWMwNWEtNGJmMC04ZjFiLTM3NjJmOTMxMWQ4NCIsIm5hbWUiOiJmcm9tIiwidHlwZSI6InZhbHVlIiwiaXNSb290Ijp0cnVlLCJjb25maWciOnsidmFsdWVUeXBlIjoiY2hhbmNlLmVtYWlsIiwic3RhdGljVmFsdWUiOnt9fX0seyJrZXkiOiI1MTljNjI2NS1mNTdiLTQwYTUtYThjNS05OTljNmVlY2FjNGMiLCJuYW1lIjoic3ViamVjdCIsInR5cGUiOiJ2YWx1ZSIsImlzUm9vdCI6dHJ1ZSwiY29uZmlnIjp7InZhbHVlVHlwZSI6ImZha2VyanMuYm9vay50aXRsZSIsInN0YXRpY1ZhbHVlIjp7fX19LHsia2V5IjoiZTVlZjk3N2YtNDBiMy00OWYzLWJiYTMtOWM0YWIwMDljNmJhIiwibmFtZSI6ImJvZHkiLCJ0eXBlIjoidmFsdWUiLCJpc1Jvb3QiOnRydWUsImNvbmZpZyI6eyJ2YWx1ZVR5cGUiOiJjaGFuY2UucGFyYWdyYXBoIiwic3RhdGljVmFsdWUiOnt9fX0seyJrZXkiOiIxYmMzZDRmZS1kNTVlLTQ0YzItOGY4Ni0xZGFiZDlmOTJiOWIiLCJuYW1lIjoiYm9keTIiLCJ0eXBlIjoidmFsdWUiLCJpc1Jvb3QiOnRydWUsImNvbmZpZyI6eyJ2YWx1ZVR5cGUiOiJmYWtlcmpzLmdpdC5jb21taXRNZXNzYWdlIiwic3RhdGljVmFsdWUiOnt9fX1dfSwiaGVhZGVycyI6W119`

async function createFakeEmails() {

    const mockEmails = await fetch(mockMailURL)
    const mockEmailsData = await mockEmails.json()

    if (!Array.isArray(mockEmailsData)) {
        console.error('Unexpected API response structure')
        return
    }

    console.log(`Fetched ${mockEmailsData.length} mock emails`)

    const emails: Email[] = mockEmailsData.map((email: any) => {

        const body = `<p><strong>${email.body2}</strong></p><p>${email.body}</p>`

        return {
            to: receiverEmail,
            from: email.from,
            subject: email.subject,
            body: body,
            createdAt: new Date()
        }
    })

    const response = await fetch(`${baseURL}/api/mail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emails)
    })

    const data = await response.json()

    console.log(data)

}

createFakeEmails()