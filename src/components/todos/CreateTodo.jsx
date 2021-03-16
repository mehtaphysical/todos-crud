import { useNearContract } from 'near-react-hooks';
import { useState } from 'react';

export default function CreateTodo() {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ['create'],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    contract.create({ task }).then(() => {
      setTask('');
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button disabled={loading}>Create</button>
    </form>
  );
}
