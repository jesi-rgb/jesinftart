export const retrieveIPFSData = async (URI) => {
  try {
    console.log(URI);
    let response = await fetch(URI);
    let responseJson = await response.json();
    console.log("lib", responseJson);
    return responseJson;
  } catch (error) {
    console.error("[lib] error", error);
  }
};
