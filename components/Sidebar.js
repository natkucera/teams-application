import { getSession, useSession } from 'next-auth/react'
import SignOutButton from '../components/SignOutButton';
import Link from 'next/link';
import defaultProfilePicture from "../public/Default.jpg";
import { useRouter } from 'next/router';
import Image from "next/image";


export default function Sidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session)

  return (
    <div className='sidebar'>

        <div className='logo'>Logo Here</div>

        <div className='user'>
            {session?.user?.image ? (
              <img src={session?.user.image} alt="" className="avatar"/>
            ) : (
              <img src={defaultProfilePicture} alt="Default Picture"/>
            )}
            <div className='welcome'>
              <p>Welcome, <br/><span className='username'>{session?.user.name}!</span></p>
            </div>
        </div>

        <hr/>

        <div className='navigation'>
            <ul className='links'>

              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href="/">
                  <Image
                    priority
                    src="/images/home.svg"
                    height={20}
                    width={20}
                    alt="Home Image"
                  />&nbsp;
                  HOME</Link>
              </li>

              <li className={router.pathname == "/teams/create" ? "active" : ""}>
                <Link href="/teams/create">
                  <Image
                    priority
                    src="/images/team-add.svg"
                    height={20}
                    width={20}
                    alt="Create Teams Image"
                  />&nbsp;
                  CREATE TEAM</Link>
              </li>

              <li className={router.pathname == "/teams" ? "active" : ""}>
                <Link href="/teams">
                  <Image
                    priority
                    src="/images/teams.svg"
                    height={20}
                    width={20}
                    alt="View Teams Image"
                    />&nbsp;
                  VIEW TEAMS</Link>
              </li>

              <li className={router.pathname == "/settings" ? "active" : ""}>
                <Link href="/settings">
                  <Image
                    priority
                    src="/images/settings.svg"
                    height={20}
                    width={20}
                    alt="Settings Image"
                    />&nbsp;
                  SETTINGS</Link>
              </li>
            </ul>
            <hr/>
            <div className='logout'>
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