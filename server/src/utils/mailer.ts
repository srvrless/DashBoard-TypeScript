import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config'
import log from "./logger";
// async function createTestCredentials() {
//     const credentials = await nodemailer.createTestAccount();
//     console.log({ credentials })
// }


// createTestCredentials()
const smtp = config.get<{
    user: string,
    password: string,
    host: string,
    port: number,
    secure: boolean
}>('smtp')

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.password }
})


async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "dik")

        }

        log.info(`url: ${nodemailer.getTestMessageUrl(info)}`)
    })
}


export default sendEmail