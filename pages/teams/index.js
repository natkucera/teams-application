import { useRouter } from 'next/router';
import prisma from '../../prisma'


export async function getServerSideProps() {

  const teams = await prisma.team.findMany();

  return {
    props: {
        teams
    },
  };

}

const TeamsPage = ({teams}) => {

    const router = useRouter();

    const handleTeamClick =(teamId) => {
        router.push(`/teams/${teamId}`)
    }

  return (
    <div>
      <h1>Teams</h1>
        <ul>
          {teams.map((team) => (
            <li key={team.id} onClick={() => handleTeamClick(team.id)}>{team.name}</li>
          ))}
        </ul>
    </div>
  );
};

export default TeamsPage;