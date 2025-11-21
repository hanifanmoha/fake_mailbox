import { NextResponse, NextRequest } from 'next/server';
import { GeneralResponse } from '@/utils/response';
import mailServiceInstance from '@/services/mail-service';
import { createEmailSchema } from '@/services/schema/email';

// Handle GET requests
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ email: string }> }
): Promise<NextResponse<GeneralResponse>> {

    const { searchParams } = new URL(request.url)

    const page = Number(searchParams.get("page")) || 1
    const { email } = await params

    const { mails, total, limit } = await mailServiceInstance.getInbox(email, Number(page))

    return NextResponse.json({
        message: "Hello, World!",
        data: {
            mails,
            total,
            limit
        }
    });
}