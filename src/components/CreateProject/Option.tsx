import React, { FormEvent, useState } from "react";
import {IoIosAddCircle} from "react-icons/io"
import { optional, string } from "zod";

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
// } from '@chakra-ui/react';


const Option = () => {

    const [option, setOption] = useState("");

    const options = [] as any;

    const handleSubmit = async(event: FormEvent) => {
        event.preventDefault();
        console.log("submitted")
        /* Need backend to store the option value in the list and retrieve it from database */ 
    }



    return (
        <>
        <label htmlFor="countries" className="block mb-11 text-sm font-medium text-gray-600">Options</label>
        <form>
            <label className='flex items-center'>
                    <input 
                    list="browsers" 
                    className="w-full mb-2 p-2.5 bg-gray-300 border-gray-300 rounded-lg p-1 pl-2.5 text-sm
                    focus:outline-yellow-500 focus:bg-slate-50
                    hover:border-yellow-500 hover:bg-slate-100"
                    placeholder="Add Options"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    ></input>
                    <IoIosAddCircle onClick={handleSubmit} className="-ml-6 -mt-2 cursor-pointer"/>
            </label>
        </form>
            {/* <datalist id="options" className="bg-gray-300 border-gray-300 border text-gray-900 text-sm rounded-lg block w-full p-1
            focus:ring-yellow-500 focus:border-yellow-500
            hover:border-yellow-500 hover:bg-slate-50">
                <option selected>Voting Options</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </datalist> */}
        </>
    )
}

export default Option;