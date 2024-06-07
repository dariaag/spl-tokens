import {
  Codec,
  unit,
  sum,
  struct,
  ref,
  u64,
  u8,
  bool,
  address,
  option,
  fixedArray,
} from "@subsquid/borsh";
import { OptionCodec } from "@subsquid/borsh/lib/codecs/option";

export type AccountState_Uninitialized = undefined;

export const AccountState_Uninitialized = unit;

export type AccountState_Initialized = undefined;

export const AccountState_Initialized = unit;

export type AccountState_Frozen = undefined;

export const AccountState_Frozen = unit;

export type AccountState =
  | {
      kind: "Uninitialized";
      value?: AccountState_Uninitialized;
    }
  | {
      kind: "Initialized";
      value?: AccountState_Initialized;
    }
  | {
      kind: "Frozen";
      value?: AccountState_Frozen;
    };

export const AccountState: Codec<AccountState> = sum(1, {
  Uninitialized: {
    discriminator: 0,
    value: AccountState_Uninitialized,
  },
  Initialized: {
    discriminator: 1,
    value: AccountState_Initialized,
  },
  Frozen: {
    discriminator: 2,
    value: AccountState_Frozen,
  },
});

export type AuthorityType_MintTokens = undefined;

export const AuthorityType_MintTokens = unit;

export type AuthorityType_FreezeAccount = undefined;

export const AuthorityType_FreezeAccount = unit;

export type AuthorityType_AccountOwner = undefined;

export const AuthorityType_AccountOwner = unit;

export type AuthorityType_CloseAccount = undefined;

export const AuthorityType_CloseAccount = unit;

export type AuthorityType =
  | {
      kind: "MintTokens";
      value?: AuthorityType_MintTokens;
    }
  | {
      kind: "FreezeAccount";
      value?: AuthorityType_FreezeAccount;
    }
  | {
      kind: "AccountOwner";
      value?: AuthorityType_AccountOwner;
    }
  | {
      kind: "CloseAccount";
      value?: AuthorityType_CloseAccount;
    };

export const AuthorityType: Codec<AuthorityType> = sum(1, {
  MintTokens: {
    discriminator: 0,
    value: AuthorityType_MintTokens,
  },
  FreezeAccount: {
    discriminator: 1,
    value: AuthorityType_FreezeAccount,
  },
  AccountOwner: {
    discriminator: 2,
    value: AuthorityType_AccountOwner,
  },
  CloseAccount: {
    discriminator: 3,
    value: AuthorityType_CloseAccount,
  },
});

export interface Mint {
  mintAuthority: COptionPubkey;
  supply: bigint;
  decimals: number;
  isInitialized: boolean;
  freezeAuthority: COptionPubkey;
}
//@ts-ignore
export const Mint: Codec<Mint> = struct({
  mintAuthority: ref(() => COptionPubkey),
  supply: u64,
  decimals: u8,
  isInitialized: bool,
  freezeAuthority: ref(() => COptionPubkey),
});

export interface Account {
  mint: string;
  owner: string;
  amount: bigint;
  delegate: COptionPubkey;
  state: AccountState;
  isNative: COptionU64;
  delegatedAmount: bigint;
  closeAuthority: COptionPubkey;
}
//@ts-ignore
export const Account: Codec<Account> = struct({
  mint: address,
  owner: address,
  amount: u64,
  delegate: ref(() => COptionPubkey),
  state: ref(() => AccountState),
  isNative: ref(() => COptionU64),
  delegatedAmount: u64,
  closeAuthority: ref(() => COptionPubkey),
});

export interface Multisig {
  m: number;
  n: number;
  isInitialized: boolean;
  signers: Array<string>;
}

export type Pubkey = {
  x: Array<number>;
};

export const Pubkey: Codec<Pubkey> = struct({
  x: fixedArray(u8, 32),
});

export type COptionPubkey =
  | {
      kind: "None";
      value?: undefined;
    }
  | {
      kind: "Some";
      value: Pubkey;
    };

export type COptionU64 =
  | {
      kind: "None";
      value?: undefined;
    }
  | {
      kind: "Some";
      value: bigint;
    };

export const COptionPubkey: OptionCodec<Pubkey> = option(Pubkey);

export const COptionU64: OptionCodec<bigint> = option(u64);

export const Multisig: Codec<Multisig> = struct({
  m: u8,
  n: u8,
  isInitialized: bool,
  signers: fixedArray(address, 11),
});
