import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import { App } from './app';

const IndexPage = () => {

  return (
    <ChakraProvider>
        <title >Super Hero Deployer</title>
        <App/>
    </ChakraProvider>

  )
}

export default IndexPage
