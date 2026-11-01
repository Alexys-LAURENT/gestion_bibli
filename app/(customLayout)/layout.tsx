import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { auth } from "@/utils/auth";
import { ReactNode } from "react";

const Layout = async ({ children }:{children: ReactNode}) => {
  const session = await auth()
  return (
    <main className="w-full h-full flex flex-col  ">
      <TopBar />
      <div className="flex flex-col sm:flex-row w-full h-full max-h-[calc(100%-56px)] ">
        <SideBar session={session} />
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