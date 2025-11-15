import Queue from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

emailQueue.process(async (job, done) => {
  const { data, subject, text, attachments } = job.data;

  try {
    // Send email with PDF attachment
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: data.email,
      subject,
      text,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    done();
  } catch (error) {
    done(error);
  }
});

export default emailQueue;
