"use client"

import moment from "moment";
import {DateValue, parseDate} from "@internationalized/date";
import { useState } from "react";
import {DatePicker} from "@nextui-org/react";
const CustomDateInput = ({initDate}:{initDate:string}) => {
  const momentDate = moment(initDate).format('YYYY-MM-DD')
  const [date, setdate] = useState<DateValue>(parseDate(momentDate))
  
  return (
    <DatePicker label={"Birth date"} showMonthAndYearPickers 
    onChange={setdate} defaultValue={date} name="birthdate" /> 

  );
};

export default CustomDateInput;