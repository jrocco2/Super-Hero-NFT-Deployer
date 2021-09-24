import React from 'react';
import { Heading } from "@chakra-ui/react"
import styled from 'styled-components';

const NFTCard = (props) => {
    let nft = props.nft
    return (
        <NftCard key={ props.i } onClick={() => props.openNFT(props.nft)} >
            <NftPhoto style={{  backgroundImage: `url(${nft && nft.image})`  }}/>
            <Heading align="center" as="h4" size="md" pt={"10px"}> {nft && nft.name } </Heading>
        </NftCard>
    )
}

const NftPhoto = styled.div`
    display: block;
    width: 200px;
    height: 200px;
    background-position: center center;
    background-size: cover;
    border-radius: 10px;
    margin: auto;
`

const NftCard = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 10px;
  padding: 0px;
  box-shadow:  8px 8px 16px #d9d9d9,
             -8px -8px 16px #ffffff;
  cursor: pointer;
`

export { NFTCard, NftPhoto }
