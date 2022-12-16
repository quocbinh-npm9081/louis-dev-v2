import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
const GOOGLE_MAILER_CLIENT_ID = String(process.env.MAIL_CLIENT_ID);
const GOOGLE_MAILER_CLIENT_SECRET = String(process.env.MAIL_CLIENT_SECRET);
const GOOGLE_MAILER_REFRESH_TOKEN = String(process.env.MAIL_REFRESH_TOKEN);
const GOOGLE_MAILER_SENDER = String(process.env.SENDER_MAIL_ADDRESS);
const GOOOGLE_AUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const sendMail = async (toEmail: string, content: string, url: string) => {
  const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET, GOOOGLE_AUTH_PLAYGROUND);
  myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
  });
  try {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GOOGLE_MAILER_SENDER,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken || '',
      },
    });

    const mailOptions = {
      from: GOOGLE_MAILER_SENDER,
      to: toEmail,
      subject: 'Đăng kí thành công ! Hãy sác thực tài khoản',
      html: `<div style=" background-color: #ddffdd;
      border-left: 6px solid #04AA6D; padding: 1rem;">
      <h3><strong>${content}</strong> </h3>
      <p>${url}</p>
    </div>
    
      `,
    };
    const results = await transport.sendMail(mailOptions);
    return results;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
