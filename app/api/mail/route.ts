import { NextResponse, NextRequest } from 'next/server';
import { GeneralResponse } from '@/utils/response';
import mailServiceInstance from '@/services/mail-service';
import { createEmailSchema } from '@/services/schema/email';

// Handle POST requests
export async function POST(request: NextRequest): Promise<NextResponse<GeneralResponse>> {

    const body = await request.json();

    // Check if it's an array or single object
    const isArray = Array.isArray(body);
    const emailsToValidate = isArray ? body : [body];

    // Validate all emails
    const validatedEmails = [];
    for (const email of emailsToValidate) {
        const validatedData = createEmailSchema.safeParse(email);
        if (!validatedData.success) {
            return NextResponse.json({
                message: "Invalid data",
                error: validatedData.error
            }, {
                status: 400
            });
        }
        validatedEmails.push(validatedData.data);
    }

    // Send all emails
    const results = await Promise.all(
        validatedEmails.map(email => mailServiceInstance.sendEmail(email))
    );

    return NextResponse.json({
        message: `${results.length} email(s) sent successfully`,
        data: isArray ? results : results[0]
    });
}