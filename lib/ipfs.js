export const retrieveIPFSData = async (URI) => {
  try {
    let response = await fetch(URI);
    let responseJson = await response.json();
    console.log("lib", responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
