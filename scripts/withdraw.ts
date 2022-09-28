import { ethers, getNamedAccounts } from "hardhat";
import { FundMe } from "../typechain-types";

const main = async () => {
    const { deployer } = await getNamedAccounts();
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer);
    console.log("Funding...");
    const transactionResponse = await fundMe.withdraw();
    await transactionResponse.wait(1);
    console.log("Got it back!");
};

main()
    .then(() => process.exit(0))
    .catch((error: any) => {
        console.error(error);
        process.exit(1);
    });
