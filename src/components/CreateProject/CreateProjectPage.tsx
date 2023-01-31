import { useState } from 'react';
import DatePicker from './DatePicker';
import { AiTwotoneCalendar } from "react-icons/ai";
import Option from './Option';
import Link from 'next/link';

export default function CreateProjectPage() {

    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <div className="grid mt-24 gap-2 w-screen content-center">
                <h1 className="text-center text-blue-900 text-3xl font-bold">Create a new proposal</h1>
                <div className="inline text-center">
                <h2 className="bg-yellow-100 rounded-lg inline p-1">Project XYZ</h2>
                </div>
                <div className="px-40">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Title</label>
                    <textarea id="title" className="block p-2 w-full box-border h-10 text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 resize-none mb-6
                                focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:bg-slate-50
                                hover:border-yellow-500 hover:bg-slate-100">
                    </textarea>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                    <textarea id="description" className="block box-border h-28 p-2 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 resize-none
                                focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:bg-slate-50
                                hover:border-yellow-500 hover:bg-slate-100">
                    </textarea>
                    <div className="mt-6">
                        <div className="float-left w-1/2">
                            <h4 className="text-sm">Proposal Conditions</h4>
                            <div className="flex items-center mt-3">
                                <input id="default-radio-1" type="radio" value="" name="default-radio" 
                                className="form-radio w-4 h-4 bg-slate-100 checked:bg-yellow-500 cursor-pointer">
                                </input>
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Loss Voting</label>
                                <input id="default-radio-2" type="radio" value="" name="default-radio"
                                className="form-radio ml-6 w-4 h-4 bg-slate-100 checked:bg-yellow-500 cursor-pointer">
                                </input>
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900">Allocation Proposal</label>
                            </div>
                            <div className="mt-5">
                                <label className="relative block w-5/6">
                                    <DatePicker/>
                                    <AiTwotoneCalendar size={24}className="absolute top-1 right-3"/>
                                </label>
                            </div>
                        </div>
                        <div className="w-1/2 float-right">
                            {/* <h4 className="text-sm">Options</h4> */}
                            <div className="w-full">
                                <Option/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <button className="p-1 px-8 bg-amber-200 hover:bg-amber-300 font-bold rounded-lg">Submit</button>
                </div>
            </div>
        </>
    )
}
