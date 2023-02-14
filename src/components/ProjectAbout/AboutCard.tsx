import React from 'react'
import {Card, CardBody, HStack, 
    Box, Text, 
    VStack, Tag, TagLabel, Center } from '@chakra-ui/react'
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai"
import {MdOutlineAlternateEmail} from "react-icons/md";



interface AboutCardProps {
    name: string;
    department: string;
    about: string;
    github: string;
    linkedin: string;
    email: string;
    //onChange: (e: any) => void;
}

const AboutCard: React.FC<AboutCardProps> = props => {

  return (
    <>
    <HStack spacing={'5'}>
        {/*For side name and department card*/}
        <Card
        overflow='hidden'
        variant='elevated'
        backgroundColor='#ECECEC'
        shadow={'lg'}
        w={'md'}
        borderRadius={'40'}
        >
          <CardBody padding={'12'} maxH={'300'}>
            <VStack spacing={'6'} align={'start'} >
            <Text fontSize={'xl'} color={'#aaaaaa'}>Name</Text>
            <Text fontSize={'2xl'} >{props.name}</Text>
            <Text fontSize={'xl'} color={'#aaaaaa'}>Department</Text>
            <Text fontSize={'2xl'}>{props.department}</Text>
            </VStack>
          </CardBody>
        </Card>
        {/*For about card*/}
        <Card
        overflow='hidden'
        variant='elevated'
        backgroundColor='#ECECEC'
        shadow={'lg'}
        maxW={'5xl'}
        borderRadius={'40'}
        >
            <CardBody padding={'12'} minH={'300'}>
              <HStack>
            <Box marginRight='200'>
              <Text fontSize={'xl'} color={'#aaaaaa'}>About</Text>
            <Text fontSize={'xl'} paddingTop={"6"} overflow='overflow-wrap' maxW={"500"}>
                {props.about}
            </Text>
            </Box>
            
            <VStack align={'start'} pt={'10'} spacing={'6'}> 
                <Tag size={'2xl'} background={'transparent'}>
                  <Center>
                  <AiFillGithub size={'30'}/>
                  <TagLabel fontSize={'2xl'} pl={'3'}>{props.github}</TagLabel>
                  </Center>
                </Tag>
                
                <Tag size={'2xl'} background={'transparent'}>
                  <Center>
                  <AiFillLinkedin color = "steelblue" size={'30'}/>
                  <TagLabel fontSize={'2xl'} pl={'3'} >{props.linkedin}</TagLabel>
                  </Center>
                </Tag>
                
                <Tag size={'2xl'} background={'transparent'}>
                  <Center>
                  <MdOutlineAlternateEmail color = "lightgray" size={'30'}/>
                  <TagLabel fontSize={'2xl'} pl={'3'}>{props.email}</TagLabel>
                  </Center>
                </Tag>
            </VStack>
            </HStack>
            </CardBody>
        </Card>
    </HStack>
    </>
  )
}

export default AboutCard;