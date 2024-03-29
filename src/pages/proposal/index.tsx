import React, { useState, useEffect } from "react";
import Card from "../../components/Proposal/Card";
import {
  Box,
  Center,
  VStack,
  Stack,
  Button,
  Wrap,
  Text,
  Heading,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import "../../components/Proposal/newproposalpage.svg";
import { getProposalHashes, getProposalInfo, getWalletAuthenticated, retrieveProposal } from "../../components/api/api";
import { ProposalInfo } from "../../components/api/types";
import { Proposal } from "../../components/api/types";
import { useSession } from "next-auth/react";

interface ProposalProps {
  proposedTitle1: string;
  proposedDescription1: string;
  endDate1: string;
  minStake1: number;
  proposedType1: string;
  ipfsHash: { ipfsHash: string };
}

const Proposal: React.FC<ProposalProps> = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  // Getting proposal content
  const [proposalContent, setProposalContent] = useState<Proposal | null>(null);
  const [proposalInfo, setProposalInfo] = useState<ProposalInfo | null>(null);

  // const [proposalList, setProposalList] = useState<Proposal[]>([]);
  // const [proposalToShow, setProposalToShow] = useState(0);

  // useEffect(() => {
  //   if (proposalList.length === 0) {
  //     getProposalHashes().then((proposalData: string[]) => {
  //       setProposalToShow(proposalData.length);
  //       if (proposalData.length) {
  //         proposalData.forEach(async (element) => {
  //           if (element) {
  //             await retrieveProposal(element).then((data) => {
  //               const new_data = { ...data, ipfs: element };
  //               setProposalList((prevState) => [...prevState, new_data]);
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, []);

  const [proposalList, setProposalList] = useState<Proposal[]>([]);
  const [proposalToShow, setProposalToShow] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (proposalList.length === 0) {
      getProposalHashes().then((proposalData: string[]) => {
        setProposalToShow(proposalData.length);
        if (proposalData.length) {
          proposalData.forEach(async (element) => {
            if (element) {
              await retrieveProposal(element).then((data) => {
                const new_data = { ...data, ipfs: element };
                setProposalList((prevState) => [...prevState, new_data]);
              });
            }
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    getWalletAuthenticated().then((isAuthenticated) =>
      setAuthenticated(isAuthenticated)
    );
  }, []);

  useEffect(() => {
    async function getProposal() {
      await retrieveProposal(props.ipfsHash.ipfsHash).then((proposal) => {
        setProposalContent(proposal);
      });
      await getProposalInfo(props.ipfsHash.ipfsHash).then((info) => {
        setProposalInfo(info);
      });
    }
    getProposal();
    console.log(proposalContent);
  }, [props.ipfsHash]);

  const testData: {
    proposedTitle: string;
    proposedDescription: string;
    endDate: string;
    minStake: number;
    proposedType: string;
    remainingTokens: number;
  }[] = [
    {
      proposedTitle: "Use Holographic Consensus",
      proposedDescription:
        "The holographic consensus DAO voting mechanism is designed to screen out and focus attention on proposals that are most likely to be passed in a DAO. This model of voting aims to solve the governance scalability-resilience problem in decentralized organizations.",
      endDate: "9/8/2023",
      minStake: 90,
      proposedType: "DAO",
      remainingTokens: 6,
    },
    {
      proposedTitle: "Recruit 2 more FE Devs for Fintech monthwebsite",
      proposedDescription:
        "We need more Front end developers for FTS website project to ensure that we reach our deadline in time.",
      endDate: "1/8/2023",
      minStake: 10,
      proposedType: "SD",
      remainingTokens: 6,
    },
    {
      proposedTitle: "Organize monthly cohesions",
      proposedDescription:
        "Organize Monthly cohesions for Software Development department, this will promote teamwork and improve productivity in members.",
      endDate: "5/12/2023",
      minStake: 5,
      proposedType: "SD",
      remainingTokens: 66,
    },
  ];

  // const [authenticated, setAuthenticated] = useState(false);
  // // Getting proposal content
  // const [proposalContent, setProposalContent] = useState<Proposal | null>(null);
  // const [proposalInfo, setProposalInfo] = useState<ProposalInfo | null>(null);

  // useEffect(() => {
  //   getWalletAuthenticated().then((isAuthenticated) =>
  //     setAuthenticated(isAuthenticated)
  //   );
  // }, []);

  // useEffect(() => {
  //   async function getProposal() {
  //     await retrieveProposal(ipfsHash).then((proposal) => {
  //       setProposalContent(proposal);
  //     });
  //     await getProposalInfo(ipfsHash).then((info) => {
  //       setProposalInfo(info);
  //     });
  //   }
  //   getProposal();
  // }, [ipfsHash]);

  return (
    <>
      <div className={"proposalBackground bg-scroll bg-cover bg-no-repeat bg-left-top min-h-screen -mt-16"}>
      {session?
      <div>
         <Center mt={-16}>
          <VStack>
            <Heading mt={200}>Proposals</Heading>
            <Text
              mt={200}
              backgroundColor={"#AEAEAE"}
              fontSize={20}
              borderRadius={"full"}
              align={"center"}
              w={"36"}
              h={"8"}
            >
              Project XYZ
            </Text>
          </VStack>
        </Center>
        <Center padding={"20"}>
          <Stack direction={"column"}>
            <Wrap>
              <Button
                leftIcon={
                  <AddIcon color={"black"} width={3} paddingTop={0.5} />
                }
                backgroundColor="#D9D9D9"
                color={"black"}
                size="md"
              >
                New Proposal
              </Button>
            </Wrap>
            <VStack>
              {testData.map((obj) => {
                return (
                  <Box paddingBottom={5}
                  key = {obj.proposedTitle}>
                    <Card
                      proposedTitle={obj.proposedTitle}
                      proposedDescription={obj.proposedDescription}
                      proposedType={obj.proposedType}
                      endDate={obj.endDate}
                      minStake={obj.minStake}
                      remainingTokens={obj.remainingTokens}
                    />
                  </Box>
                );
              })}
            </VStack>
          </Stack>
        </Center>
        </div>:
        <div className = "h-screen flex items-center justify-center font-bold">
       
         Looks like you are not logged in, please sign in first!
         
          </div>}
      </div>
    </>
  );
};

export default Proposal;
