import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Wallet', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployWalletFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner1, owner2, owner3, other1, other2] =
            await ethers.getSigners();

        const Wallet = await ethers.getContractFactory('Wallet');
        const wallet = await Wallet.deploy([owner1, owner2, owner3], 2, {
            value: 1000n,
        });

        return { wallet, owner1, owner2, owner3, other1, other2 };
    }

    describe('Deployment', function () {
        it('should have correct approvers and quorum', async function () {
            const { wallet, owner1, owner2, owner3 } = await loadFixture(
                deployWalletFixture
            );
            const approvers = await wallet.getApprovers();
            const quorum = await wallet.quorum();

            expect(approvers.length).to.eq(3);
            expect(approvers[0]).to.eq(owner1.address);
            expect(approvers[1]).to.eq(owner2.address);
            expect(approvers[2]).to.eq(owner3.address);
            expect(quorum).to.eq(2);
        });
    });

    describe('Transfers', function () {
        it('should create transfers', async function () {
            const { wallet, other1 } = await loadFixture(deployWalletFixture);
            await wallet.createTransfer(100n, other1.address);
            const transfers = await wallet.getTransfers();

            expect(transfers.length).to.eq(1);
            expect(transfers[0].id).to.eq(0);
            expect(transfers[0].amount).to.eq(100n);
            expect(transfers[0].to).to.eq(other1.address);
            expect(transfers[0].approvals).to.eq(0);
            expect(transfers[0].sent).to.be.false;
        });

        it('should NOT create transfers if the sender is not approved', async function () {
            const { wallet, other1, other2 } = await loadFixture(
                deployWalletFixture
            );
            await expect(
                wallet.connect(other1).createTransfer(100n, other2.address)
            ).to.be.revertedWith('only approver allowed');
        });
        it('should increment approvals', async function () {
            const { wallet, owner2, other1 } = await loadFixture(
                deployWalletFixture
            );
            await wallet.createTransfer(100n, other1.address);
            await wallet.connect(owner2).approveTransfer(0);
            const transfers = await wallet.getTransfers();
            const balance = await ethers.provider.getBalance(
                wallet.getAddress()
            );

            expect(transfers[0].approvals).to.eq(1);
            expect(transfers[0].sent).to.be.false;
            expect(balance).to.eq(1000n);
        });
        it('should send transfer if quorum is reached', async function () {
            const { wallet, owner2, owner3, other1 } = await loadFixture(
                deployWalletFixture
            );
            const accountBalanceBefore = await ethers.provider.getBalance(
                other1.address
            );
            const walletBalanceBefore = await ethers.provider.getBalance(
                wallet.getAddress()
            );
            await wallet.createTransfer(100n, other1.address);
            await wallet.connect(owner2).approveTransfer(0);
            await wallet.connect(owner3).approveTransfer(0);
            const transfers = await wallet.getTransfers();
            const accountBalanceAfter = await ethers.provider.getBalance(
                other1.address
            );
            const walletBalanceAfter = await ethers.provider.getBalance(
                wallet.getAddress()
            );

            expect(accountBalanceAfter - accountBalanceBefore).to.eq(100n);
            expect(walletBalanceBefore - walletBalanceAfter).to.eq(100n);
            expect(transfers[0].approvals).to.eq(2);
            expect(transfers[0].sent).to.be.true;
        });
    });
    describe('Approvals', function () {
        it('should NOT approve transfer if sender is not approved', async function () {
            const { wallet, other1 } = await loadFixture(deployWalletFixture);
            await wallet.createTransfer(100n, other1.address);

            await expect(
                wallet.connect(other1).approveTransfer(0)
            ).to.be.revertedWith('only approver allowed');
        });
        it('should NOT approve transfer if transfer is already sent', async function () {
            const { wallet, owner2, owner3, other1 } = await loadFixture(
                deployWalletFixture
            );
            await wallet.createTransfer(100n, other1.address);
            await wallet.approveTransfer(0);
            await wallet.connect(owner2).approveTransfer(0);

            await expect(
                wallet.connect(owner3).approveTransfer(0)
            ).to.be.revertedWith('transfer has already been sent');
        });
        it('should NOT allow an account to approve a transfer twice', async function () {
            const { wallet, other1 } = await loadFixture(deployWalletFixture);
            await wallet.createTransfer(100n, other1.address);
            await wallet.approveTransfer(0);

            await expect(wallet.approveTransfer(0)).to.be.revertedWith(
                'cannot approve transfer twice'
            );
        });
    });
});
