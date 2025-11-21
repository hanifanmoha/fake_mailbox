export default function DocsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    return (
        <div className="py-12 max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Developer Documentation</h1>
                <p className="text-lg text-base-content/60">
                    Learn how to use the Fake Mailbox API for testing email functionality
                </p>
            </div>

            <div className="space-y-8">
                <section className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Getting Started</h2>
                        <p className="mb-4">
                            Fake Mailbox is a temporary email service designed for testing purposes.
                            You can use any email address without registration and access emails via our API.
                        </p>
                        <div className="alert alert-warning mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span><strong>Note:</strong> This is an HTTP API, not a real SMTP server. Emails are sent via REST API calls, not traditional email protocols.</span>
                        </div>
                        <div className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Base URL: <code className="font-mono bg-base-200 px-2 py-1 rounded">{baseUrl}</code></span>
                        </div>
                    </div>
                </section>

                <section className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">API Endpoints</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">1. Send Email</h3>
                                <div className="mockup-code mb-3">
                                    <pre data-prefix="$"><code>POST /api/mail</code></pre>
                                </div>
                                <p className="mb-2">Send a new email to the mailbox.</p>

                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Request Body:</p>
                                    <div className="mockup-code text-sm">
                                        <pre><code>{`{
  "to": "recipient@example.com",
  "from": "sender@example.com",
  "subject": "Test Email",
  "body": "<p>Your HTML email content here</p>"
}`}</code></pre>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Example Request:</p>
                                    <div className="mockup-code text-sm">
                                        <pre><code>{`curl -X POST ${baseUrl}/api/mail \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "test@example.com",
    "from": "sender@example.com",
    "subject": "Hello World",
    "body": "<p>This is a test email</p>"
  }'`}</code></pre>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Example Response:</p>
                                    <div className="mockup-code text-sm">
                                        <pre><code>{`{
  "message": "1 email(s) sent successfully",
  "data": {
    "to": "test@example.com",
    "from": "sender@example.com",
    "subject": "Hello World",
    "body": "<p>This is a test email</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "_id": "507f1f77bcf86cd799439011"
  }
}`}</code></pre>
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">2. Get Inbox</h3>
                                <div className="mockup-code mb-3">
                                    <pre data-prefix="$"><code>GET /api/mail/[email]?page=1</code></pre>
                                </div>
                                <p className="mb-2">Retrieve emails for a specific email address.</p>
                                <div className="overflow-x-auto">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Parameter</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><code>email</code></td>
                                                <td>string</td>
                                                <td>Email address (URL encoded)</td>
                                            </tr>
                                            <tr>
                                                <td><code>page</code></td>
                                                <td>number</td>
                                                <td>Page number (optional, default: 1)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Example Request:</p>
                                    <div className="mockup-code">
                                        <pre data-prefix="$"><code>curl {baseUrl}/api/mail/test@example.com?page=1</code></pre>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Example Response:</p>
                                    <div className="mockup-code text-sm">
                                        <pre><code>{`{
  "message": "Hello, World!",
  "data": {
    "mails": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "to": "test@example.com",
        "from": "sender@example.com",
        "subject": "Test Email",
        "body": "<p>Email content</p>",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1,
    "limit": 100
  }
}`}</code></pre>
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">3. Get Single Email</h3>
                                <div className="mockup-code mb-3">
                                    <pre data-prefix="$"><code>GET /api/mail/[email]/[id]</code></pre>
                                </div>
                                <p className="mb-2">Retrieve a specific email by ID.</p>
                                <div className="mt-3">
                                    <p className="font-semibold mb-2">Example Request:</p>
                                    <div className="mockup-code">
                                        <pre data-prefix="$"><code>curl {baseUrl}/api/mail/test@example.com/507f1f77bcf86cd799439011</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Important Notes</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>This is a <strong>testing service only</strong> - do not use for production emails</li>
                            <li>All emails are <strong>publicly accessible</strong> by anyone who knows the email address</li>
                            <li>Email addresses do not require registration or verification</li>
                            <li>The <code>body</code> field accepts HTML content</li>
                            <li>Emails are stored for <strong>1 hour</strong> before being automatically deleted</li>
                            <li>Rate limiting may apply to prevent abuse</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}
