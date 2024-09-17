'use client';
import { registerUser } from '@/utils/registerUser';
import { useSession, signIn, signOut } from 'next-auth/react';

const Page = () => {
	const { data: session } = useSession();
	console.log('SESSION - ', session);

  const handleSubmitRegister = async (formData: FormData) => {
    const mail = formData.get('mail') as string;
    const password = formData.get('password') as string;
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const birth_date = formData.get('birth_date') as string;
    const address = formData.get('address') as string;
    const zip = formData.get('zip')as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    
    // if one is missing, return and alert
    if (!mail || !password || !firstname || !lastname || !birth_date || !address || !zip || !city || !country) {
      alert('Missing data');
      return;
    }

    const newUser = await registerUser({
      mail,
      password,
      firstname,
      lastname,
      birth_date,
      address,
      zip,
      city,
      country,
    });


    console.log('NEW USER - ', newUser);
    if (newUser.error) {
      alert('Error');
      return;
    }
    if (newUser.success) {
      alert('Success');
      return;
    }

  }

	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>Sign out</button>
			</>
		);
	}
	return (
		<>
    <div className="flex flex-col bg-red-200 p-4 rounded-md max-w-sm">
			<p>You are not signed in</p>
			<button onClick={() => signIn()} className='bg-blue-500 text-white p-2 rounded-md'>Sign In</button>
    </div>
      <p>or</p>
        <form action={handleSubmitRegister} className='flex flex-col gap-4 bg-green-200 p-4 rounded-md max-w-sm'>
      <input type="text" name='mail' placeholder='mail' />
      <input type="password" name='password' placeholder='password' />
      <input type="text" name='firstname' placeholder='firstname' />
      <input type="text" name='lastname' placeholder='lastname' />
      <input type="date" name='birth_date' placeholder='birth_date' />
      <input type="text" name='address' placeholder='address' />
      <input type="text" name='zip' placeholder='zip' />
      <input type="text" name='city' placeholder='city' />
      <input type="text" name='country' placeholder='country' />
      <button type='submit'>Sign Up</button>
        </form>
		</>
	);
};

export default Page;
