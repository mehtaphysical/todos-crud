import { useNearContract } from 'near-react-hooks';
import { useEffect, useState } from 'react';
import { Todo } from './Todo';

const PER_PAGE_LIMIT = 3;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ['del'],
    viewMethods: ['get'],
  });

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE_LIMIT;
    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((todos) => setTodos(todos));
    }, 1000);

    return () => clearInterval(id);
  }, [page]);

  return (
    <ul>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {page}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
}
