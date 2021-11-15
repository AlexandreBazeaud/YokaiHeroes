import hre, { network } from "hardhat";
import fs from "fs";
import { Contract, utils } from "ethers";
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
      const YokaiSpecialFactory = await hre.ethers.getContractFactory("YokaiSpecial");
      this.YokaiChain = await YokaiSpecialFactory.deploy();

      const YokaiEcologistDescriptorFactory = await hre.ethers.getContractFactory("YokaiEcologistDescriptor");
      this.YokaiEcologistDescriptor = await YokaiEcologistDescriptorFactory.deploy();

      const YokaiSpookyDescriptorFactory = await hre.ethers.getContractFactory("YokaiSpookyDescriptor");
      this.YokaiSpookyDescriptor = await YokaiSpookyDescriptorFactory.deploy();

      this.specialArray = [this.YokaiSpookyDescriptor.address,this.YokaiEcologistDescriptor.address];
    });

    it("Mint specific Item", async function () {
      this.timeout(4000000);

      let i = 1;
      for(const special of this.specialArray){
        await this.YokaiChain.create(special);
        const nft = await this.YokaiChain.tokenURI(i);
        const bufJson = Buffer.from(nft.substring(29), "base64");
        const jsonObj = JSON.parse(bufJson.toString());
        const bufSvg = Buffer.from(jsonObj.image.substring(26), "base64");
        await fs.writeFileSync("yokais/"+jsonObj.name+".svg", bufSvg.toString());
        i++;
      }

    });
  });
});
