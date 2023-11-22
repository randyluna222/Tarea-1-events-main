export async function fetchData(API_URL) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}