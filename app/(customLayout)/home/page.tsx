import {Tabs, Tab} from "@nextui-org/tabs";

const Page = () => {
  return (
    <div>
      <div className='w-4/6 flex bg-white gap-4 p-4 rounded-xl'>
        <Tabs aria-label="Options">
          <Tab key="foryou" title="For You"/>
          <Tab key="mostreservedbooks" title="Most reserved books"/>
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
