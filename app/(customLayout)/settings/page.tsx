import { Input } from "@nextui-org/input";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/button";
import prisma from "@/lib/db";
import moment from "moment";
import FormProfile from "@/components/settings/FormProfile";
import bcrypt from 'bcrypt';

const Page = async ({searchParams}:{searchParams?: { [key: string]: string | string[] | undefined };}) => {
  const session = await auth()
  
  if(!session)redirect('/login')

    const handleUpdateProfile = async (formData: FormData) => {
      "use server"
      const data = {
        firstname: formData.get('firstname') as string,
        lastname: formData.get('lastname')as string,
        email: formData.get('mail')as string,
        birthdate:formData.get('birthdate')as string,
        address: formData.get('address')as string,
        zip: formData.get('zip')as string,
        city: formData.get('city')as string,
        country: formData.get('country')as string
      }
      

      if(!data.firstname || !data.lastname || !data.email || !data.address || !data.zip || !data.city || !data.country || !data.birthdate){
        return redirect('/settings?error=Please fill all fields')
      }

      if(!data.email.includes('@') || !data.email.includes('.')){
        return redirect('/settings?error=Email format not valid')
      }

      await prisma.users.update({
        where: {
          id_user: Number(session.user.id_user)
        },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          mail: data.email,
          birth_date: moment(data.birthdate).toISOString(),
          address: data.address,
          zip: data.zip,
          city: data.city,
          country: data.country
        }
      })



      return redirect('/settings?success=Profile updated successfully')
      
    }


    const handleUpdatePassword = async (formData: FormData) => {
      "use server"
      const data = {
        currentPassword: formData.get('currentPassword') as string,
        newPassword: formData.get('newPassword')as string,
      }

      if(!data.currentPassword || !data.currentPassword){
        return redirect('/settings?error=Please fill all fields')
      }

      if(data.newPassword.length < 6 ){
        return redirect('/settings?error=New password should be at least 6 characters')
      }

      const user = await prisma.users.findFirst({
        where: {
          id_user: Number(session.user.id_user),
        },
      });
      if (!user) {
        return redirect('/settings?error=Cannot find user')
      }

      

      const isValid = bcrypt.compareSync(data.currentPassword, user.password);

      if (isValid) {
        await prisma.users.update({
          where: {
            id_user: Number(session.user.id_user),
          },
          data: {
            password: bcrypt.hashSync(data.newPassword, 10),
          },
        });
        return redirect('/settings?success=Password updated successfully')

      } else {
        return redirect('/settings?error=Current password is not correct')
        
      }
    }
    

  return (
    <div className="flex flex-col gap-4">
      {searchParams && searchParams.error && <div className="w-full bg-red-500 text-white p-4 rounded-md">{searchParams.error}</div>}
      {searchParams && searchParams.success && <div className="w-full bg-green-400 text-white p-4 rounded-md">{searchParams.success}</div>}
      <FormProfile session={session} handleUpdateProfile={handleUpdateProfile}/>
      <form action={handleUpdatePassword} className="flex flex-col gap-4 bg-white border border-red-500/20 p-4 rounded-md">
      <Input type="password" label="Current password" name="currentPassword" placeholder="Enter your current password" />
      <Input type="password" label="New password" name="newPassword" placeholder="Enter your new password"/>
      <Button type="submit" className="bg-gest_cta text-white font-semibold">Update password</Button>
      </form>
    </div>
  );
};

export default Page;