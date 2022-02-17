# Welcome to Multisig Wallet

![WalletScreenShot](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/MultisigWallet.png)

A **wallet** that requires approval from 2 designated address to complete transactions.

Here is the app running on the [Kovan network](https://multi-sig-wallet-vs.netlify.app/)

---

## Tech Stack ⚙️

Solidity | React | [Truffle](https://trufflesuite.com/) | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) | [Bootstrap](https://getbootstrap.com/)

---

## Install 💾

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```
> cd ProjectFolder
ProjectFolder> npm install
```

### Run Truffle Blockchain 🔗

Next step is to get the Truffle blockchain running locally

```
> cd ProjectFolder
ProjectFolder> truffle develop
truffle(develop)> migrate --reset
```

### Start Client 🌐

Finally get the client site running on localhost.
Open a new Terminal window and run:

```
Projectfolder> cd client/
client> npm run start
```

Head over to `http://localhost:3000` and start using Multisig Wallet!

> Note:
> Make sure to add the Ganache network to your Metamask

---

## Features 📼

### Connects with Metamask

![ConnectWalletWithMetamask GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/ConnectWalletWithMetamask.gif)

    * Use [this link](https://multi-sig-wallet-vs.netlify.app/) to head over to the live site
    * Login with Metamask
    * Make sure to change Network to Kovan on Metamask

### Create Transfer

![CreateTransfer GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/CreateTransfer.gif)

    * Chose and amount and address to which to send funds
    * Make sure wallet balance has enough wei

### Approve Transfer | Approver Address can Approve Transations

![ApproveTransfer GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/ApproveTransfer.gif)

    * Must use one of the 3 approved address to approve transfers
    * Quorum of 2 means 2 of the 3 address mush approve a transfer for it go to through

### Only Approvers | Other Addresses cannot approve Transfers

![OnlyApprover GIF](https://raw.githubusercontent.com/jacobvanschenck/Multisig-Wallet/master/GIFs/OnlyApprover.gif)

    * Metamask detects the auto failure of non approved addresses
    * Kovan.Etherscan shows that the transaction failed due to `only approvers allowed`. [FailedTransaction](https://kovan.etherscan.io/tx/0xc833486eb58cff0a9c1ac56ec312e706ebf5f469ca6c148577c01a287f7a6b8b)

## Feedback 🤝

Do you have any suggestions for code or additional features you'd like to see implemented? Hit me up on [Twitter](https://twitter.com/JacobVanSchenck)
