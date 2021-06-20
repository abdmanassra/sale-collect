## Info

Cross-platform desktop application

## Technologies

Project is created with:

- Electronjs
- Reactjs
- Firebase
- TypeScript

## Screen Capture

## Install from Release

To install the packaged release for windows:

- Download the [SaleCollectWinRelease](https://github.com/abdmanassra/sale-collect/releases/download/1.0.0/SaleCollect.Setup.2.3.0.zip)
- Extract zip file
- Click on `SaleCollect Setup 2.3.0.exe` and setup the application

## Development Instructions

### Clone

- First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/abdmanassra/sale-collect.git
cd sale-collect
yarn
```

- Second, Create your `.env` file with your firebase credentials, follow the `example.env` file structure

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```
