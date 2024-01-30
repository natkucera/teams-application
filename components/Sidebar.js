import { getSession, useSession } from 'next-auth/react'
import SignOutButton from '../components/SignOutButton';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session)

  return (
    <div className='sidebar'>
        <div className='user'>
            <img src={session?.user.image} alt="" className="avatar"/>
            <h3>Welcome, {session?.user.name}!</h3>
        </div>
        <div className='navigation'>
            <div className='links'>
              <div><Link href="/teams/create">Create Team</Link></div>
              <div><Link href="/teams">View Teams</Link></div>
            </div>
            <div>
                <SignOutButton />
            </div>
        </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}