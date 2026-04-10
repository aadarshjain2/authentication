import nodemailer from "nodemailer"

export async function sendResetEmail(email: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset.</p>
      <p>Click the button below to reset your password:</p>

      <a href="${resetLink}" 
         style="
         padding:10px 20px;
         background:#000;
         color:#fff;
         text-decoration:none;
         border-radius:5px;">
         Reset Password
      </a>

      <p>This link expires in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}