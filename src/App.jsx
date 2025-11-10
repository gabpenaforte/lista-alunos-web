import * as React from "react";
import useFetchData from "./utils/fetchData";
import './App.css'

const App = () => {
  const { data: alunos, loading, error } = useFetchData();

  return (
    <>
      <h1>Lista de Alunos</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar alunos.</p>}

      {!loading && !error && (
        <ul>
          {Array.isArray(alunos) && alunos.length > 0 ? (
            alunos.map((aluno) => (
              <li key={aluno._id || aluno.cpf}>
                {aluno.nome} — {aluno.email} — {aluno.cpf}
              </li>
            ))
          ) : (
            <li>Nenhum aluno encontrado</li>
          )}
        </ul>
      )}
    </>
  )
}

export default App
