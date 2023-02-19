import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";
import {
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react";

export default function ResetPasswordEmail() {
    const [username, setUsername] = useState("");
    const [emailFound, setemailFound] = React.useState(true);
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        /*for backend, submit button sends a request to search for the email in the database, if not found return false, else return true*/
        event.preventDefault();

        // make a call to backend to check if the user exists in the database, if the user
        // exists, change the state of the emailFound
        if (emailFound) {
            // if the user exists, redirect to the main page
            window.location.href = '/EnterNewPassword';
        } else {
            // if the user doesn't exist, show an alert
            alert('No user found');
        }
    }


    return (
        <>
            <div className=' bg-signup-page bg-no-repeat bg-cover bg-left-top h-screen'>
                <div className="py-3">
                    <div className="blue flex flex-cols place-items-center">
                        <Link href="/">
                            <img
                                src="/fintech_logo.png"
                                alt="Fintech Logo"
                                className="cursor-pointer max-w-md mx-auto"

                            />
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="form mx-20 my rounded justify-center">
                        <div className="grid place-items-center">
                            <div className="px-20 py-5">
                                <h1 className="text-3xl mb-5 mt-0 text-center font-bold text-[#5D6379]"> Reset Password </h1>
                                <div className="text-l justify-center items-center">
                                    <h2 className="mb-1"> Email </h2>
                                    <div className="w-80 flex flex-col rounded-full">
                                        <Input
                                            bg="white"
                                            variant="outline"
                                            className="mb-2 pt-2 pb-2 pl-4 rounded-full"
                                            type="email"
                                            name="Username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <button
                                        /*for backend, submit button sends a request to search for the email in the database, if not found return false, else return true*/
                                        onClick={handleSubmit}
                                        className="bg-fintech-yellow font-bold text-black rounded-2xl px-7 py-1.5 mt-10 font-chakraPetch tracking-widest hover:bg-yellow-400"
                                        type="submit"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}