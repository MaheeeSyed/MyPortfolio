const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Check if the method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the form data from the request body
    const formData = JSON.parse(event.body);

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password',    // Replace with your email password or app password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: formData.email,
      to: 'recipient-email@example.com',  // Replace with the recipient's email
      subject: 'New Contact Form Submission',
      text: `Message from: ${formData.name}\n\n${formData.message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending message', error }),
    };
  }
};

