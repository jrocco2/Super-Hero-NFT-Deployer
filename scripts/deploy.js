// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const SuperHero = await hre.ethers.getContractFactory("SuperHero");
  const superHero = await SuperHero.deploy();

  await superHero.deployed();

  console.log("SuperHero deployed to:", superHero.address);
  saveFrontendFiles("SuperHero", superHero)

}

function saveFrontendFiles(name, token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/gatsby/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  let addresses = {}
  if (fs.existsSync(contractsDir + "/contract-address.json")) {
    let addressesJSON = fs.readFileSync(contractsDir + "/contract-address.json");
    addresses = JSON.parse(addressesJSON);
  }
  
  addresses[name] = token.address
  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify( addresses , undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + "/"+name+".json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
