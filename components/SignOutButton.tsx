"use client"

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button size="sm" variant="faded" color="danger" className="w-full" onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>Sign out</Button>
  );
};

export default SignOutButton;