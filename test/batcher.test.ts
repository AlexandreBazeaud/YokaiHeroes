import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();

    this.signers.admin = signers[0];
  });

  describe("Test", function () {
    beforeEach(async function () {
      console.log("Deploy batcher");

      const yokaiSpecialFactory = await hre.ethers.getContractFactory("YokaiHeroes");
      this.YokaiChain = await yokaiSpecialFactory.deploy();

      const yokaiEcologistDescriptor = await hre.ethers.getContractFactory("YokaiEcologistDescriptor");
      this.YokaiEcologistDescriptor = await yokaiEcologistDescriptor.deploy();

      const batcherFactory = await hre.ethers.getContractFactory("ERC721Batcher");
      this.Batcher = await batcherFactory.deploy();
    });

    it("Mint heroes and use batcher to return token uri", async function () {
      this.timeout(4000000);
      this.YokaiChain.create(this.YokaiEcologistDescriptor.address);
      const tokenURIs = await this.Batcher.getTokenURIOf(this.YokaiChain.address, [1, 2]);
      console.log(tokenURIs);
    });
  });
});
