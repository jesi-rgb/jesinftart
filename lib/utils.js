export const JESI_ART_CONTRACT_ADDRESS = "0xbbb8428f3e763af53Fa526a054d4F474cED74b78"


export function shrinkHash(hash) {
  let end = hash.slice(hash.length - 4);
  let start = hash.slice(0, 4);
  return start + "..." + end;
}


import axios from 'axios';

export function uploadToIPFS() {

  const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  const PINATA_PIN_ENDPOINT = ""


  const img_path = "/Users/alex/Work/Personal/jesi-ntf-market/img.jpg"
  const img = readSingleFile(img_path)

  console.log(img)

  // axios
  // .post(PINATA_URL, {
  //   headers: {
  //     pinata_api_key: API_KEY,
  //     pinata_secret_api_key: API_SECRET_KEY
  //   },
  //   file: img_path
  // })
  // .then(function (response) {
  //   //handle your response here
  // })
  // .catch(function (error) {
  //   //handle error here
  // });

}