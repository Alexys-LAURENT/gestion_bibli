import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { ReactNode } from "react";

const Layout = ({ children }:{children: ReactNode}) => {
  return (
    <main className="w-full h-full flex flex-col">
      <TopBar />
      <div className="flex w-full h-full">
        <SideBar />
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