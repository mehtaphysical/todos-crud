import { useNearWallet } from 'near-react-hooks';
import { useEffect } from 'react';
import CreateTodo from '../todos/CreateTodo';
import TodoList from '../todos/TodoList';

function App() {
  const wallet = useNearWallet();

  useEffect(() => {
    if (!wallet.isSignedIn())
      wallet.requestSignIn(process.env.REACT_APP_CONTRACT_ID, 'Todo App');
  }, [wallet]);

  return (
    <>
      <CreateTodo />
      <TodoList />
    </>
  );
}

export default App;
