import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    setErrors(null)
    try{

        const response = await axios[method](url, body)
 
        if(onSuccess) {
            onSuccess()
        }

        return response.data

    }catch(err){
     setErrors(err.response.data.errors)
    }
  };

  return { doRequest, errors };
}
