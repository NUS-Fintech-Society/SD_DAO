import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";
import router, { useRouter } from "next/router";
import { Input, Button } from "@chakra-ui/react";

export default function SignInPage() {
  const [userFound, setUserFound] = React.useState(false);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    /*for backend, submit button sends a request to search for the email in the database, if not found return false, else return true*/
    event.preventDefault();

    // make a call to backend to check if the user exists in the database
    /*
    const response = await fetch('/api/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username}),
    });
    */
    if (userFound) {
      // if the user exists, redirect to the main page
    } else {
      // if the user doesn't exist, show an alert
      alert("No user found");
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleClick = () => setShow(!show);
  const handleLogin = () => {
    //if backend fetch is successful
    setIsLogin(true);
    router.push({
      pathname: "../components/Layout/NavBar",
      query: { login: true },
    });
  };

  return (
    <>
      <div className="bg-login-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
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
                      name="Username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <h2 className="mb-1"> Password </h2>
                  <div className="flex flex-row">
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
                    onClick={handleLogin}
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
      </div>
    </>
  );
}
