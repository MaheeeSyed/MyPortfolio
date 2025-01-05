// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Route to handle form submission
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services like Outlook, Yahoo, etc.
    auth: {
      user: 'contactmaheesyed@gmail.com', // Replace with your email address
      pass: 'nsol yvgm acbc lfqj',  // Replace with your email password or app password
    },
  });

  // Email options
  const mailOptions = {
    from: email, // Sender email
    to: 'contactmaheesyed@gmail.com', // Replace with the email you want to receive messages
    subject: 'New Contact Form Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending message');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Message sent successfully');
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

