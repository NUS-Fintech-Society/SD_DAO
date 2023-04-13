import React, { useEffect, useState } from "react";

import { getWalletAddress } from "../components/api/api";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import {
  Stack,
  HStack,
  VStack,
  Center,
  Card,
  Image,
  CardHeader,
  Heading,
  CardBody,
  Box,
  Text,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [showRe, setShowRe] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleSecond = () => setShowRe(!showRe);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (password == confirmPassword) {
      //for backend, if passwords match, then push user's email and password to the database
      window.location.href = "/signinpage";
    } else {
      // the passwords do not match
      alert("passwords do not match");
    }
  };

  return (
    <>
      <div className="bg-signup-page bg-no-repeat bg-cover bg-left-top h-screen">
        <Center className="py-25">
          <form className="form mx-20 my rounded justify-center">
            <div className="grid place-items-center">
              <div className="px-20 py-5">
                <h1 className="text-3xl  mt-36 text-center font-bold text-[#5D6379]">
                  {" "}
                  Sign Up{" "}
                </h1>
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

                  <h2 className="mb-1"> Password </h2>
                  <div className="w-80 flex flex-row rounded-full">
                    <Input
                      bg="white"
                      className="pt-2 pb-2 pl-4 mr-5 w-full rounded-full bg-[#C7C7C7] justify-center items-center"
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
                  <h2 className=" mb-1"> Confirm-Password </h2>
                  <div className="w-80 flex flex-row rounded-full">
                    <Input
                      bg="white"
                      className="pt-2 pb-2 pl-4 mr-5 w-full rounded-full bg-[#C7C7C7]"
                      type={showRe ? "text" : "password"}
                      name="Password"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                    <Button
                      onClick={handleSecond}
                      className="pr-5 pt-2 pb-2 bg-white"
                    >
                      {showRe ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>

                <Link
                  //this part needs backend to implement the push email and password to the database
                  href={"/signinpage"}
                >
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="bg-fintech-yellow font-bold text-black rounded-2xl px-7 py-1.5 mt-10 font-chakraPetch tracking-widest hover:bg-yellow-400"
                      /*handle the logic to update the backend*/
                    >
                      SUBMIT
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </Center>
      </div>
    </>
  );

}
