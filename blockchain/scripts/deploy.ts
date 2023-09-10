import { ethers } from 'hardhat';

const owner2 = '0x8B2e5a4F86557703E29cBc3f3171D46b3C28a19F';
const owner3 = '0xAc91476f88D41B422EaFA77d63cAfC39c45253d9';

async function main() {
    const [deployer] = await ethers.getSigners();
    const initialBalance = 1000n;

    console.log(
        `Deploying from ${
            deployer.address
        } with a initialBalance of ${ethers.formatEther(initialBalance)}`
    );
    const wallet = await ethers.deployContract('Wallet', [
        [deployer.address, owner2, owner3],
        2,
        { value: initialBalance },
    ]);

    console.log(wallet);

    await wallet.waitForDeployment();

    console.log(
        `Wallet with ${ethers.formatEther(initialBalance)}ETH deployed to ${
            wallet.target
        }`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
