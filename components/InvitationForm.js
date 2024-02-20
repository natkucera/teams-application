import { useState } from 'react';
import { sendInvitation } from '../pages/api/invitation/api';
import { useSession } from 'next-auth/react';

const InvitationForm = ({ teamId }) => {

    const { data: session } = useSession();

    if (!session) {
        // Redirect to the login page or handle accordingly
        console.error('User is not authenticated. Redirect to login.');
        return;
      }

  const [email, setEmail] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();

    const senderId = session.user.id;

    // Send invitation
    await sendInvitation(senderId, email, teamId);

    // Optionally, you can reset the form or provide user feedback
    setEmail('');
    alert('Invitation sent!');
  };

  return (
    <div className='invite-section'>
        <p>Send an invite:</p>
        <form onSubmit={handleInvite}>
        <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button className='button sendinvitebtn'>Send Invitation</button>
        </form>
    </div>

  );
};

export default InvitationForm;