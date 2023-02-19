import React from 'react'
import {Card, Stack, CardBody, HStack, 
    Box, Heading, Spacer, Text, 
    Button, VStack, useDisclosure, 
    Modal, Input, ModalOverlay, ModalContent, 
    ModalCloseButton,
    ModalHeader, Center, useNumberInput, IconButton } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons';



interface CardProps {
    proposedTitle: string;
    proposedDescription: string;
    endDate: string;
    minStake: number;
    proposedType: string;
    remainingTokens: number;
    //onChange: (e: any) => void;
}

const Cards: React.FC<CardProps> = props => {

    //note change the folder name once sort out the diff btw proposalPage and projPage.
    const {isOpen, onOpen, onClose } = useDisclosure();

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = 
     useNumberInput({ 
       defaultValue: 0, 
       min: 0,  
       max: 99,
       //onChange: (e) => props.onChange(e),
       //value:
   }) 

   const inc = getIncrementButtonProps() 
   const dec = getDecrementButtonProps() 
   const input = getInputProps() 

  return (
    <>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='elevated'
        backgroundColor='#ECECEC'
        shadow={'lg'}
        w={'5xl'}
        borderRadius={'40'}
        >
        <Stack padding={5} spacing={'-12'} >
            <CardBody>
            <HStack> 
                <Heading size={"lg"} fontWeight={'normal'} color={'black'}>{props.proposedTitle}</Heading>
                <Spacer />
                <Text fontSize={'lg'} color={'black'}>{props.proposedType}</Text>
            </HStack>
            <Box marginRight='200'>
            <Text fontSize={'xl'} color={'black'} paddingTop={"6"} overflow='overflow-wrap' >
                {props.proposedDescription}
            </Text>
            </Box>
            </CardBody>
            <CardBody>
            <HStack >
            
            <Text marginTop={"8"} color={'#686767'} fontSize={'lg'}>End Date: {props.endDate}</Text>
            <Spacer />
            <VStack alignItems="end">
            <Text color={'#6C6C6C'}>Min. Stake: {props.minStake}</Text>
            <Button onClick={onOpen} borderRadius='full' h='80%' w='55%' variant='solid' backgroundColor={'#C2A671'} color={'white'} padding={"1"}>
                Vote
            </Button>
            </VStack>
            </HStack>
            </CardBody>
        </Stack>
        </Card>

        {/* For vote proposal modal*/}
        <Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        
      >
        <ModalOverlay />
        
        <Center>
        <ModalContent backgroundColor={"#E1E1E1"} borderRadius={"2xl"}>
        <ModalCloseButton p={5} />
        <Stack spacing={8}>
        <Center pt={6}>
          <ModalHeader fontSize={30} color={"#979696"}>Vote for proposal</ModalHeader>
        </Center>

        <Center>
        <HStack spacing={5} direction={'column'}>
        <IconButton aria-label='Decrement' icon={<MinusIcon />} fontSize={8} w={4} h={4} borderRadius={30} background={"#aaaaaa"} textColor={"black"} size='2xs' {...dec} />
        <Input shadow={'base'} type="date" htmlSize={20} fontSize={40} borderColor={'black'} p={-5} borderRadius={'none'} fontWeight={'bold'} borderWidth={2}  width='16' height={'14'} textAlign='center' {...input}/> 
        <IconButton aria-label='Increment' icon={<AddIcon />} fontSize={8} w={4} h={4}  borderRadius={30} background={"#aaaaaa"} textColor={"black"} size='2xs' {...inc}/>
        </HStack>
        </Center>
        
        <Center>
        <Button onClick={onClose} borderRadius='full' h='7' w='12%' variant='solid' backgroundColor={'#C2A671'} color={'white'} padding={""}>
            Vote
        </Button>
        </Center>

        <Center>
        <VStack py={5} pb={16}>
        <Text fontWeight={"semibold"} fontSize={'md'}>Remaining Tokens:</Text>
        <Text fontWeight={"semibold"}  fontSize={'lg'}>{props.remainingTokens}</Text>
        </VStack>
        </Center>
        </Stack>
        </ModalContent>
        </Center>
      </Modal>
      </Center>
    </>
  )
}

export default Cards;