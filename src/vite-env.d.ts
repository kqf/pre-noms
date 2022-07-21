/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  /* eslint-disable no-unused-vars */
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_CONTRACT_ADDRESS: string;
}

/* eslint-disable no-unused-vars */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
