import { auth } from "@/utils/auth";
// import { useSession } from "next-auth/react";

// import { config } from "@/utils/auth";
// import { getServerSession } from "next-auth/next";

// import { getServerSession } from "next-auth";
const Page = async () => {
  // const session  = await getServerSession(config)
  const session = await auth()
  console.log('SERVER SIDE SESSION - ',session)
  return (
    <>
    </>
  )
};
export default Page;


