import prisma from '../../../prisma'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    const { name, description } = req.body;
    try {
      const existingTeam = await prisma.team.findFirst({
        where: { name }, // Check if a team with the same name already exists
      });
  
      if (existingTeam) {
        return res.status(400).json({ error: 'Team already exists' });
      }

      const createdTeam = await prisma.team.create({
        data: {
          name,
          description,
          userId: session.user.id,
        }
      });

      res.status(201).json({ team: createdTeam });
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Error creating team' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}