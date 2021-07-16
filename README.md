[![version](https://img.shields.io/github/release/greymass/anchor/all.svg)](https://github.com/greymass/anchor/releases)
[![issues](https://img.shields.io/github/issues/greymass/anchor.svg)](https://github.com/greymass/anchor/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/anchor/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/anchor/total.svg)

![Anchor Logo](https://raw.githubusercontent.com/greymass/anchor/master/internals/img/anchor.png)

# Anchor - A feature rich, open-source, EOSIO Wallet

![Anchor Screenshot 1](https://raw.githubusercontent.com/greymass/anchor/master/internals/img/anchor-ss1.png)

### Features

Some of the notable features of Anchor include, but are not limited to:

- A user interface that supports common EOSIO functions (token transfers, resource management, governance, etc).
- Direct integration with [Greymass Fuel](http://greymass.com/fuel), which provides limited [free CPU/NET resources to every account](https://greymass.com/en/blog/5ms-worth-of-free-transactions-available-now-in-anchor-wallet-wallet/) on compatible networks.
- Support for nearly every EOSIO-based blockchain (EOS, Telos, WAX, etc), with new networks added as they launch.
- Locally encrypted key storage using AES-256 - your private keys never leave the wallet.
- Optional integration with [Ledger Hardware Wallets](https://www.ledger.com/) for additional key security.
- Rich integration with external applications any EOSIO-based blockchain using the [EOSIO Signing Request](https://github.com/greymass/eosio-signing-request) protocol.

A dedicated Anchor website will be released in the future with a more detailed breakdown of everything that Anchor offers. To experience it all yourself today, download and give it a try.

## Download Anchor

We urge all users to only download Anchor from one of these two locations:

- The link from the [greymass.com](https://greymass.com) website.
- The README (this file) or releases section of this repository at [github.com/greymass/anchor](https://github.com/greymass/anchor).

When downloading from either location, check the URL bar of your browser to ensure you are in the correct place and not visiting a phishing link.

### Current Release

The most recent (v1.2.6) release can downloaded using these links:

- [Windows Installer](https://github.com/greymass/anchor/releases/download/v1.2.6/win-anchor-wallet-1.2.6.exe)
- [macOS Package](https://github.com/greymass/anchor/releases/download/v1.2.6/mac-anchor-wallet-1.2.6.dmg)
- [Linux (deb)](https://github.com/greymass/anchor/releases/download/v1.2.6/linux-anchor-wallet-1.2.6-amd64.deb)
- [Linux (AppImage)](https://github.com/greymass/anchor/releases/download/v1.2.6/linux-anchor-wallet-1.2.6-x86_64.AppImage)

The latest release will always be available on the releases page of this repository:

[https://github.com/greymass/anchor/releases](https://github.com/greymass/anchor/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download the DMG (`anchor-wallet-***.dmg`) file. Open it, and drag the Anchor icon into your Applications folder.
- **Windows User**: Download the EXE (`anchor-wallet-***.exe`) file. Open it, and perform run the installation process.
- **Linux User**: Download either the AppImage (`anchor-wallet-***-_amd64.AppImage`) or DEB (`anchor-wallet-***-_amd64.deb`) file

### Signatures

All releases on Github will have shasum256 hashes signed by [jesta on keybase](https://keybase.io/jesta). If these signatures do not match, it is possible you have obtained a release not published by the Greymass team.

### Build it yourself


If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/greymass/anchor.git anchor
cd anchor
nvm use v13
yarn --frozen-lockfile
cd app
yarn --frozen-lockfile
cd ..
```

Then, depending on what OS you use, either:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

You currently must build the binary for the desired operating system on that operating system. Windows builds must be built on Windows, macOS on macOS, etc.

After the build completes, the files will be located in the `releases` folder within the project folder.

### Running in development mode

```
git clone https://github.com/greymass/anchor.git anchor
cd anchor
nvm use v13
yarn --frozen-lockfile
cd app
yarn --frozen-lockfile
cd ..
npm run dev
```

## Contributing

If you find any problems, please [open an issue](https://github.com/greymass/anchor/issues/new) or submit a fix as pull request to `develop` branch.

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team.
