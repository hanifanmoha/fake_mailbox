import mailServiceInstance from '@/services/mail-service'
import { formatTimeString } from '@/utils/time'
import Link from 'next/link'

interface PageProps {
    params: {
        email: string
        id: string
    }
}

export default async function MailDetailPage({ params }: PageProps) {
    const { email, id } = await params

    const mail = await mailServiceInstance.getMail(id)

    const serializedMail = {
        ...mail,
        _id: mail._id?.toString(),
        createdAt: mail.createdAt
    }

    return (
        <div className="pt-12 max-w-4xl mx-auto">

            <Link href={`/${email}`} className="btn btn-ghost mb-6">
                ← Back to Inbox
            </Link>


            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl mb-4">{mail.subject}</h1>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                            <span className="font-semibold">From:</span> {mail.from}
                        </div>
                        <div>
                            <span className="font-semibold">To:</span> {mail.to}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Date:</span> {formatTimeString(mail.createdAt)}
                        </div>
                    </div>

                    <div className="divider"></div>


                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: mail.body }}
                    />
                </div>
            </div>
        </div>
    )
}