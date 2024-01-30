import prisma from '../../../prisma';

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    const invitation = await prisma.teamInvitation.findFirst({
      where: { token },
      include: {
        team: {
          select: {
            id:true,
            name:true
          }
        }
      }
    });

    if (!invitation || new Date(invitation.expiresAt) < new Date()) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }


    res.status(200).json({ invitation });
  } catch (error) {
    console.error('Error fetching invitation details:', error);
    res.status(500).json({ error: 'Error fetching invitation details' });
  }
}