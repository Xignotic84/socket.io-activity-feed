import {
    Button, Flex, Heading, Icon, IconButton,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Switch,
    Box, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import {BsGear} from "react-icons/bs";

const Field = ({heading, description}) => {
    return (
        <Flex mb={4} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                <Heading size={'sm'}>
                    {heading}
                </Heading>
                <Text opacity={0.7}>
                    {description}
                </Text>
            </Box>
            <Switch colorScheme={'red'}/>
        </Flex>
    )
}

export default function SettingsModal() {
    const {isOpen, onOpen, onClose} = useDisclosure()


    return (
        <>
            <IconButton onClick={onOpen} size={'sm'} aria-label={'Settings'} icon={<Icon boxSize={4} as={BsGear}/>}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Field heading={'Receive Updates'} description={'Receive Activity Feed Updates'}/>
                        <Field heading={'Share Activity'} description={'Share your activity to your followers'}/>
                        <Field heading={'Start Private Session'} description={"Temporarily hide your activity"}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant={'outline'} colorScheme='gray' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' colorScheme={'red'} onClick={onClose}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
