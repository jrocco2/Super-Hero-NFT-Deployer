import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import superHeroArtifact from "../contracts/SuperHero.json";
import contractAddress from "../contracts/contract-address.json";
import { AddIcon } from '@chakra-ui/icons'
import { Container, Heading, useDisclosure, Button } from "@chakra-ui/react"
import * as IPFS from 'ipfs-core'
import styled from 'styled-components';
import { NFTCard } from '../components/NFTCard';
import { addMetadataToIpfs, createMetadata, getMetadataFromIpfs } from '../helpers';
import { NFTMintDrawer } from '../components/NFTMintDrawer';
import { NFTMintViewer } from '../components/NFTMintViewer';

export const App = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [strength, setStrength] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [power, setPower] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [isMinting, setIsMinting] = useState(false);
    const firstField = React.useRef()
    const [ipfs, setIpfs] = useState(undefined)
    const [nfts, setNfts] = useState([undefined])
    const [selectedNft, setSelectedNft] = useState(nfts[0]);
    const [isLoading, setIsLoading] = useState(false)
    let ipfsBaseURI = "https://ipfs.io/ipfs/"

    useEffect(() => {

        (async () => {
            if (ipfs === undefined) {
                const [address] = await window.ethereum.enable();
                const i = await IPFS.create()
                setIpfs(i)
            }

        })()
    }, []);

    useEffect(() => {
        // Loads nfts once IPFS is initialised
        if (ipfs) {
            console.log("Loading nfts");
            getNfts()
        }
    }, [ipfs]);

    async function getNfts() {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = ethersProvider.getSigner()

        let SuperHeroNFT = new ethers.Contract(
            contractAddress.SuperHero,
            superHeroArtifact.abi,
            signer
        );

        let numberOfNfts = await SuperHeroNFT.tokenIds();

        let tempArray = []

        for (let i = 0; i < numberOfNfts; i++) {
            let tokenURI = await SuperHeroNFT.tokenURI(i)
            let cid = tokenURI.replace(ipfsBaseURI, "")
            let metadata = await getMetadataFromIpfs(ipfs, cid)
            tempArray.unshift(metadata)
        }
        setNfts(tempArray)
    }

    async function mintNft() {
        setIsLoading(true)
        let metadata = createMetadata(name, imageUrl, description, strength, speed, power, intelligence)
        let cid = await addMetadataToIpfs(ipfs, metadata)
        let tokenURI = `${ipfsBaseURI}${cid}`
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = ethersProvider.getSigner()
        const userAddress = await signer.getAddress()

        let SuperHeroNFT = new ethers.Contract(
            contractAddress.SuperHero,
            superHeroArtifact.abi,
            signer
        );

        console.log("Minting SuperHero to: ", userAddress, tokenURI)
        let txn = await SuperHeroNFT.createHero(userAddress, tokenURI);
        const receipt = await txn.wait();
        console.log("Done")
        console.log(receipt.transactionHash)
        window.location.reload();
    }
    async function openNFT(nft) {
        setSelectedNft(nft);
        setIsMinting(false)
        onOpen();
    }

    async function openMinter() {
        setIsMinting(true)
        onOpen();
    }

    let handleDescription = (e) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    let handleName = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
    }

    let handleImageUrl = (e) => {
        let inputValue = e.target.value
        setImageUrl(inputValue)
    }
    return (
        <>
            <Button style={buttonPlacement} leftIcon={<AddIcon />} colorScheme="blue" onClick={() => openMinter()}>
                Create NFT
            </Button>
            <Container paddingTop={"96px"} maxW="container.xl">
                <Heading>Super Hero Deployer</Heading>
                <Heading as="h4" size="md" color={"gray"} pt={"5px"} pb={"30px"} >
                    Instantly deploy your own Super Hero NFT
                </Heading>
                <NftGrid>
                    {ipfs && // If ipfs exists
                        nfts.map((nft, i) =>
                            <NFTCard nft={nft} i={i} openNFT={openNFT} />
                        )
                    }
                </NftGrid>
            </Container>
            {isMinting ?
                (
                    <NFTMintDrawer
                        {...{ isOpen, firstField, onClose, handleName, handleImageUrl, strength, setStrength, speed, setSpeed, power, setPower, intelligence, setIntelligence, handleDescription, isLoading, mintNft }}
                    />
                )
                :
                (
                    <NFTMintViewer
                        {...{ isOpen, onClose, selectedNft }}
                    />
                )
            }
        </>
    )
}
const buttonPlacement = {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "20px"
}

const NftGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  `
