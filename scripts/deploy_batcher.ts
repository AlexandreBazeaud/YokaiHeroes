import hre from "hardhat";

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

async function main(): Promise<void> {
  console.log("Deploy batcher");
  const BatcherFactory = await hre.ethers.getContractFactory("ERC721Batcher");
  const Batcher = await BatcherFactory.deploy();

  await Batcher.deployed();
  await delay(60000);
  await hre.run("verify:verify", {
    address: Batcher.address,
  });

  console.log("Deploy done");
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
