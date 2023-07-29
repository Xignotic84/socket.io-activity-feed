import {motion} from "framer-motion";
import {Avatar, Box, Heading, HStack, Icon, Text, Tooltip} from "@chakra-ui/react";
import ms from "ms";
import {BsChatSquareHeartFill, BsFileMusicFill, BsFillChatRightDotsFill} from "react-icons/bs";

export default function ActivityEntry({activity}) {
    const time = ms(new Date().getTime() - new Date(activity.timestamp).getTime())
    const occurringActivity = new Date().getTime() - new Date(activity.timestamp).getTime() < 120000 // Less than 2 minutes

    function getIcon() {
        switch (activity.action) {
            case 'listening':
                return BsFileMusicFill
            case 'liked':
                return BsChatSquareHeartFill
            case 'posted':
                return BsFillChatRightDotsFill
        }
    }

    return (
        <Box
            as={motion.div}
            display={'flex'}
            borderRadius={15}
            py={3}
            px={3}
            bg="white"
            justifyContent={'space-between'}
            alignItems={'center'}
            w="full"
            borderLeft="2px"
            borderColor="red.400"
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0 } }}
            layout
        >
            <HStack spacing={3} justifyContent={'space-around'}>
                <Avatar
                    src={activity.user?.avatar}
                    alt={`User Avatar`}
                />
                <Box>
                    <Heading fontSize={18} color="teal.900">
                        {activity.user?.username}
                    </Heading>
                    <Text color="teal.700">{activity.action} {activity.preposition} {activity.value}</Text>
                </Box>
            </HStack>
            <Text justifyContent={'flex-end'} mr={1}>
                {occurringActivity
                    ? <Tooltip label={`${activity.action === 'listening' ? 'Currently' : 'Just'} ${activity.action}`}>
                        <span>
                            <Icon mt={2} boxSize={5} color={'red.400'} as={getIcon()}/>
                        </span>
                    </Tooltip> : time}
            </Text>
        </Box>
    )
}
