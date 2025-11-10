import * as React from "react";
import AddAlunosButton from "./components/addAlunosButton";
import ListaAlunos from "./components/listaAlunos";
import useFetchData from "./utils/fetchData";
import "./App.css";

const App = () => {
  const { data, loading, error, setData } = useFetchData();

  return (
    <div className="app-container">
      <h1>Lista de Alunos</h1>
      <AddAlunosButton setAlunos={setData} />
      <ListaAlunos
        alunos={data}
        loading={loading}
        error={error}
        setAlunos={setData}
      />
    </div>
  );
};

export default App;
