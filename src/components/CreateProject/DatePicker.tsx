import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const DatePicker = () => {
    const [endDate, setEndDate] = useState<Date>();

    return (
        <label>
         <ReactDatePicker 
            selected={endDate} 
            onChange={(date:Date) => setEndDate(date)} 
            disabledKeyboardNavigation
            placeholderText="End Date: DD/MM/YY"
            className="rounded-lg w-full h-8 pl-4 text-sm bg-gray-300 border-gray-300
            focus:bg-slate-50 focus:ring-yellow-500 focus:border-yellow-500
            hover:border-yellow-500 hover:bg-slate-50"
        />
        </label>
    );
};

export default DatePicker;