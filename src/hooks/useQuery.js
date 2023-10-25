import { useEffect, useState } from "react";
// get, chu yeu la get read data, dependencies changes ==> call useQuery
//loading true == call API is processing, not complete
//loading false == call API done, regardless of whether the result is success or fail
const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); //moi bat dau start = true, trong qua trinh true => false thi van la true
  const [error, setError] = useState();

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const res = await promise(query);
      setData(res?.data?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};

export default useQuery;
