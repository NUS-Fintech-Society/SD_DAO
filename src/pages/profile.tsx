import React, { useEffect, useState } from "react";
import { getWalletAddress } from "../components/api/api";
import { getAccountHash } from "../components/api/utils";
import NavBar from "../components/Layout/NavBar";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { prisma } from "../server/db/client";
import type { User } from '@prisma/client'
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

const sampleData: User = {
  id: '1',
  name: "Jon",
  email: "test@hmail.com",
  phone: "987654321",
  roles: "Software Developer",
  discord: "pikachu",
  linkedin: "jonthepikachu",
  image: "https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  department: "Blockchain",
  attendance: null,
  batch: null,
  gender: null,
  faculty: null,
  hobbies: null,
  level: "",
  personal_email: null,
  telegram: null,
  wallet: null,
  year: null,
  date_of_birth: null,
  diet: null,
  hashedPassword: "",
  isAdmin: null,
  major: null,
  race: null,
  shirt: null,
  total_events: null
};

const avatar = "https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

export default function Profile() {
  const [page, setPage] = useState("Profile");
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState<User>(sampleData);
  const { data: session, status } = useSession({ required: true });
  console.log(session)
  useEffect(() => {
    const getUser = async () => {
      const email = session?.user?.email;
      if (!email) throw new Error('Cannot get email');
    
      const currentUser = await prisma.user.findUnique({
        where: { email: email },
      });
      console.log(currentUser);
      if (!currentUser) throw new Error('Invalid email');
      setUserData(currentUser as User);
    };
    getUser();
    getWalletAddress().then((addr) => setAddress(addr));
  }, []);

  function PanelLeft() {
    return (
      <div className="relative flex flex-col text-center w-1/5 pb-48">
        <Image
          className="rounded-xl mx-auto w-1/2 h-1/2 z-10"
          src={userData.image? userData.image: avatar}
          alt=""
        />
        <div className="text-xl z-10 my-3">{userData.name}</div>
        <div className="text-xl z-10 my-3">{userData.roles}</div>
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
            <div className="text-xl">{userData.discord}</div>
          </div>
          <div className="inline-flex flex-row space-x-5 py-2">
            <AiFillLinkedin color="steelblue" size={30} />
            <div className="text-xl">{userData.linkedin}</div>
          </div>
          <div className="inline-flex flex-row space-x-5 py-2">
            <MdOutlineAlternateEmail color="lightgray" size={30} />
            <div className="text-xl">{userData.email}</div>
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
            become a professional developer. I hope it&aposs helpful for you and
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
