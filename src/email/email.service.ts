import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from "nodemailer"
@Injectable()
export class EmailService {
    constructor(
        private readonly config: ConfigService,
        private readonly transporter = createTransport({
            service: config.get("Gmail"),
            auth: {
                user: config.get("EMAIL_USER"),
                pass: config.get("EMAIL_PASS")
            }
        })
    ) {
    }

    public sendEmail(to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            to,
            subject,
            text,
            from: this.config.get("EMAIL_USER")
        })
    }
}
