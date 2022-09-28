import { HardhatRuntimeEnvironment } from "hardhat/types";
import { network } from "hardhat";
import {
    DECIMALS,
    developmentChains,
    INITIAL_ANSWER,
} from "../helper-hardhat-config";

const deployMocks = async ({
    getNamedAccounts,
    deployments,
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed!");
        log("-------------------------------------------------");
    }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
