import axios from "axios";

export async function makeAPIcall (url,payload){
    try {
        const response = await axios.post(url, {
          data: {
            phrase: payload, // This is the body part
          },
        });
        return response;
      } catch (error) {
        return error;
      }
}

export async function makeGetAPIcall (url){
  try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
}
