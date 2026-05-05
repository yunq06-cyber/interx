export interface ChipStatus {
  id: string;
  firmware: string;
  manufacturer: string;
  lastPinged: string;
  signatureValid: boolean;
  tamperDetected: boolean;
  nfcFrequency: string;
  encryptionStandard: string;
}

export interface OwnershipEvent {
  date: string;
  action: string;
  actor: string;
  walletAddr: string;
  txRef: string;
  note?: string;
}

export interface AuthCert {
  productId: string;
  txHash: string;
  blockNumber: string;
  blockTimestamp: string;
  network: string;
  contractAddr: string;
  tokenId: string;
  signature: string;
  chip: ChipStatus;
  ownershipHistory: OwnershipEvent[];
}

const AUTH_CERTS: Record<string, AuthCert> = {
  "1": {
    productId: "1",
    txHash: "4a8f3c21b09e7d4f6e2a1c5d8b3f9e0a7c4d2f1b8e6a3c9d5f2b0e7a4c1d8f3",
    blockNumber: "19,234,871",
    blockTimestamp: "2024-12-04 11:07:33 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xC02a...3B4F",
    tokenId: "7291",
    signature: "3046022100e8a2f4d9c1b3e7f0a5d2c8b6e4a1f9d3c7b5e2a0f8d6c4b2e0a7f5d3c1b9e6a4022100c3d7f1b5e9a2c6f0d4b8e2a6c0f4d8b2e6a0c4f8d2b6e0a4c8f2d6b0e4a8c2f6",
    chip: {
      id: "HVC-7X29-K441",
      firmware: "v3.2.1-SEC",
      manufacturer: "NXP MIFARE DESFire EV3",
      lastPinged: "3 hours ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "AES-128",
    },
    ownershipHistory: [
      { date: "2024-11-28", action: "MANUFACTURE_REGISTER", actor: "Sony Corp.", walletAddr: "0x9a3F...1e2D", txRef: "0x1b2c...9d4e", note: "Factory registration — Nagoya Plant A3" },
      { date: "2024-12-01", action: "RETAIL_SALE", actor: "Sony Store Shinjuku", walletAddr: "0x2d4A...7f3C", txRef: "0x3e4d...8c5f", note: "Point-of-sale activation" },
      { date: "2024-12-04", action: "OWNERSHIP_TRANSFER", actor: "kenji.trade", walletAddr: "0xB7e1...4A2c", txRef: "0x4a8f...d3e9", note: "Current verified owner" },
    ],
  },
  "2": {
    productId: "2",
    txHash: "7c3d9a1f5e2b8d4c6a0f3e7b1d5c9a2f4e8b0c3d7a1f5e2b8d4c6a0f3e7b1d5",
    blockNumber: "17,891,443",
    blockTimestamp: "2024-06-18 14:22:09 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xD14b...9C2A",
    tokenId: "334",
    signature: "304502210091f3c7a5d2b6e0a4c8f2d6b0e4a8c2f60221009e4c2a8f6d0b4e2c6a0f8d4b2e0a6c4f8d2b6e0a4c8f2d6b0e4a8c2f6d0b4e2",
    chip: {
      id: "LCA-1957-CERT-4421",
      firmware: "v1.8.0-HERITAGE",
      manufacturer: "Infineon SLE 97",
      lastPinged: "1 day ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "RSA-2048",
    },
    ownershipHistory: [
      { date: "1957-03-12", action: "HERITAGE_ANCHOR", actor: "Leica Camera AG", walletAddr: "0x4f2A...8b1E", txRef: "0x9c1d...4f2a", note: "Historical record anchored by Leica AG" },
      { date: "2018-09-05", action: "AUCTION_TRANSFER", actor: "Westlicht Auction", walletAddr: "0x1c3E...5d9B", txRef: "0x2d3c...7e1b", note: "Auction house — lot #44 Vienna" },
      { date: "2021-02-20", action: "OWNERSHIP_TRANSFER", actor: "dieter.collectibles", walletAddr: "0xA4d9...3f7C", txRef: "0x7c3d...b1d5", note: "Authenticated by Leica certified technician" },
    ],
  },
  "3": {
    productId: "3",
    txHash: "b5d2f8a4c1e7b3d9f5a2c8e4b0d6f2a8c4e0b6d2f8a4c0e6b2d8f4a0c6e2b8d4",
    blockNumber: "20,103,221",
    blockTimestamp: "2025-01-09 08:45:17 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xE21c...7D4F",
    tokenId: "850315",
    signature: "30460221008b4d2f0a6c4e2b8d6f4a2c0e8b6d4f2a0c8e6b4d2f0a6c4e2b8d6022100d7b5f3a1c9e7b5d3f1a9c7e5b3d1f9a7c5e3b1d9f7a5c3e1b9d7f5a3c1e9b7d5",
    chip: {
      id: "NK-AJ1-2015-08812",
      firmware: "v2.5.4-AUTH",
      manufacturer: "STMicroelectronics ST25",
      lastPinged: "6 hours ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "AES-256",
    },
    ownershipHistory: [
      { date: "2015-04-11", action: "MANUFACTURE_REGISTER", actor: "Nike Inc.", walletAddr: "0x7c5D...2a9F", txRef: "0xc1d2...9f4a", note: "Factory registration — Jordan Brand Portland" },
      { date: "2015-04-20", action: "RETAIL_SALE", actor: "Nike Flagship NYC", walletAddr: "0x3e7A...6b4D", txRef: "0xd3e4...8c7f", note: "Original retail sale — launch day" },
      { date: "2015-12-01", action: "OWNERSHIP_TRANSFER", actor: "Private Collector", walletAddr: "0xF2b8...4c1A", txRef: "0xe5f6...9d2c" },
      { date: "2025-01-09", action: "OWNERSHIP_TRANSFER", actor: "jordanking_nyc", walletAddr: "0x9E4c...1f8D", txRef: "0xb5d2...b8d4", note: "StockX authenticated — verified DS" },
    ],
  },
  "4": {
    productId: "4",
    txHash: "e1c7a3f9d5b2e8c4a0f6d2b8e4c0a6f2d8b4e0c6a2f8d4b0e6c2a8f4d0b6e2c8",
    blockNumber: "20,445,112",
    blockTimestamp: "2025-02-14 16:33:50 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xB09d...5E1C",
    tokenId: "44291",
    signature: "3045022100f9a3c7e1b5d3f1a9c7e5b3d1f9a7c5e3022100b1d9f7a5c3e1b9d7f5a3c1e9b7d5f3a1c9e7b5d3f1a9c7e5b3d1f9a7c5e3b1",
    chip: {
      id: "PS5-CFI-2023-UK-77441",
      firmware: "v4.0.2-CONSOLE",
      manufacturer: "NXP PN532",
      lastPinged: "30 minutes ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "AES-128 + HMAC-SHA256",
    },
    ownershipHistory: [
      { date: "2023-05-10", action: "MANUFACTURE_REGISTER", actor: "Sony Interactive Entertainment", walletAddr: "0x6d8B...3c2F", txRef: "0xa9b8...4c3d", note: "Factory registration — Foxconn Shenzhen" },
      { date: "2023-07-15", action: "RETAIL_SALE", actor: "GAME UK London", walletAddr: "0x2f4C...9d1E", txRef: "0xb0c1...5d4e", note: "Retail activation" },
      { date: "2025-02-14", action: "OWNERSHIP_TRANSFER", actor: "london.tech", walletAddr: "0xD5a2...7f3B", txRef: "0xe1c7...e2c8", note: "Verified mint condition — factory seal intact" },
    ],
  },
  "5": {
    productId: "5",
    txHash: "9f2d6b0e4a8c2f6d0b4e2c6a0f8d4b2e0a6c4f8d2b6e0a4c8f2d6b0e4a8c2f6",
    blockNumber: "20,889,334",
    blockTimestamp: "2025-04-01 09:12:25 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xA78f...2B0D",
    tokenId: "8821",
    signature: "3046022100a4c2f0b6e4a2c8f6d4b2e0a6c4f8d2b6022100e0a4c8f2d6b0e4a8c2f6d0b4e2c6a0f8d4b2e0a6c4f8d2b6e0a4c8f2d6b0e4",
    chip: {
      id: "AAPL-MBP-M3-2024-SF-003341",
      firmware: "v5.1.0-APPLE",
      manufacturer: "Apple T2 Security Chip",
      lastPinged: "45 minutes ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "AES-256 + Secure Enclave",
    },
    ownershipHistory: [
      { date: "2024-11-12", action: "MANUFACTURE_REGISTER", actor: "Apple Inc.", walletAddr: "0xC3d9...8f4A", txRef: "0xf1e2...6d5c", note: "Factory provisioning — TSMC Fab N3E" },
      { date: "2024-11-29", action: "RETAIL_SALE", actor: "Apple Store Union Square SF", walletAddr: "0x7f1B...4e9C", txRef: "0x0a1b...7e6d", note: "Point-of-sale activation + Apple warranty registered" },
      { date: "2025-04-01", action: "OWNERSHIP_TRANSFER", actor: "sfmac_resale", walletAddr: "0xE8b4...2d7F", txRef: "0x9f2d...c2f6", note: "Battery: 99% health · 71 cycles confirmed" },
    ],
  },
  "6": {
    productId: "6",
    txHash: "0a5d2c8b6e4a1f9d3c7b5e2a0f8d6c4b2e0a7f5d3c1b9e6a4022100c3d7f1b5e",
    blockNumber: "20,661,980",
    blockTimestamp: "2025-03-15 07:58:44 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xF33e...1A8B",
    tokenId: "116610",
    signature: "3046022100d2c8b6e4a0f8d6c4b2e0a7f5d3c1b9e6a4c2f0b6e4a2c8f6d4b2e0a6c4f8022100b0e4a8c2f6d0b4e2c6a0f8d4b2e0a6c4f8d2b6e0a4c8f2d6b0e4a8c2f6d0b4",
    chip: {
      id: "ROLEX-SUB-2019-GVA-116610LN",
      firmware: "v2.0.0-ROLEX",
      manufacturer: "Rolex SA — Certified Watchmaker",
      lastPinged: "2 days ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "RSA-4096",
    },
    ownershipHistory: [
      { date: "2019-03-22", action: "MANUFACTURE_REGISTER", actor: "Rolex SA", walletAddr: "0x5B2c...7d9A", txRef: "0xe4f5...2a1b", note: "Manufacture no. 2019-GVA-7841 — Biel/Bienne factory" },
      { date: "2019-04-08", action: "AUTHORIZED_DEALER_SALE", actor: "Bucherer Genève", walletAddr: "0x1d3F...6c8E", txRef: "0xf5a6...3b2c", note: "Complete box + papers — warranty card signed" },
      { date: "2023-11-30", action: "ROLEX_SERVICE", actor: "Rolex Service Centre Geneva", walletAddr: "0x9C4b...2e7D", txRef: "0xa7b8...4c3d", note: "Full factory service — movement overhaul, gaskets replaced" },
      { date: "2025-03-15", action: "OWNERSHIP_TRANSFER", actor: "geneva.watch", walletAddr: "0x6F8a...1c5B", txRef: "0x0a5d...b9e6", note: "Current verified dealer — certified pre-owned" },
    ],
  },
  "8": {
    productId: "8",
    txHash: "3d7f1b5e9a2c6f0d4b8e2a6c0f4d8b2e6a0c4f8d2b6e0a4c8f2d6b0e4a8c2f6",
    blockNumber: "21,012,780",
    blockTimestamp: "2025-04-28 22:14:09 UTC",
    network: "Ethereum Mainnet",
    contractAddr: "0xC94a...8F2E",
    tokenId: "200248",
    signature: "304502210082b6d4f2a0c8e6b4d2f0a6c4e2b8d6f4a2c0e8b6d4f2a0c8e6022100b4d2f0a6c4e2b8d6f4a2c0e8b6d4f2a0c8e6b4d2f0a6c4e2b8d6f4a2c0e8b6",
    chip: {
      id: "NTD-OLED-2024-KR-881234",
      firmware: "v3.9.1-NINTENDO",
      manufacturer: "Broadcom BCM20736",
      lastPinged: "12 hours ago",
      signatureValid: true,
      tamperDetected: false,
      nfcFrequency: "13.56 MHz",
      encryptionStandard: "AES-128 + SHA-256",
    },
    ownershipHistory: [
      { date: "2024-01-08", action: "MANUFACTURE_REGISTER", actor: "Nintendo Co. Ltd.", walletAddr: "0x3A7f...9d2C", txRef: "0xd2e3...8f4d", note: "Factory registration — Foxconn Suzhou" },
      { date: "2024-01-20", action: "RETAIL_SALE", actor: "Nintendo Korea Official", walletAddr: "0x8c2D...5a4E", txRef: "0xe3f4...9a5e", note: "Official Nintendo Korea outlet" },
      { date: "2025-04-28", action: "OWNERSHIP_TRANSFER", actor: "seoulplay.kr", walletAddr: "0x2D5b...7c3A", txRef: "0x3d7f...c2f6", note: "Zero dead pixels — screen verified" },
    ],
  },
};

export function getAuthCert(productId: string): AuthCert | undefined {
  return AUTH_CERTS[productId];
}

export function isWeb3Verified(productId: string): boolean {
  return productId in AUTH_CERTS;
}
