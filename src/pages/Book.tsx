import { useParams } from 'react-router-dom';

interface IContext {
  name: string;
}

export function Book() {
  const { id } = useParams();
  return <h1>Book {id}</h1>;
}
