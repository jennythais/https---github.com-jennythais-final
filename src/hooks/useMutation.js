import { useState } from "react";
//post , update, delete data
// send data to server
const useMutation = (promise) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState();

  const execute = async (payload, callback = {}) => {
    const { onSuccess, onFail } = callback;
    try {
      setLoading(true);
      const res = await promise(payload);
      setData(res.data?.data || []);
      onSuccess?.(res.data?.data);
    } catch (errorData) {
      setErrorData(errorData);
      onFail?.(errorData);
    } finally {
      setLoading(false);
    }
  };
  return {
    execute,
    data,
    loading,
    errorData,
  };
};
export default useMutation;
