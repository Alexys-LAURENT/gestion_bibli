"use client"
import { Button } from '@nextui-org/button';
import Link from 'next/link';

const RedirectSignInButton = () => {
  return (
    <Button as={Link} href='/login' size='sm' className='bg-gest_cta text-white' >Sign In</Button>
  );
};

export default RedirectSignInButton;