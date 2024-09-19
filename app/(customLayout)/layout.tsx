import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { auth } from "@/utils/auth";
import { ReactNode } from "react";

const Layout = async ({ children }:{children: ReactNode}) => {
  const session = await auth()
  return (
    <main className="w-full h-full flex flex-col  ">
      <TopBar />
      <div className="flex w-full h-full max-h-[calc(100%-56px)] ">
        <SideBar is_admin={session?.user.is_admin|| false} />
        <div className="w-full h-full p-4">
      {
        children
      }
      </div>
      </div>
    </main>
  );
};

export default Layout;