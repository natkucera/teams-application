const sendInvitation = async (senderId, email, teamId) => {
    try {
      const response = await fetch('/api/invitation/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId, email, teamId }),
      });
  
      const data = await response.json();
      console.log(data); // Log the response from the server
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };
  
  export { sendInvitation };