import React, { useEffect, useState } from "react";
import { getWalletAddress } from "../components/api/api";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <h1 className="text-3xl text-center mb-4 mt-10"> Login </h1>
      <form className="form my-6 px-10 py-10">
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-l">
            <h2> Email </h2>
            <Input
              type="text"
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h2> Password </h2>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
        <button>login</button>
      </form>
    </>
  );
}
