import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [info, setInfo] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
          setTimeout(() => {
              fetch(url)
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
                      setIsPending(false);
                  setError(e.message);
              })
          }, 1000);
      }, [url]);
   return {info, isPending, error}
}
export default useFetch;
