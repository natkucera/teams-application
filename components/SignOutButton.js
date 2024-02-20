import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignOutButton = () => {
  const router = useRouter();
  const { data: session} = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/signin');
  };

  return (
    <button onClick={handleSignOut} className='button logoutbtn' >Logout</button>
  );
};

export default SignOutButton;