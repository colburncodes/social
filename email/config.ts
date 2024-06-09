import {nodemailerAppTransport} from "~/email/transports/nodemailer-local-transport";
import {nodemailerMailTrapTransport} from "~/email/transports/nodemailer-mailtrap-transport";

const emailConfig = {
    appTransport: {
        transport: nodemailerAppTransport
    },
    mailTrapTransport: {
        transport: nodemailerMailTrapTransport
    }
}

export default emailConfig