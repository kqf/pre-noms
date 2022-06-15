/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly CONTRACT_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
