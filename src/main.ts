import { run } from "@subsquid/batch-processor";
import { augmentBlock } from "@subsquid/solana-objects";
import { DataSourceBuilder, SolanaRpcClient } from "@subsquid/solana-stream";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import assert from "assert";
import * as whirlpool from "./abi/whirlpool";
import { Exchange } from "./model";
import * as tokenProgram from "./abi/tokenProgram";
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
import { struct, u8, address, unit, u64 } from "@subsquid/borsh";
import { instruction } from "./abi/idl.support";
//@ts-ignore
import { COptionPubkey, AuthorityType, astr } from "./abi/tokenProgram/types";
// First we create a DataSource - component,
// that defines where to get the data and what data should we get.
let s =
  "0x" +
  "4e9c3ce44d6dc7d5fd35284357d3dd381d27f162f2aeaca14d716f722eaab40b".substring(
    0,
    16
  );
const dataSource = new DataSourceBuilder()
  // Provide Subsquid Network Gateway URL.
  .setGateway("https://v2.archive.subsquid.io/network/solana-mainnet")

  .setRpc(
    process.env.SOLANA_NODE == null
      ? undefined
      : {
          client: new SolanaRpcClient({
            url: process.env.SOLANA_NODE,
            // rateLimit: 100 // requests per sec
          }),
          strideConcurrency: 10,
        }
  )

  .setBlockRange({ from: 240_000_000 })

  .setFields({
    block: {
      // block header fields
      timestamp: true,
    },

    instruction: {
      // instruction fields
      programId: true,

      data: true,
    },
    log: {
      message: true,
    },
  })
  //request toke program logs with instruction data
  .addLog({
    where: {
      programId: [TOKEN_PROGRAM_ID],
    },
    include: {
      instruction: true,
    },
  })

  .build();

const database = new TypeormDatabase();

// Now we are ready to start data processing
run(dataSource, database, async (ctx) => {
  let blocks = ctx.blocks.map(augmentBlock);

  let exchanges: Exchange[] = [];

  for (let block of blocks) {
    for (let log of block.logs) {
      //initialize mint logs are filtered by message content
      if (log.message == "Instruction: InitializeMint") {
        //console.log(log.instruction);
        if (log.instruction == null) {
          continue;
        }
        // token program InitializeMint log
        console.log(log);
        // instruction from this log
        console.log(log.instruction);
        // decoding here, after fixing typegen
        let decoded = tokenProgram.instructions.initializeMint.decode(
          log.instruction
        );
        console.log(decoded);
        //decoded instruction example
         /*  {
        accounts: {
          mint: '2yHG2HwZJMVwKG2UcMAxFtBMiKhJqqcDsvvpZFAnqMQn',
          rent: 'SysvarRent111111111111111111111111111111111'
        },
        data: {
          decimals: 4,
          mintAuthority: 'EyqxZ5zTq4gPqG6AbRF4deeztTyeZQZPNfanb4gWd59v',
          freezeAuthority: undefined
        }
      } */

        // after decoding, create an entity and save it to the database
        
      }
    }
  }
});
