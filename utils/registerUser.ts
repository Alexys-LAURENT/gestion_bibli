"use server"
import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

export const registerUser = async (data: {
  mail: string;
  password: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  address: string;
  zip: string;
  city: string; 
  country: string;
}) => {

  try {
    if(!data.mail || !data.password || !data.firstname || !data.lastname || !data.birth_date || !data.address || !data.zip || !data.city || !data.country) {
      return  JSON.parse(JSON.stringify({error: true, message: 'Missing data'}));
    }
    const hased_password = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.create({
      data: {
        mail: data.mail,
        password: hased_password,
        firstname: data.firstname,
        lastname: data.lastname,
        birth_date: new Date(data.birth_date),
        address: data.address,
        zip: data.zip,
        city: data.city,
        country: data.country,
      },
    });
    return JSON.parse(JSON.stringify({success: true, data:user}));
  } catch (error) {
    console.error(error);
    return  JSON.parse(JSON.stringify({error: true, message: error}));
  }
  };