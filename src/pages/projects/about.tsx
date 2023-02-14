import React, {useState, useRef} from 'react';
import {Center, VStack, useDisclosure, Modal, ModalOverlay, Input, 
  ModalCloseButton, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Box, Heading, Image, Button, FormControl} from '@chakra-ui/react';
import AboutCard from '../../components/ProjectAbout/AboutCard';
import {MdOutlineModeEdit} from "react-icons/md";
import { Field, Form, Formik } from 'formik';


interface ProposalProps {
    proposedTitle1: string;
    proposedDescription1: string;
    endDate1: string;
    minStake1: number;
    proposedType1: string;
    ipfsHash: { ipfsHash: string };
}

const About: React.FC<ProposalProps> = props => {

    const [about, setAbout] = useState<string>('Third entry Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

    const testData: {id: number;
                    name: string;
                    department: string;
                    email: string;
                    github: string;
                    linkedin: string;
                    avatar: string;
                    created_at: string;
                    } = 
    
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
        }
    
        const { isOpen, onOpen, onClose } = useDisclosure()
        const modal = () => {
          const aboutInputRef = useRef<HTMLInputElement>(null);
          var canSubmit = true;
          const handleSubmit = () => {
            if (!aboutInputRef.current!.value) {
              canSubmit = false;
              alert("Please type something!");
            } else if (aboutInputRef.current!.value.length > 160) {
              canSubmit = false;
              alert("About should not be more than 160 characters");
            } else {
              setAbout(aboutInputRef.current!.value);
            }
          }
          return <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit About</ModalHeader>
                <ModalCloseButton />
                      <ModalBody>
                        <Input type={'text'} ref={aboutInputRef} />
                      </ModalBody>
                      <ModalFooter>
                      <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button backgroundColor='#cccccc' type='submit' color={'white'} onClick={() => { handleSubmit() , canSubmit ? onClose() : undefined}}>Submit</Button>
                      </ModalFooter>
            
              </ModalContent>
            </Modal>
          </>
        }

  return (
    <>
        <div className={"projectBackground"}>
        
        <VStack mt={-16} >
        <Box p={'100'}>
        <Center>
        <Heading mt={200} color={'white'} size={'3xl'}>Projects</Heading>
        </Center>
        <Center paddingTop={'28'}>
        
        <VStack spacing={'16'}>

        <Center>
        <Box>
        <Image
          boxSize={'48'}
          borderRadius={'50'}
          src={testData.avatar}
          alt=""
          mb={'-20'}
        />
        </Box>
        </Center>
        <Button onClick={onOpen} alignSelf={'end'} variant={'ghost'} leftIcon={<MdOutlineModeEdit  />}></Button>
        <AboutCard department={testData.department} name={testData.name} about={about} github={testData.github} linkedin={testData.linkedin} email={testData.email}/>
        </VStack>
        </Center>
        </Box>
        </VStack>
        {modal()}
        </div>
        
    </>
  )
}

export default About;