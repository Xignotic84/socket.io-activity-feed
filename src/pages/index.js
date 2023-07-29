import {
    Alert,
    AlertIcon,
    Box,
    Center, Flex, Heading, Icon, IconButton,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {AnimatePresence, motion} from "framer-motion";
import ActivityEntry from "@/components/ActivityEntry";
import {BsArrowClockwise, BsGear, BsGithub, BsTwitter} from "react-icons/bs";
import SettingsModal from "@/components/SettingsModal";

let socket

export default function Home() {
    const [activities, setActivities] = useState([])


    useEffect(() => {
        socketInitializer()

        return () => {
            socket.close()

        }
    }, [])


    useEffect(() => {
        if (activities.length > 5) {
            removeActivity()
        }
    }, [activities])


    function removeActivity() {
        setTimeout(() => {
            const newArr = [...activities];
            newArr.shift();
            setActivities(newArr);
        }, 2000)
    }

    function refreshFeed() {
        setActivities([])
    }

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io({path: '/api/socket_io', autoConnect: true, reconnectionAttempts: 3})

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update', msg => {
            setActivities(prevState => {
                return [msg, ...prevState].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            });
        })
    }

    return (
        <Center mt={25} mb={25}>
            <Box>
                <VStack
                    width={'600px'}
                    bg={'blackAlpha.50'}
                    p={3}
                    mt={25}
                    borderRadius={15}
                    flexDir={'column-reverse'}>
                    {activities.length === 0 &&
                        <Alert status='info' borderRadius={15} width={'80%'}>
                            <AlertIcon />
                            Oops, there's nothing new on your feed.
                        </Alert>
                    }

                    <AnimatePresence initial={true}>
                        {activities.map((activity, i) => {
                            return <ActivityEntry activity={activity} key={i}/>
                        })}
                    </AnimatePresence>
                    <Flex w={'100%'} bg={'white'} p={3} borderRadius={15} alignItems={'center'}
                          justifyContent={'space-between'}>
                        <Heading size={'md'}>
                            Activity Feed
                        </Heading>
                        <Flex gap={2}>
                            <IconButton size={'sm'} aria-label={'Refresh'}
                                        onClick={() => refreshFeed()}
                                        icon={<Icon boxSize={4} as={BsArrowClockwise}/>}/>
                            <SettingsModal/>
                        </Flex>
                    </Flex>
                </VStack>
                <Center>
                    <Flex gap={5} w={'50%'} justifyContent={'center'} alignItems={'center'} p={3} mt={5}
                          bg={'blackAlpha.50'} borderRadius={15}>
                        <Icon onClick={() => {
                            window.open('https://github.com/Xignotic84/socket.io-activity-feed', '_blank')
                        }} cursor={'pointer'} boxSize={8} color={'black'} as={BsGithub}/>
                        <Icon onClick={() => {
                            window.open('https://twitter.com/xignotic', '_blank')
                        }} cursor={'pointer'} boxSize={8} color={'black'} as={BsTwitter}/>
                    </Flex>
                </Center>
            </Box>
        </Center>
    )
}
