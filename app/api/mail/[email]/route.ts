import { NextResponse, NextRequest } from 'next/server';
import { GeneralResponse } from '@/utils/response';
import mailServiceInstance from '@/services/mail-service';
import { createEmailSchema } from '@/services/schema/email';

// Handle GET requests
export async function GET(request: NextRequest, { params }: { params: { email: string } }): Promise<NextResponse<GeneralResponse>> {

    const { searchParams } = new URL(request.url)

    const page = Number(searchParams.get("page")) || 1
    const { email } = await params

    const { emails, total } = await mailServiceInstance.getInbox(email, Number(page))

    return NextResponse.json({
        message: "Hello, World!",
        data: {
            emails,
            total
        }
    });
}

// Handle POST requests
export async function POST(request: NextRequest, { params }: { params: { email: string } }): Promise<NextResponse<GeneralResponse>> {

    const body = await request.json();
    const { email: to } = await params
    body.to = to

    const validatedData = createEmailSchema.safeParse(body)

    if (!validatedData.success) {
        return NextResponse.json({
            message: "Invalid data",
            error: validatedData.error
        }, {
            status: 400
        })
    }

    const email = await mailServiceInstance.sendEmail(validatedData.data)

    return NextResponse.json({
        message: "Email sent successfully",
        data: email
    });
}