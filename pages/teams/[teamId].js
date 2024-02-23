import { useRouter } from "next/router";
import prisma from "../../prisma";
import InvitationForm from "../../components/InvitationForm";
import { useState } from "react";


const TeamDetailsPage = ({ team, users }) => {
  const router = useRouter();
  const {teamId} = router.query;
  const [loading, setLoading] = useState(false);

  if (!team) {
    return <p>Error: Team not found.</p>;
  }

  const handleLoading = (isLoading) => {
    setLoading(isLoading)
  }

  return (
    <div>
      <h1>TEAMS: {team.name}</h1>
      <hr className="linebreak"/>
      <p>Description: {team.description}</p> <br/>
      <p>Members:</p>

      <ul className="member-list">
        {users?.map((user => (
          <li key={user.id}>
            <img src={user.image} alt={user.name} className="member-avatar"/>
            {user.name}
            </li>
        )))}
      </ul>

      {loading? (
        <p>Loading...</p>
      ) : (
        <InvitationForm teamId={teamId} handleLoading={handleLoading}/>
      )}

    </div>
  );
};

export async function getStaticProps(context) {
    const { teamId } = context.query;

    try {
      const team = await prisma.team.findUnique({
        where: { id: teamId },
        select: {
          name: true,
          description: true,
        },
      });

      const users = await prisma.user.findMany({
        where: {
          teams: {
            some: {
              id: teamId
            }
          }
        }
      })
  
      return {
        props: {
          team,
          users,
        },
      };

    } catch (error) {
      console.error('Error fetching team:', error);
      return {
        props: {},
      };
    }
  }

export default TeamDetailsPage;

