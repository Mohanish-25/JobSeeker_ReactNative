import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "c0e1c799b5msh72677d2536ba9c9p145b59jsnc83e5a5b10fd",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };
  // clg mail latest  = c0e1c799b5msh72677d2536ba9c9p145b59jsnc83e5a5b10fd

  // 51c2c56dc5msh55d530580fe0743p128630jsnf60e8bd32481
  // removed 1

  // 4f1eaad341msh9734374cc665130p1466dejsn31369bf08dae monyas
  // mine 51c2c56dc5msh55d530580fe0743p128630jsnf60e8bd32481
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
