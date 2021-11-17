import hre from "hardhat";

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

async function main(): Promise<void> {
  console.log("Deploy YokaiChain");
  const YokaiSpecialFactory = await hre.ethers.getContractFactory("YokaiHeroes");
  const YokaiSpecial = await YokaiSpecialFactory.deploy();

  await YokaiSpecial.deployed();
  await delay(60000);
  await hre.run("verify:verify", {
    address: YokaiSpecial.address,
  });

  console.log("Deploy done");
}
async function deployLibrary(factory: any) {
  let contract = await factory.deploy();
  await contract.deployed();
  await delay(60000);
  await simpleEtherscan(contract.address);
  return contract;
}

async function simpleEtherscan(addressDeployed: string) {
  await hre.run("verify:verify", {
    address: addressDeployed,
  });
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
