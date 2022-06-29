import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [info, setInfo] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
      const  abortCont = new AbortController();

          setTimeout(() => {
              fetch(url, {signal: abortCont.signal})
                  .then(res => {
                      if (!res.ok) {
                          throw Error("could not fetch the data");
                      }
                      return res.json();
                  })
                  .then(data => {
                      setInfo(data);
                      setIsPending(false);
                      setError(null);
                  }).catch(e => {
                      if(e.name === 'AbortError'){
                          console.log('fetch aborted')
                      }else{
                          setIsPending(false);
                          setError(e.message);
                      }
              })
          }, 1000);

          return () => abortCont.abort();
      }, [url]);
   return {info, isPending, error}
}
export default useFetch;
