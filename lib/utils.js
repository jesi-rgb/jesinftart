export const COLLECTIONS = [
  {
    name: "Hexagoncitos",
    symbol: "HEX",
    collection: "0xb7584D984667EB7E1CB4e22ebAf37E42DC44bA78",
    proxy: "0xC25a78359Dfd13509FfC70C9932D642AE57bC1d2",
    proxy_admin: "0xA2Ea6144e3340Ce18CCCCE3F3fCcd6a4937d3939",
  },
];

export const CONTRACT_ADDRESS = "0xbbb8428f3e763af53Fa526a054d4F474cED74b78";

export function shrinkHash(hash) {
  let end = hash.slice(hash.length - 4);
  let start = hash.slice(0, 4);
  return start + "..." + end;
}
