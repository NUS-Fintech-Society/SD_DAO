import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { signUpSchema, ISignUp } from "./api/auth/auth";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
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
  Center,
} from "@chakra-ui/react";

const SignUpPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [showRe, setShowRe] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleSecond = () => setShowRe(!showRe);
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.useMutation(["signup"]);

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push("/");
      }
    },
    [mutateAsync, router]
  );

  return (
    <>
    
      <div className=" bg-no-repeat bg-signup-page bg-cover bg-left-top h-screen -mt-16">
      <main>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                      placeholder="Username"
                      value={username}
                      {...register("email")}
                      //onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <h2 className="mb-1"> Password </h2>
                  <div className="w-80 flex flex-row rounded-full">
                    <Input
                      bg="white"
                      className="pt-2 pb-2 pl-4 mr-5 w-full rounded-full bg-[#C7C7C7] justify-center items-center"
                      type={show ? "text" : "password"}
            
                      placeholder="Password"
                      value={password}
                      {...register("password")}
                      //onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </main>
      </div>
      
    </>
  );
}
