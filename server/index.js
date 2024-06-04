const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("This is Home Page");
});

//send mail request
app.post("/api/sendmail", async (req, res) => {
  const { email } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Thank You Message";
    const message = `
        <h1>Thank You for taking this Node Course</h1>
        <p>we will get back to you soon</p>
        <p>Regards.....</p>

    `;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
