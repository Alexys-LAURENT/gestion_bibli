"use client"
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Logo from '@/assets/logo.png';
import { useState } from "react";
import { registerUser } from "@/utils/registerUser";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { DateInput } from "@nextui-org/date-input";
import {DateValue} from "@internationalized/date";
const Page = () => {
  const [form, setform] = useState({
    mail: "",
    password: "",
    firstname: "",
    lastname: "",
    birth_date: null as null | DateValue,
    address: "",
    zip: "",
    city: "",
    country: "",
  })

  const handleSubmitRegister = async () => {
    // if one is missing, return and alert
    if (is_disabled()) {
      alert('Missing data');
      return;
    }

    const newUser = await registerUser({
      mail: form.mail,
      password: form.password,
      firstname: form.firstname,
      lastname: form.lastname,
      birth_date: form.birth_date!.toString(),
      address: form.address,
      zip: form.zip,
      city: form.city,
      country: form.country,
    });

    if (newUser.error) {
      alert('Error');
      return;
    }
    if (newUser.success) {
      alert('Success');
      return signIn('credentials', {
        email: form.mail,
        password: form.password,
        callbackUrl: '/home'
      });
    }

  }

  const is_disabled =()=>{
    if(!form.mail || !form.password || !form.firstname || !form.lastname || !form.birth_date || !form.address || !form.zip || !form.city || !form.country){
      return true;
    }
    return false;
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-11/12 md:w-5/12 bg-white p-4 rounded-md gap-4 items-center">
      <Image src={Logo.src} alt='Logo' quality={100} width={100} height={100} className='h-14 w-14' />
      <Input placeholder="Email" value={form.mail} onChange={(e) => setform({...form, mail: e.target.value})} />
      <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setform({...form, password: e.target.value})} />
      <Input placeholder="Firstname" value={form.firstname} onChange={(e) => setform({...form, firstname: e.target.value})} />
      <Input placeholder="Lastname" value={form.lastname} onChange={(e) => setform({...form, lastname: e.target.value})} />
      <DateInput value={form.birth_date} onChange={(value) => setform({...form, birth_date: value})} />
      <Input placeholder="Address" value={form.address} onChange={(e) => setform({...form, address: e.target.value})} />
      <Input placeholder="Zip" value={form.zip} onChange={(e) => setform({...form, zip: e.target.value})} />
      <Input placeholder="City" value={form.city} onChange={(e) => setform({...form, city: e.target.value})} />
      <Input placeholder="Country" value={form.country} onChange={(e) => setform({...form, country: e.target.value})} />
      <Button className="bg-gest_cta text-white w-full disabled:opacity-50 hover:disabled:opacity-50"
      disabled={is_disabled()}
      onClick={handleSubmitRegister}
      >Register</Button>
        <Link href="/login">
        Already have an account? Sign in
      </Link>
      </div>
    </div>
  );
};

export default Page;