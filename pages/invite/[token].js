import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AcceptInvitation = () => {
  const router = useRouter();
  const { token } = router.query;
  const { data: session, status } = useSession();
  const [invitation, setInvitation] = useState(null)

  useEffect(() => {
    if (!session) {
      // Redirect to the login page if the user is not signed in
      router.push('/signIn');
    }
  }, [session, status]);

  useEffect(() => {

    const fetchInvitation = async () => {
      try {
        const response = await fetch(`/api/invitation/${token}`);
        if (response.ok) {
          const data = await response.json();
          setInvitation(data.invitation);
        } else {
          const errorData = await response.json();
          console.error('Error fetching invitation details', errorData);
        }
      } catch (error) {
        console.error('Error fetching invitation details:', error);
      }
    };

    if (token && session) {
      fetchInvitation();
    }
  }, [token, session]);

  const handleAccept = () => {
    // Handle the logic for accepting the invitation
    // Example redirection:
    router.push(`/teams/${invitation.team.id}`); // Redirect to the teams page
  };

  const handleReject = () => {
    // Handle the logic for rejecting the invitation
    // Example redirection:
    router.push('/'); // Redirect to the home page after rejecting
  };

  return (
    <div>
      {invitation ? (
        <div>
          <h1>You've been invited to join {invitation.team.name}!</h1>
          <p>Click "Accept" to be added to the team or "Reject" to go back to the homepage.</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default AcceptInvitation;