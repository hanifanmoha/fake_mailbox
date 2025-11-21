import { NextResponse, NextRequest } from 'next/server';
import { GeneralResponse } from '@/utils/response';
import mailServiceInstance from '@/services/mail-service';

// Handle GET requests
export async function GET(
    request: NextRequest,
    { params }: { params: { email: string, id: string } }
): Promise<NextResponse<GeneralResponse>> {

    const { id } = await params

    const mail = await mailServiceInstance.getMail(id)

    return NextResponse.json({
        message: "Mail retrieved successfully",
        data: mail
    });
}
