import { signIn, signOut, useSession } from 'next-auth/react';

const LoginPage = (e) => {

  const { data: session } = useSession();

  if (session && session.user) {

    return (
      <div>
        <button className="button logout-btn" onClick={()=>signOut()}>Logout</button>
      </div>
    );
  }

  return <div className='login-page'>
    <div className='welcome-logo'>Logo Here</div>

    <div className='welcome-content'>
      <h1 className='welcome-message'>Welcome! <br/> <span className='login-message'>Please login to continue.</span></h1>
      <div className='loginbtn-section'>
        <button className="button login-btn" onClick={() => signIn(undefined, {callbackUrl: "/"})}>Login</button>
      </div>
    </div>
    
    </div>

};

export default LoginPage;
