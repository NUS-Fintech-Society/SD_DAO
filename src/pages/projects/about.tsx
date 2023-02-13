import React from 'react';
import {Center, VStack, Wrap, Box, Heading, Image} from '@chakra-ui/react';
import AboutCard from '../../components/ProjectAbout/AboutCard';


interface ProposalProps {
    proposedTitle1: string;
    proposedDescription1: string;
    endDate1: string;
    minStake1: number;
    proposedType1: string;
    ipfsHash: { ipfsHash: string };
}

const About: React.FC<ProposalProps> = props => {



    const testData: {id: number;
                    name: string;
                    department: string;
                    email: string;
                    github: string;
                    linkedin: string;
                    avatar: string;
                    created_at: string;
                    about: string} = 
    
        {
            id: 1,
            name: "Pika Pika Association",
            department: "Pikachu Foreign Affairs",
            email: "test@hmail.com",
            github: "pikachu",
            linkedin: "jonthepikachu",
            avatar:
                'https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            created_at: 'test',
            about: "Third entry Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    

  return (
    <>
        <div className={"projectBackground"}>
        <VStack mt={-16} >
        <Center>
        <Heading mt={200} color={'white'} size={'3xl'}>Projects</Heading>
        </Center>
        <Center paddingTop={'28'}>
        
        <VStack spacing={'16'}>

        <Wrap>
        <Image
          boxSize={'48'}
          borderRadius={'50'}
          src={testData.avatar}
          alt=""
        />
        </Wrap>
        <AboutCard department={testData.department} name={testData.name} about={testData.about} github={testData.github} linkedin={testData.linkedin} email={testData.email}/>

        </VStack>
        </Center>
        </VStack>
        <Box pb={'100'} />
        </div>
    </>
  )
}

export default About;