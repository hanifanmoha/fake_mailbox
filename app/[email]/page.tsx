'use client'

import { Email } from "@/services/models/email"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function Mail({ mail }: { mail: Email }) {
    return <div className="flex flex-col border-b p-4">
        <h3 className="font-bold">{mail.subject}</h3>
        <p className="text-sm">From: {mail.from}</p>
        <p className="text-sm">{new Date(mail.createdAt).toDateString()}</p>
    </div>
}

export default function Inbox() {

    const params = useParams()
    const email = params.email

    const [mails, setMails] = useState<Email[]>([])
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)

    const loadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const response = await fetch(`/api/mail/${email}?page=${page}`)
                const data = await response.json()

                const newMails = [...mails, ...data.data.mails]
                setMails(newMails)
                setHasNext(data.data.limit < data.data.total)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMails()
    }, [email, page])

    return (
        <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex h-screen w-full max-w-3/4 flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex h-full w-full flex-1 border rounded-lg">
                    <div className="flex flex-col overflow-y-auto w-1/3 border-r">
                        {mails.map((mail, index) => (
                            <Mail key={index} mail={mail} />
                        ))}
                        <button onClick={loadMore}>Load More</button>
                    </div>
                </div>
            </main>
        </div>
    )
}