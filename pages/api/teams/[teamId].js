import prisma from '../../../prisma'

export default async function handler(req, res) {
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamId } = req.query;

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: {
        name: true,
        description: true
      },
    });


    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Error fetching team' });
  }
}

