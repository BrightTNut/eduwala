import nodemailer from "nodemailer";
const mailSender = async (email, title, body) => {
  try {
    let transpoter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transpoter.sendMail({
      from: `EduWala || By Tejas Shiwankar`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Mail send to ", email);
    return info;
  } catch (error) {
    console.error("Error in OTP send file in mailSender function", error);
  }
};

export default mailSender;
