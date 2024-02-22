import { useState } from 'react';
import { sendInvitation } from '../pages/api/invitation/api';
import { useSession } from 'next-auth/react';

const InvitationForm = ({ teamId }) => {

    const { data: session } = useSession();
    const [email, setEmail] = useState('');

    if (!session) {
        // Redirect to the login page or handle accordingly
        console.error('User is not authenticated. Redirect to login.');
        return;
      }

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
        <p className='invite-members'>INVITE MEMBERS:</p>
        <form onSubmit={handleInvite}>
        <label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='name@email.com'/>
        </label>
        <button className='button sendinvitebtn'>Send Invitation</button>
        </form>
    </div>

  );
};

export default InvitationForm;