import { useState, useEffect } from 'react';
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, {signal: abortCont.signal})
      .then(res => {
        if (!res.ok) { // server error
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {  //connection error
        if (err.name === "AbortError"){
          console.log("Fetch aborted");
        } else{
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);
    return () => abortCont.abort();
  },)

  return { data, isPending, error };
}
 
export default useFetch;