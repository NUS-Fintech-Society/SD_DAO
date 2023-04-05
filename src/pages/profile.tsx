import React, { useEffect, useState } from "react";
import { getWalletAddress } from "../components/api/api";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Link from "next/link";

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
} from "@chakra-ui/react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";

const sampleData = {
  id: 1,
  nickname: "Jon",
  email: "test@hmail.com",
  phone: "987654321",
  dob: "11/2/1982",
  role: "Software Developer",
  github: "pikachu",
  linkedin: "jonthepikachu",
  avatar:
    "https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  created_at: "test",
  year: 1,
  department: "Blockchain",
};

export default function Profile() {
  const [page, setPage] = useState("Profile");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getWalletAddress().then((addr) => setAddress(addr));
  }, []);

  function PanelLeft() {
    return (
      <div className="relative flex flex-col text-center w-1/5 pb-48">
        <Image
          className="rounded-xl mx-auto w-1/2 h-1/2 z-10"
          src={sampleData.avatar}
          alt=""
        />
        <div className="text-xl z-10 my-3">{sampleData.nickname}</div>
        <div className="text-xl z-10 my-3">{sampleData.role}</div>
      </div>
    );
  }

  function MediaPanel() {
    return (
      <div className="relative flex flex-col">
        <Card
          className="px-3 py-2"
          variant="elevated"
          borderRadius="25px"
          shadow={"base"}
          w={"sm"}
        >
          <div className="inline-flex flex-row space-x-5 py-2">
            <AiFillGithub size={30} />
            <div className="text-xl">{sampleData.github}</div>
          </div>
          <div className="inline-flex flex-row space-x-5 py-2">
            <AiFillLinkedin color="steelblue" size={30} />
            <div className="text-xl">{sampleData.linkedin}</div>
          </div>
          <div className="inline-flex flex-row space-x-5 py-2">
            <MdOutlineAlternateEmail color="lightgray" size={30} />
            <div className="text-xl">{sampleData.email}</div>
          </div>
        </Card>
      </div>
    );
  }

  function AboutPanel() {
    return (
      <Card variant="elevated" borderRadius="25px" shadow={"base"} w={"2xl"}>
        <CardHeader>
          <Heading size="md">About</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {" "}
            I started freeCodeCamp back in 2014. Since then, a ton of people
            have asked for my advice on how to learn to code and ultimately get
            freelance clients and developer jobs. So last year, I wrote an
            entire book summarizing my many tips. Even though one of the Big 5
            book publishers in New York was interested in a book deal, I decided
            to instead make this book freely available to everyone who wants to
            become a professional developer. I hope it's helpful for you and
            your friends who are getting into coding. (full-length book –
            roughly 6 hour read):
            https://www.freecodecamp.org/news/learn-to-code-book/
          </Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="bg-profile-page bg-no-repeat bg-cover bg-left-top h-screen">
      <Link href="/">
        <img
          src="/fintech_logo.png"
          alt="Fintech Logo"
          className="cursor-pointer max-w-20vw top-5vh fixed"
        />
      </Link>
      <Center paddingTop={"150"} mt={-16}>
        <HStack spacing={"80"} paddingLeft={"20"}>
          <PanelLeft />
          <VStack
            alignItems={"end"}
            paddingRight={"10"}
            spacing={"10"}
            paddingBottom="48"
          >
            <MediaPanel />
            <AboutPanel />
          </VStack>
        </HStack>
      </Center>
    </div>
  );
}
