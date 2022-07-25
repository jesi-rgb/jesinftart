import CollectionManager from "@/contracts/CollectionManager.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

// export const COLLECTIONS = [
//   {
//     name: "Hexagoncitos",
//     symbol: "HEX",
//     collection: "0xb7584D984667EB7E1CB4e22ebAf37E42DC44bA78",
//     proxy: "0xC25a78359Dfd13509FfC70C9932D642AE57bC1d2",
//     proxy_admin: "0xA2Ea6144e3340Ce18CCCCE3F3fCcd6a4937d3939",
//   },
// ];

// export const CONTRACT_ADDRESS = "0xbbb8428f3e763af53Fa526a054d4F474cED74b78";

export const COLLECTION_MANAGER_ADDRESS =
  "0xd91Be487A2a2661bD23E34b1b101f64AA8c0f3ef";

export const APPROVED_ADDRESSES_FOR_UPLOADING = [
  "0xf3945aFdbf70ABd9FDaf85bF8e4240ba789B6Bd6",
  "0x3944d911d8cE4FD7A09dB86bD4262990Fb2D96de",
  "0xEc473Af2Bbd3e560b2c89171729cC17A22647106",
];

export const ipfs_prefix = "ipfs://";
export const webURI = "https://jesinftart.vercel.app";
export const collectionsURI = webURI + "/collections";

// Get contract manager
const CollectionManagerAbi = CollectionManager.abi;
const CollectionManagerInterface = new utils.Interface(CollectionManagerAbi);
export const CollectionManagerContract = new Contract(
  COLLECTION_MANAGER_ADDRESS,
  CollectionManagerInterface
);

export function shrinkHash(hash) {
  let end = hash.slice(hash.length - 4);
  let start = hash.slice(0, 4);
  return start + "..." + end;
}
