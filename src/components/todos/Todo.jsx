import { useNearContract } from 'near-react-hooks';
import { useState } from 'react';

export function Todo({ id, task, done }) {
  const [checked, setChecked] = useState(done);

  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ['update', 'del'],
  });

  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { task, done: target.checked } });
  };

  const del = () => {
    contract.del({ id });
  };

  return (
    <>
      <p>{task}</p>
      <input type="checkbox" checked={checked} onChange={complete} />
      <button onClick={del}>delete</button>
    </>
  );
}
