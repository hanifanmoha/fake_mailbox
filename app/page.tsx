import { redirect } from "next/navigation";

export default function Home() {

  async function handleSubmit(formData: FormData) {
    'use server'
    const email = formData.get('email') as string
    redirect(`/${email}`)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4">Fake Mailbox</h1>
          <p className="text-lg text-base-content/60">
            Enter your email address to access your temporary inbox
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form action={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your-email@example.com"
                  className="input input-bordered input-lg w-full"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Use any email address - no registration required
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
                Open Mailbox
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-base-content/60">
          <p>This is a temporary email service for testing purposes only.</p>
        </div>
      </div>
    </div>
  );
}
