import { useOutletContext, useParams } from 'react-router-dom';

interface IContext {
  name: string;
}

export function Book() {
  const { id } = useParams();
  const context = useOutletContext<IContext>();
  return (
    <>
      <h1>
        Book {id} by {context.name}
      </h1>
    </>
  );
}
