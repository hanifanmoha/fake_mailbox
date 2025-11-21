'use client'

import { Email } from "@/services/models/email"
import { formatTimeString } from "@/utils/time"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Inbox() {

    const params = useParams()
    const email = params.email

    const [mails, setMails] = useState<Email[]>([])
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)

    const handleNextPage = () => {
        setPage(page + 1)
    }

    const handlePreviousPage = () => {
        setPage(page - 1)
    }

    const refresh = () => {
        setPage(1)
    }

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const response = await fetch(`/api/mail/${email}?page=${page}`)
                const data = await response.json()
                setMails(data.data.mails)
                setHasNext(data.data.total >= data.data.limit)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMails()
    }, [email, page])

    return (
        <div className="overflow-x-auto pt-12">
            <div className="flex justify-between mb-8">
                <button className="btn btn-ghost" onClick={refresh}>Refresh</button>
                <div className="flex items-center gap-2">
                    <button disabled={page === 1} className="btn btn-ghost" onClick={handlePreviousPage}>{'<'}</button>
                    <p>Page {page}</p>
                    <button disabled={!hasNext} className="btn btn-ghost" onClick={handleNextPage}>{'>'}</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map((mail, index) => (
                        <tr key={index}>
                            <td>{mail.from}</td>
                            <td>{mail.subject}</td>
                            <td>{formatTimeString(mail.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}