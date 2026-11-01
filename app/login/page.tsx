"use client"
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Logo from '@/assets/logo.png';
import { useContext, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ToastContext } from "@/contexts/ToastContext";
const Page = () => {
  const {customToast} = useContext(ToastContext)
  const [form, setform] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async () => {
    if(!form.email || !form.password) return customToast.error('Please fill in all fields');
    signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/home'
    });
  }
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-11/12 md:w-5/12 bg-white p-4 rounded-md gap-4 items-center">
      <Image src={Logo.src} alt='Logo' quality={100} width={100} height={100} className='h-14 w-14' />
      <Input placeholder="Email" value={form.email} onChange={(e) => setform({...form, email: e.target.value})} />
      <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setform({...form, password: e.target.value})} />
      <Button className="bg-gest_cta text-white w-full"
      onClick={handleSubmit}
      >Sign In</Button>
      <Link href="/register">
      Don&apos;t have an account? Sign up
      </Link>
      </div>
    </div>
  );
};

export default Page;