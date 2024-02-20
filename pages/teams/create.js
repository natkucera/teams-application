import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const CreateTeamPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/teams/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          name: teamName,
          description: teamDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Team created:', data.team);
        router.push(`/teams/${data.team.id}`); // Redirect to teams list or team details
      } else {
        const errorData = await response.json();
        console.error('Error creating team', errorData.error);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className='create-container'>
      <h1>CREATE TEAM</h1>
        <div className='create-form'>
          <form onSubmit={handleCreateTeam}>
            <label>
              Team Name:
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </label>
            <label>
              Team Description:
              <textarea
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </label>
            <button className='button createbtn'>Create Team</button>
          </form>
        </div>
      
    </div>
  );
};

export default CreateTeamPage;