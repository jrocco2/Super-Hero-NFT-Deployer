import React from 'react';
import { Heading, HStack, Spacer, Button, Stack, Input, Box, FormLabel, Textarea, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"

export const NFTMintDrawer = (props) => {
    const { isOpen, firstField, onClose, handleName, handleImageUrl, strength, setStrength, speed, setSpeed, power, setPower, intelligence, setIntelligence, handleDescription, isLoading, mintNft} = props
    
    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Create a Super Hero NFT
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel fontWeight="bold" htmlFor="username">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="username"
                    placeholder="Please enter super hero name"
                    onChange={ handleName }
                  />
                </Box>

                <Box>
                  <FormLabel fontWeight="bold" htmlFor="username">Image Url</FormLabel>
                  <Input
                    id="url"
                    placeholder="https://example.com/image.png"
                    onChange={handleImageUrl}
                  />
                </Box>

                <Box>
                  <FormLabel fontWeight="bold" htmlFor="desc"> Attributes </FormLabel>
                  <HStack pb={"5px"} >
                    <Heading as="h6" size="xs" color={"gray"} > { "Strength" } </Heading>
                    <Spacer />
                    <Heading as="h6" size="xs" color={"gray"} pr={"2px"} > {`${strength}/100`} </Heading>
                  </HStack>
                  <Slider aria-label="slider-ex-1" defaultValue={0} onChange={(val) => setStrength(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>

                  <HStack pb={"5px"} >
                    <Heading as="h6" size="xs" color={"gray"} > { "Speed" } </Heading>
                    <Spacer />
                    <Heading as="h6" size="xs" color={"gray"} pr={"2px"} > {`${speed}/100`} </Heading>
                  </HStack>
                  <Slider aria-label="slider-ex-1" defaultValue={0} onChange={(val) => setSpeed(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>

                  <HStack pb={"5px"} >
                    <Heading as="h6" size="xs" color={"gray"} > { "Power" } </Heading>
                    <Spacer />
                    <Heading as="h6" size="xs" color={"gray"} pr={"2px"} > {`${power}/100`} </Heading>
                  </HStack>
                  <Slider aria-label="slider-ex-1" defaultValue={0} onChange={(val) => setPower(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>

                  <HStack pb={"5px"} >
                    <Heading as="h6" size="xs" color={"gray"} > { "Intelligence" } </Heading>
                    <Spacer />
                    <Heading as="h6" size="xs" color={"gray"} pr={"2px"} > {`${intelligence}/100`} </Heading>
                  </HStack>
                  <Slider aria-label="slider-ex-1" defaultValue={0} onChange={(val) => setIntelligence(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
  
                <Box>
                  <FormLabel fontWeight="bold" htmlFor="desc">Description</FormLabel>
                  <Textarea id="desc" 
                    onChange={ handleDescription }
                  />
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={isLoading} onClick={ () => mintNft()} colorScheme="blue">Submit</Button>
            </DrawerFooter>
          </DrawerContent>      
      </Drawer>
    )
}