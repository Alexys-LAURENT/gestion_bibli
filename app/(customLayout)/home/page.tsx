import TabsHome from "@/components/HomePage/TabsHome";

const Page = () => {
  return (
    <div className="flex gap-8">
      <div className='w-9/12 flex bg-white p-4 rounded-xl flex-col'>
        <TabsHome/>
      </div>
      <div className='w-3/12 flex bg-white p-4 rounded-xl flex-col'>
      </div>
    </div>
  );
}

export default Page;
