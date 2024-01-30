import { signIn, signOut, useSession } from 'next-auth/react';

const LoginPage = (e) => {

  const { data: session } = useSession();

  if (session && session.user) {

    return (
      <div>
        <button onClick={()=>signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn(undefined, {callbackUrl: "/"})}>Sign In</button>

};

export default LoginPage;
