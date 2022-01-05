import hre from "hardhat";

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

async function main(): Promise<void> {
  console.log("Deploy ecologist descriptor");
  const YokaiEcologistDescriptorFactory = await hre.ethers.getContractFactory("YokaiEcologistDescriptor");
  const YokaiEcologistDescriptor = await YokaiEcologistDescriptorFactory.deploy();

  await YokaiEcologistDescriptor.deployed();
  await delay(60000);
  await hre.run("verify:verify", {
    address: YokaiEcologistDescriptor.address,
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
