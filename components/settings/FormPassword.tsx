"use client"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const FormPassword = ({handleUpdatePassword}:{handleUpdatePassword:(formdata:FormData)=>void}) => {
  return (
    <form action={handleUpdatePassword} className="flex flex-col gap-4 bg-white border border-red-500/20 p-4 rounded-md">
    <Input type="password" label="Current password" name="currentPassword" placeholder="Enter your current password" />
    <Input type="password" label="New password" name="newPassword" placeholder="Enter your new password"/>
    <Button type="submit" className="bg-gest_cta text-white font-semibold">Update password</Button>
    </form>
  );
};

export default FormPassword;