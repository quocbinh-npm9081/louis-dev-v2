import { Twilio } from 'twilio';
const accountSid = String(process.env.SMS_ACCOUNT_SID);
const authToken = String(process.env.SMS_ACCOUNT_TOKEN);
const myTwilioPhoneNumber = String(process.env.SMS_MY_TWILIO_PHONE_NUMBER);
const client = new Twilio(accountSid, authToken);

const sendSms = async (phoneNumber: string, txt: string, url: string) => {
  try {
    return await client.messages.create({ body: `${txt} : ${url}`, from: myTwilioPhoneNumber, to: String(phoneNumber) });
  } catch (error) {
    console.log(error);
  }
};

export default sendSms;
