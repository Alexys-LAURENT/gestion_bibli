"use client"
import GetBooks from "./GetBooks";
import {Tabs, Tab} from "@nextui-org/tabs";
import { useState } from "react";

const TabsHome = () => {
    const [tab, setTab] = useState<any>('foryou')
    return (
        <Tabs selectedKey={tab} onSelectionChange={setTab} classNames={{cursor:"bg-gest_cta", tab:`text-white`}} variant="light" aria-label="Options colors">
            <Tab key="foryou" title="For You" className={`grid w-full ${tab !== 'foryou' ? 'text-black' : 'text-white'}`}>
                <GetBooks page="foryou"></GetBooks>
            </Tab>
            <Tab key="mostreservedbooks" title="Most reserved books" className={tab !== 'mostreservedbooks' ? 'text-black' : 'text-white'}>
                <GetBooks page="mostreserved"></GetBooks>
            </Tab>
        </Tabs>
    );
}

export default TabsHome;
  