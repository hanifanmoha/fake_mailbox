import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  async function handleSubmit(formData: FormData) {
    'use server'
    const email = formData.get('email') as string
    redirect(`/${email}`)
  }

  return (
    <div className="hero bg-base-200 h-96">
      <div className="hero-content text-center">
        <form className="max-w-md flex flex-col items-center gap-6" action={handleSubmit}>
          <h1 className="text-5xl font-bold mb-8">Find your (fake) mailbox here</h1>
          <input
            type="email"
            name="email"
            required
            placeholder="your-email@sample.com"
            className="input italic input-xl"
          />
          <button type="submit" className="btn btn-primary">Open Mailbox</button>
        </form>
      </div>
    </div>
  );
}
