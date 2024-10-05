import TabsHome from "@/components/HomePage/TabsHome";
import AuthorSide from "@/components/HomePage/AuthorSide";
import SubjectSide from "@/components/HomePage/SubjectSide";

const Page = () => {
  return (
    <div className="flex gap-8">
      <div className='w-9/12 flex bg-white p-4 rounded-xl flex-col'>
        <TabsHome/>
      </div>
      <div className="block gap-8 w-3/12">
        <div className='flex bg-white p-4 rounded-xl flex-col'>
          <AuthorSide/>
        </div>
        <div className='flex bg-white mt-8 p-4 rounded-xl flex-col'>
          <SubjectSide/>
        </div>
      </div>
    </div>
  );
}

export default Page;
