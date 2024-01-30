const sgMail = require('@sendgrid/mail')

// Set your SendGrid API key here
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an invitation email using SendGrid
const sendInvitationEmail = async (email, invitationToken) => {
  try {
    const msg = {
      to: email,
      from: 'kucera.nat@gmail.com', // Replace with your sender email
      subject: 'Invitation to Join the Team',
      text: `You've been invited to join the team! Click the following link to accept the invitation: http://localhost:3000/invite/${invitationToken}`,
    };

    // Send the email using SendGrid
    await sgMail.send(msg);

    console.log(`Invitation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
};

module.exports = { sendInvitationEmail };