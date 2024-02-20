import { useRouter } from "next/router";
import prisma from "../../prisma";
import InvitationForm from "../../components/InvitationForm";


const TeamDetailsPage = ({ team }) => {
  const router = useRouter();
  const {teamId} = router.query;

  return (
    <div>
      <h1>TEAM DETAILS</h1>
      {team ? (
        <div>
          <p>Name: {team.name}</p>
          <p>Description: {team.description}</p>
          <InvitationForm teamId={teamId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
    const { teamId } = context.query;
    try {
      const team = await prisma.team.findUnique({
        where: { id: teamId },
        select: {
          name: true,
          description: true,
        },
      });
  
      return {
        props: {
          team,
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

