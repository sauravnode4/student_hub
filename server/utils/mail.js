const nodemailer = require("nodemailer");

const sendOtpMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sauravnode4@gmail.com",
        pass: "fszw uwkv akfb wpuu"
      },
    });

    const mailOptions = {
      from: `"STD_HUB" <sauravnode4@gmail.com>`,
      to: email,
      subject: "FORGET PASSWORD OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>OTP Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color: blue;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendOtpMail;