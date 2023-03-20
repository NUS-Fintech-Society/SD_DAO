import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema, ILogin } from "./api/auth/auth";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";
import router, { useRouter } from "next/router";
import { Input, Button } from "@chakra-ui/react";

export default function SignInPage() {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const [userFound, setUserFound] = React.useState(false);
  const onSubmit = useCallback(async (data: ILogin) => {
    console.log("success"),
    await signIn("credentials", { ...data, callbackUrl: "./Navbar" });
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleClick = () => setShow(!show);
  // const handleLogin = () => {
  //   //if backend fetch is successful
  //   setIsLogin(true);
  //   router.push({
  //     pathname: "../components/Layout/NavBar",
  //     query: { login: true },
  //   });
  // };

  return (
    <>
      <div className="bg-login-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
        <main>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
        <div className="py-5">
          <form className="form mx-10 my-20 rounded">
            <div className="grid grid-cols-2">
              <div className="px-20 py-20">
                <h1 className="text-3xl mb-5 mt-0"> Login </h1>
                <div className="text-l">
                  <h2 className="mb-1"> Email </h2>
                  <div className="flex flex-col">
                    <Input
                      bg="white"
                      variant="outline"
                      className="mb-2 pt-2 pb-2 pl-4 rounded-full bg-[#C7C7C7]"
                      type="email"
                   
                      placeholder="Username"
                      value={username}
                      {...register("email")}
                    />
                  </div>
                  <h2 className="mb-1"> Password </h2>
                  <div className="flex flex-row">
                    <Input
                      bg="white"
                      className="pt-2 pb-2 pl-4 mr-5 w-full rounded-full bg-[#C7C7C7]"
                      type={show ? "text" : "password"}

                      placeholder="Password"
                      value={password}
                      {...register("password")}
                    />
                    <Button
                      onClick={handleClick}
                      className="pr-5 pt-2 pb-2 text-black"
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <div className="flex flex-row justify-end mt-3">
                    <Link href="/resetpassword">Forgot password?</Link>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="bg-fintech-yellow text-black font-bold rounded-2xl px-7 py-1.5 mt-10 font-chakraPetch tracking-widest hover:bg-yellow-400"
                
                  >
                    LOGIN
                  </button>
                  <Link href="/signup">
                    <div className="flex flex-col mt-2">
                      <button
                        className="text-black font-chakraPetch underline"
                        /*onClick={() => setLoginState(!login)}*/
                      >
                        Sign Up
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" flex flex-cols place-items-center">
                <Link href="/">
                  <img
                    src="/fintech_logo.png"
                    alt="Fintech Logo"
                    className="cursor-pointer w-2/3 max-w-md mx-auto"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
        </form>
      </main>
      </div>
    </>
  );
}
