export async function fetchApi(url, options = {}) {
  try {
    let apiResponse = await fetch(url, options);
    if (!apiResponse.ok) {
      throw new Error(apiResponse.statusText);
    }
    let dataFromApi = await apiResponse.json();
    return dataFromApi;
  } catch (e) {
    throw new Error(e);
  }
}
