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
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  useFormikContext,
} from "formik";

export default function SignInPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="bg-login-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
      <div className="py-5">
        <form className="form mx-10 my-20">
          <div className="grid grid-cols-2">
            <div className="px-20 py-20">
              <h1 className="text-3xl mb-5 mt-0"> Login </h1>
              <div className="text-l">
                <h2 className="mb-1"> Email </h2>
                <div className="flex flex-col">
                  <Input
                    bg="#F2F2F2"
                    variant="outline"
                    className="mb-2 pt-2 pb-2 pl-4"
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
                    bg="#F2F2F2"
                    className="pt-2 pb-2 pl-4 mr-5 w-full"
                    type={show ? "text" : "password"}
                    name="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    onClick={handleClick}
                    className="pr-5 pt-2 pb-2 bg-white"
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </div>
                <div className="flex flex-row justify-end mt-3">
                  <Link href="/">Forgot password?</Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="bg-fintech-yellow text-black rounded-2xl px-7 py-1.5 mt-10 font-chakraPetch tracking-widest hover:bg-yellow-400"
                  /*onClick={() => setLoginState(!login)}*/
                >
                  LOGIN
                </button>
              </div>
              <div className="flex flex-col items-center justify-center mt-2">
                <Link href="/signuppage">Sign up</Link>
              </div>
            </div>
            {/* <div className="bg-fintech-blue flex flex-cols place-items-center">
              <Link href="/">
                <img
                  src="/fintech_logo.png"
                  alt="Fintech Logo"
                  className="cursor-pointer w-2/3 max-w-md mx-auto"
                />
              </Link>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
