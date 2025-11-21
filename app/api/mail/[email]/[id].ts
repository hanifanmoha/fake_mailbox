import { NextResponse, NextRequest } from 'next/server';
import { GeneralResponse } from '@/utils/response';
import mailServiceInstance from '@/services/mail-service';
import { createEmailSchema } from '@/services/schema/email';

// Handle GET requests
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<GeneralResponse>> {

    const { id } = await params

    const mail = await mailServiceInstance.getMail(id)

    return NextResponse.json({
        message: "Hello, World!",
        data: { mail }
    });
}