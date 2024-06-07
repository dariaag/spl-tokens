import { struct, u8, address, unit, u64 } from "@subsquid/borsh";
import { instruction } from "../abi.support";
import { COptionPubkey, AuthorityType } from "./types";

export interface InitializeMint {
  decimals: number;
  mintAuthority: string;
  freezeAuthority: COptionPubkey;
}

export const initializeMint = instruction(
  {
    d8: "0xd12ac3048155d12c",
  },
  {
    mint: 0,
    rent: 1,
  },
  struct({
    decimals: u8,
    mintAuthority: address,
    freezeAuthority: COptionPubkey,
  })
);

export type InitializeAccount = undefined;

export const initializeAccount = instruction(
  {
    d8: "0x4a73635dc5456707",
  },
  {
    account: 0,
    mint: 1,
    owner: 2,
    rent: 3,
  },
  unit
);

export interface InitializeMultisig {
  m: number;
}

export const initializeMultisig = instruction(
  {
    d8: "0xdc8275151be34ed5",
  },
  {
    multisig: 0,
    rent: 1,
  },
  struct({
    m: u8,
  })
);

export interface Transfer {
  amount: bigint;
}

export const transfer = instruction(
  {
    d8: "0xa334c8e78c0345ba",
  },
  {
    source: 0,
    destination: 1,
    authority: 2,
  },
  struct({
    amount: u64,
  })
);

export interface Approve {
  amount: bigint;
}

export const approve = instruction(
  {
    d8: "0x454ad9247375614c",
  },
  {
    source: 0,
    delegate: 1,
    owner: 2,
  },
  struct({
    amount: u64,
  })
);

export type Revoke = undefined;

export const revoke = instruction(
  {
    d8: "0xaa171f2285ad5df2",
  },
  {
    source: 0,
    owner: 1,
  },
  unit
);

export interface SetAuthority {
  authorityType: AuthorityType;
  newAuthority: COptionPubkey;
}

export const setAuthority = instruction(
  {
    d8: "0x85fa25156ea31a79",
  },
  {
    owned: 0,
    owner: 1,
    signer: 2,
  },
  struct({
    authorityType: AuthorityType,
    newAuthority: COptionPubkey,
  })
);

export interface MintTo {
  amount: bigint;
}

export const mintTo = instruction(
  {
    d8: "0xf12230ba25b37bc0",
  },
  {
    mint: 0,
    account: 1,
    owner: 2,
  },
  struct({
    amount: u64,
  })
);

export interface Burn {
  amount: bigint;
}

export const burn = instruction(
  {
    d8: "0x746e1d386bdb2a5d",
  },
  {
    account: 0,
    mint: 1,
    authority: 2,
  },
  struct({
    amount: u64,
  })
);

export type CloseAccount = undefined;

export const closeAccount = instruction(
  {
    d8: "0x7dff950e6e224818",
  },
  {
    account: 0,
    destination: 1,
    owner: 2,
  },
  unit
);

export type FreezeAccount = undefined;

export const freezeAccount = instruction(
  {
    d8: "0xfd4b5285a7ee2b82",
  },
  {
    account: 0,
    mint: 1,
    owner: 2,
  },
  unit
);

export type ThawAccount = undefined;

export const thawAccount = instruction(
  {
    d8: "0x73984fd5d5a9b823",
  },
  {
    account: 0,
    mint: 1,
    owner: 2,
  },
  unit
);

export interface TransferChecked {
  amount: bigint;
  decimals: number;
}

export const transferChecked = instruction(
  {
    d8: "0x77faca18fd87f479",
  },
  {
    source: 0,
    mint: 1,
    destination: 2,
    authority: 3,
  },
  struct({
    amount: u64,
    decimals: u8,
  })
);

export interface ApproveChecked {
  amount: bigint;
  decimals: number;
}

export const approveChecked = instruction(
  {
    d8: "0x2fc5fe2a3ac93a6d",
  },
  {
    source: 0,
    mint: 1,
    delegate: 2,
    owner: 3,
  },
  struct({
    amount: u64,
    decimals: u8,
  })
);

export interface MintToChecked {
  amount: bigint;
  decimals: number;
}

export const mintToChecked = instruction(
  {
    d8: "0xe5ec24f076e12d7d",
  },
  {
    mint: 0,
    account: 1,
    owner: 2,
  },
  struct({
    amount: u64,
    decimals: u8,
  })
);

export interface BurnChecked {
  amount: bigint;
  decimals: number;
}

export const burnChecked = instruction(
  {
    d8: "0xc679c86678d09bb2",
  },
  {
    account: 0,
    mint: 1,
    authority: 2,
  },
  struct({
    amount: u64,
    decimals: u8,
  })
);

export interface InitializeAccount2 {
  owner: string;
}

export const initializeAccount2 = instruction(
  {
    d8: "0x08b69590b91fd169",
  },
  {
    account: 0,
    mint: 1,
    rent: 2,
  },
  struct({
    owner: address,
  })
);

export type SyncNative = undefined;

export const syncNative = instruction(
  {
    d8: "0x9bdb2424ef801541",
  },
  {
    account: 0,
  },
  unit
);

export interface InitializeAccount3 {
  owner: string;
}

export const initializeAccount3 = instruction(
  {
    d8: "0x178e8c8715a08540",
  },
  {
    account: 0,
    mint: 1,
  },
  struct({
    owner: address,
  })
);

export interface InitializeMultisig2 {
  m: number;
}

export const initializeMultisig2 = instruction(
  {
    d8: "0x51ef49271b940292",
  },
  {
    multisig: 0,
    signer: 1,
  },
  struct({
    m: u8,
  })
);

export interface InitializeMint2 {
  decimals: number;
  mintAuthority: string;
  freezeAuthority: COptionPubkey;
}

export const initializeMint2 = instruction(
  {
    d8: "0x5f6cc6d248f38feb",
  },
  {
    mint: 0,
  },
  struct({
    decimals: u8,
    mintAuthority: address,
    freezeAuthority: COptionPubkey,
  })
);

export type GetAccountDataSize = undefined;

export const getAccountDataSize = instruction(
  {
    d8: "0x10b1d280152d6f1f",
  },
  {
    mint: 0,
  },
  unit
);

export type InitializeImmutableOwner = undefined;

export const initializeImmutableOwner = instruction(
  {
    d8: "0x8d320f2cc3f7223c",
  },
  {
    account: 0,
  },
  unit
);

export interface AmountToUiAmount {
  amount: bigint;
}

export const amountToUiAmount = instruction(
  {
    d8: "0xa091c862f29c1e5a",
  },
  {
    mint: 0,
  },
  struct({
    amount: u64,
  })
);

export interface UiAmountToAmount {
  uiAmount: string;
}

export const uiAmountToAmount = instruction(
  {
    d8: "0xadf34004671f3834",
  },
  {
    mint: 0,
  },
  struct({
    uiAmount: u64,
  })
);
