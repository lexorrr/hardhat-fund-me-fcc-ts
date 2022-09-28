import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

const deployFundMe = async ({
    getNamedAccounts,
    deployments
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    let ethUsdPriceFeedAddress: string;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name][
            "ethUsdPriceFeed"
        ]!;
    }
    // if the contract doesn't exist, we deploy a minial version of it
    // for our local testins

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use mock
    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // verify
        await verify(fundMe.address, args);
    }

    log("--------------------------------------------------------");
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundme"];
