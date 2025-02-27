import hre from "hardhat";

const CONTRACT_ADDRESS = "0x32d5014AF5387002331d2AaC10fA29a6B5f3E943";
const MY_ADDRESS = "0x20c6F9006d563240031A1388f4f25726029a6368";

if (!CONTRACT_ADDRESS)
  throw "⛔️ Provide address of the contract to interact with!";

async function main() {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Get the first signer
  const [signer] = await hre.ethers.getSigners();

  // Get the contract factory and deploy
  const CarsNft = await hre.ethers.getContractFactory("CarsNft");
  const carsNft = await CarsNft.connect(signer).attach(CONTRACT_ADDRESS);

  // Run contract read function name
  const name = await carsNft.name();
  console.log(`Current name is: ${name}`);

  // Run contract write function safeMint
  /* const transaction = await carsNft.safeMint(MY_ADDRESS, "URI of car n.1");
  console.log(`Transaction hash of safeMint : ${transaction.hash}`);
  await transaction.wait(); */

  // Run contract read function balanceOf
  const balance = await carsNft.balanceOf(MY_ADDRESS);
  console.log(`Balance of the address ${MY_ADDRESS} is: ${balance.toString()}`);

  // Run contract read function tokenURI
  const tokenURI = await carsNft.tokenURI(0);
  console.log(`Token URI of token 0 is: ${tokenURI}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
