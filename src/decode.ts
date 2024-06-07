import { deserialize, Schema, serialize } from "borsh";
import { DecodeTypes } from "borsh/lib/types/types";

const feedId: Schema = {
  array: { type: "u8", len: 32 },
};

const schema: Schema = {
  struct: {
    feedId: feedId,
    price: "i64",
    conf: "u64",
    exponent: "i32",
    publishTime: "i64",
    prevPublishTime: "i64",
    emaPrice: "i64",
    emaConf: "u64",
  },
};

const encoded = Buffer.from([
  0, 103, 166, 249, 48, 48, 66, 12, 28, 158, 63, 227, 124, 26, 182, 183, 121,
  102, 175, 130, 249, 149, 148, 74, 159, 239, 206, 53, 122, 34, 133, 74, 128, 0,
  0, 0, 0, 0, 1, 0, 72, 0, 0, 0, 0, 0, 0, 0, 65, 255, 255, 255, 251, 0, 0, 0, 0,
  102, 47, 80, 179, 0, 0, 0, 0, 102, 47, 80, 179, 0, 0, 0, 0, 0, 1, 0, 83, 0, 0,
  0, 0, 0, 0, 0, 51,
]);

export type Message = {
  feedId: Uint8Array;
  price: bigint;
  conf: bigint;
  exponent: number;
  publishTime: bigint;
  prevPublishTime: bigint;
  emaPrice: bigint;
  emaConf: bigint;
};
export function deserialize_message(input: Buffer) {
  const schema: Schema = {
    struct: {
      decimals: "u8",
      mintAuthority: "string",
      freeze_authority: "option<string>",
    },
  };

  const decoded = deserialize(schema, input);

  console.log(decoded);
}
const decoded = deserialize_message(
  Buffer.from(
    "14pb4Dnjja3PqW6C3CShCmFRCqLSFHartBjanJcVd8pvjDpd5jFSsVadsgo34VxtvQYpzsyhegPKkPDXsBTwggj88J1"
  )
);
console.log(decoded);
// const buffer = serialize(schemaa, value);
// const newValue = deserialize(schemaa, buffer);
// console.log(newValue);
