import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/alunos");
        const alunos =
          response.data && response.data.data ? response.data.data.alunos : [];
        setData(alunos || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, setData };
};

export default useFetchData;
