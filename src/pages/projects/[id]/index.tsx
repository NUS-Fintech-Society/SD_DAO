import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Proposal, ProposalInfo } from '../../../components/api/types';
import Card from '../../../components/Proposal/Card';
import useGetProposalsData from '../../../hooks/useGetProposalsData';

const testData: {
  proposedTitle: string;
  proposedDescription: string;
  endDate: string;
  minStake: number;
  proposedType: string;
  remainingTokens: number;
}[] = [
  {
    proposedTitle: 'Proposed Title 1',
    proposedDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    endDate: '9/8/2023',
    minStake: 90,
    proposedType: 'DAO',
    remainingTokens: 6,
  },
  {
    proposedTitle: 'Proposed Title 2',
    proposedDescription:
      'Second entry of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    endDate: '1/8/2023',
    minStake: 10,
    proposedType: 'Blockchain',
    remainingTokens: 6,
  },
  {
    proposedTitle: 'Proposed Title 3',
    proposedDescription:
      'Third entry Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    endDate: '5/12/2023',
    minStake: 5,
    proposedType: 'Payments',
    remainingTokens: 66,
  },
  {
    proposedTitle: 'Proposed Title 4',
    proposedDescription:
      'Third entry Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    endDate: '5/12/2023',
    minStake: 5,
    proposedType: 'Payments',
    remainingTokens: 6,
  },
  {
    proposedTitle: 'Proposed Title 5',
    proposedDescription:
      'Third entry Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    endDate: '5/12/2023',
    minStake: 5,
    proposedType: 'Payments',
    remainingTokens: 66,
  },
];

interface ProposalProps {
  proposedTitle1: string;
  proposedDescription1: string;
  endDate1: string;
  minStake1: number;
  proposedType1: string;
  ipfsHash: { ipfsHash: string };
}

const ProjectProposalPage: React.FC<ProposalProps> = () => {
  const router = useRouter();
  const projectId = router.query.id;

  // Getting proposal content
  const [proposalContent, setProposalContent] = useState<Proposal | null>(null);
  const [proposalInfo, setProposalInfo] = useState<ProposalInfo | null>(null);

  const { data } = useGetProposalsData();
  console.log({ data });

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

  const [proposalToShow, setProposalToShow] = useState(0);

  // useEffect(() => {
  //   async function getProposal() {
  //     await retrieveProposal(props.ipfsHash.ipfsHash).then((proposal) => {
  //       setProposalContent(proposal);
  //     });
  //     await getProposalInfo(props.ipfsHash.ipfsHash).then((info) => {
  //       setProposalInfo(info);
  //     });
  //   }
  //   getProposal();
  //   console.log(proposalContent);
  // }, [props.ipfsHash]);

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

  if (projectId === undefined) {
    return (
      <div className={'proposalBackground'}>
        <h1>No Project Found</h1>
      </div>
    );
  }

  return (
    <div
      className={
        'proposalBackground bg-scroll bg-cover bg-no-repeat bg-left-top min-h-screen pt-16'
      }
    >
      <Center mt={-16}>
        <VStack>
          <Heading mt={200}>Proposals</Heading>
          <Text
            mt={200}
            backgroundColor={'#AEAEAE'}
            fontSize={20}
            borderRadius={'full'}
            align={'center'}
            w={'36'}
            h={'8'}
          >
            Project XYZ
          </Text>
        </VStack>
      </Center>
      <Center padding={'20'}>
        <Stack direction={'column'}>
          <Wrap>
            <Button
              leftIcon={<AddIcon color={'black'} width={3} paddingTop={0.5} />}
              backgroundColor="#D9D9D9"
              color={'black'}
              size="md"
              onClick={() => {
                router.push(`/projects/${projectId}/create`);
              }}
            >
              New Proposal
            </Button>
          </Wrap>
          <VStack>
            {testData.map((obj) => {
              return (
                <Box paddingBottom={5} key={obj.proposedTitle}>
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
    </div>
  );
};

export default ProjectProposalPage;
