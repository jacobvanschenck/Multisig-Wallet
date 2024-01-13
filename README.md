# Welcome to Multisig Wallet

![WalletScreenShot](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/MultisigWallet.png)

A **wallet** that requires approval from 2 designated address to complete transactions.

Here is the app running on the [Sepolia network](https://multi-sig-wallet-vs.netlify.app/)

---

## Tech Stack ⚙️

[Solidity](https://soliditylang.org/) | [React](https://react.dev/) | [Hardhat](https://hardhat.org) | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) | [Viem](https://viem.sh/)

---

## Install 💾

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```
cd ProjectFolder
pnpm install
```

#### Setup Blockchain 🔗

Next step is to get the Hardhat blockchain node running locally

```bash
cd /path_to_project/MultisigWallet/blockchain
pnpm hardhat node
```

Then test, compile and deploy the contracts

```bash
pnpm test
pnpm compile

pnpm hardhat run scripts/deploy.ts --network localhost
```

#### Start Client 🌐

Finally get the client site running on localhost with the Hardhat node. We need to change a few things:

Open up `/client/src/utils.ts` and update the function `getPublicClent()` to this:

```typescript
export function getPublicClient() {
    return createPublicClient({
        chain: hardhat,
        transport: http('http://127.0.0.1:8545'),
    });
}
```

Open a new Terminal window and run:

```bash
cd client/
pnpm install
pnpm start
```

Head over to `http://localhost:5173` and start using MultisigWallet!

> Note: Make sure to update your Metamask to use the local network as well. [Check out step 5 in the MetaMask Developer docs](https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/)

---

## Features 📼

### Connects with Metamask

![ConnectWalletWithMetamask GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/ConnectWalletWithMetamask.gif)

-   Use [this link](https://multi-sig-wallet-vs.netlify.app/) to head over to the live site
-   Login with Metamask
-   Make sure to change Network to Sepolia on Metamask
<p>&nbsp;</p>
<p>&nbsp;</p>

### Create Transfer

![CreateTransfer GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/CreateTransfer.gif)

-   Chose and amount and address to which to send funds
-   Make sure wallet balance has enough wei
<p>&nbsp;</p>
<p>&nbsp;</p>

### Approve Transfer

![ApproveTransfer GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/ApproveTransfer.gif)

-   Must use one of the 3 approved address to approve transfers
-   Quorum of 2 means 2 of the 3 address mush approve a transfer for it go to through
<p>&nbsp;</p>
<p>&nbsp;</p>

---

## Feedback 🤝

Do you have any suggestions for code or additional features you'd like to see implemented? Hit me up on [Twitter](https://twitter.com/JacobVanSchenck)
