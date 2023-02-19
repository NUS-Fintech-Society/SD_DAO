import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAccountHash } from "../../components/api/utils";
import NavBar from "../../components/Layout/NavBar";
import HeaderTextFormat from "../../components/TextFormats/HeaderTextFormat";
import Description from "../../components/LandingPage/Description";
import HeroBanner from "../../components/LandingPage/HeroBanner";
import {
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react";


export default function EnterNewPassword() {
    const [username, setUsername] = useState("");
    const [show, setShow] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleClick = () => setShow(!show);
    const handleClickConfirm = () => setShowConfirm(!showConfirm);
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        /*for backend, submit button pushes the user's new password to the database*/
     
        event.preventDefault();
        window.location.href = '/signinpage';


    }



    return (
        <>
            <div className=' bg-signup-page bg-no-repeat bg-cover bg-left-top h-screen'>
                <div className="py-3">
                    <div className="blue flex flex-cols place-items-center">
                       
                    </div>
                    <form onSubmit={handleSubmit}
                        className="form mx-20 my rounded justify-center">
                        <div className="grid place-items-center">
                            <div className="px-20 py-5">
                                <h1 className="text-3xl  mt-36 text-center font-bold text-[#5D6379]">Reset Password </h1>
                                <div className="text-l justify-center items-center">
                                    <h2 className="mb-1"> Password </h2>
                                    <div className="w-80 flex flex-row">
                                        <Input
                                            bg="white"
                                            className="pt-2 pb-2 pl-4 mr-5 w-full rounded-full bg-[#C7C7C7]"
                                            type={show ? "text" : "password"}
                                            name="Password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleClick}
                                            className="pr-5 pt-2 pb-2 bg-white text-black"
                                        >
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </div>
                                    <h2 className="mb-1"> Confirm  Password </h2>
                                    <div className="w-80 flex flex-row rounded-full">
                                        <Input
                                            bg="white"
                                            variant="outline"
                                            className="mb-2 pt-2 pb-2 pl-4 mr-5 w-full rounded-full"
                                            type={showConfirm ? "text" : "password"}
                                            name="Password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleClickConfirm}
                                            className="pr-5 pt-2 pb-2 bg-white text-black"
                                        >
                                            {showConfirm ? "Hide" : "Show"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <button
                                        /*for backend, submit button changes the database with the new password*/
                                        className="bg-fintech-yellow font-bold text-black rounded-2xl px-7 py-1.5 mt-10 font-chakraPetch tracking-widest hover:bg-yellow-400"
                                        type="submit"
                                        onClick={handleSubmit}
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