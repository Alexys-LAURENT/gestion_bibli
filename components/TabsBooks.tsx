"use client"
import { FunctionGetAllOnDoingBooks } from "@/utils/FunctionGetAllOnDoingBooks";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export default function Books_Rent() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Books">
        <Tab key="BooksOD" title="On Doing">
          <Card>
            <CardBody>
             fe
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="BooksD" title="Done">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}