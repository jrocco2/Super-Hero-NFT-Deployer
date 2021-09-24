import React from 'react';
import { Heading, HStack, Spacer, FormLabel, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Progress } from "@chakra-ui/react"
import { NftPhoto } from './NFTCard';

export const NFTMintViewer = (props) => {

    const { isOpen, onClose, selectedNft} = props
    
    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent align="center">
            <DrawerHeader borderBottomWidth="1px">{selectedNft && selectedNft.name}</DrawerHeader>
            <DrawerBody>
            <NftPhoto style={{  backgroundImage: `url(${selectedNft && selectedNft.image})`  }}/>

            <FormLabel fontWeight="bold" pt={"30px"} htmlFor="desc">Attributes</FormLabel>
            { selectedNft &&
              selectedNft.attributes.map( (attribute, i) => 
              <div key={i}>
                <HStack pb={"5px"} >
                  <Heading as="h6" size="xs" color={"gray"} > { attribute.trait_type } </Heading>
                  <Spacer />
                  <Heading as="h6" size="xs" color={"gray"} pr={"2px"} > {`${attribute.value}/100`} </Heading>
                </HStack>
                <Progress mb={"5px"} style={{borderRadius: "10px"}} value={attribute.value} />
              </div>
              )
            }

            <FormLabel fontWeight="bold" pt={"30px"} htmlFor="desc">Description</FormLabel>
            {selectedNft && selectedNft.description}

  
            </DrawerBody>
          </DrawerContent>
      </Drawer>
    )
}