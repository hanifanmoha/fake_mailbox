'use client'

import { Email } from "@/services/models/email"
import { formatTimeString } from "@/utils/time"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Inbox() {

    const params = useParams()
    const email = decodeURIComponent(params.email as string)

    const [mails, setMails] = useState<Email[]>([])
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)

    const handleNextPage = () => {
        setPage(page + 1)
    }

    const handlePreviousPage = () => {
        setPage(page - 1)
    }

    const refresh = () => {
        setPage(1)
        fetchMails()
    }

    const fetchMails = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/mail/${email}?page=${page}`)
            const data = await response.json()
            setMails(data.data.mails)
            setTotal(data.data.total)
            setHasNext(data.data.total > data.data.limit * page)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMails()
    }, [email, page])

    return (
        <div className="py-12 max-w-6xl mx-auto">
            {/* Back to Homepage */}
            <Link href="/" className="btn btn-ghost btn-sm mb-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Homepage
            </Link>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Inbox</h1>
                    <p className="text-base-content/60 mt-1">
                        <span className="font-mono">{email}</span>
                        {total > 0 && (
                            <span className="ml-2 badge badge-primary badge-sm">
                                {total} {total === 1 ? 'email' : 'emails'}
                            </span>
                        )}
                    </p>
                </div>

                <button
                    className="btn btn-primary btn-sm gap-2"
                    onClick={refresh}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    )}
                    Refresh
                </button>
            </div>

            {/* Loading State */}
            {loading && mails.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : mails.length === 0 ? (
                /* Empty State */
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center py-16">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h2 className="card-title text-2xl">No emails yet</h2>
                        <p className="text-base-content/60">Your inbox is empty. Emails will appear here.</p>
                    </div>
                </div>
            ) : (
                /* Email List */
                <>
                    <div className="card bg-base-100 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th className="w-1/4">From</th>
                                        <th className="w-1/2">Subject</th>
                                        <th className="w-1/6">Date</th>
                                        <th className="w-1/12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mails.map((mail, index) => (
                                        <tr key={mail._id?.toString() || index} className="hover">
                                            <td>
                                                <div className="font-medium truncate">
                                                    {mail.from}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-semibold truncate">
                                                    {mail.subject}
                                                </div>
                                            </td>
                                            <td className="text-sm text-base-content/60">
                                                {formatTimeString(mail.createdAt)}
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/${email}/${mail._id}`}
                                                    className="btn btn-link btn-sm"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            disabled={page === 1 || loading}
                            className="btn btn-outline btn-sm"
                            onClick={handlePreviousPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="badge badge-lg badge-ghost">
                            Page {page}
                        </div>

                        <button
                            disabled={!hasNext || loading}
                            className="btn btn-outline btn-sm"
                            onClick={handleNextPage}
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}