## Info

Cross-platform desktop application to upload and manage sale reports

## Technologies

Project is created with:

- Electronjs
- Reactjs
- Firebase
- TypeScript

## Features
- Sign in
- Sign Up with Firebase Auth
-  Upload and manage files using Firebase Firestore/Storage

## Screen Capture
![SaleCollect 6_21_2021 1_58_26 AM](https://user-images.githubusercontent.com/40340485/122690825-5a4c1500-d234-11eb-8a8b-fa46163a10f6.png)
![SaleCollect 6_21_2021 1_56_25 AM](https://user-images.githubusercontent.com/40340485/122690775-fde8f580-d233-11eb-9804-988affb613d4.png)
![SaleCollect 6_21_2021 2_01_07 AM](https://user-images.githubusercontent.com/40340485/122690862-97180c00-d234-11eb-84a1-3a2c1186d039.png)


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
