"use client"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import CustomDateInput from "@/components/settings/DateInput";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const FormProfile = ({handleUpdateProfile, session}:{handleUpdateProfile:(formdata:FormData)=>void, session:Session}) => {
  const { update } = useSession()
  const handleSubmit = (formdata:FormData) => {
    handleUpdateProfile(formdata)
    update({
        firstname: formdata.get('firstname') as string,
        lastname: formdata.get('lastname') as string,
        email: formdata.get('mail') as string,
        birth_date: formdata.get('birthdate') as string,
        address: formdata.get('address') as string,
        zip: formdata.get('zip') as string,
        city: formdata.get('city') as string,
        country: formdata.get('country') as string
    })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-md">
      <Input type="text" label="firstname" name="firstname" placeholder="Enter your first name" defaultValue={session.user.firstname}/>
      <Input type="text" label="lastname" name="lastname" placeholder="Enter your last name" defaultValue={session.user.lastname}/>
      <Input type="text" label="mail" name="mail" placeholder="Enter your email address" defaultValue={session.user.email!}/>
      <CustomDateInput initDate={session.user.birth_date}/>
      <Input type="text" label="address" name="address" placeholder="Enter your address" defaultValue={session.user.address}/>
      <Input type="text" label="zip" name="zip" placeholder="Enter your zip" defaultValue={session.user.zip}/>
      <Input type="text" label="city" name="city" placeholder="Enter your city" defaultValue={session.user.city}/>
      <Input type="text" label="country" name="country" placeholder="Enter your country" defaultValue={session.user.country}/>
      <Button type="submit" className="bg-gest_cta text-white font-semibold">Update</Button>
      </form>
  );
};

export default FormProfile;