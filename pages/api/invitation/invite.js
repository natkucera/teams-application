import prisma from "../../../prisma"
import { v4 as uuidv4 } from 'uuid';
import { sendInvitationEmail } from "./send";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { senderId, email, teamId } = req.body;

    // // Convert senderId to an integer using parseInt
    // const parsedSenderId = parseInt(senderId,10);


    // // Check if the conversion was successful (not NaN)
    // if (isNaN(parsedSenderId)) {
    //   return res.status(400).json({ error: 'Invalid senderId. Must be a valid integer.' });
    // }
  
    // Generate a unique token
    const token = uuidv4();
  
    // Set an expiration time
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
  
    // Save the invitation to the database
      const invitation = await prisma.teamInvitation.create({
        data: {
          senderId,
          email,
          token,
          expiresAt,
          teamId,
        },
      });
      // Send an email to the recipient with a link containing the invitation token
      sendInvitationEmail(email, invitation.token);
  
      res.status(200).json({ message: 'Invitation sent successfully' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }