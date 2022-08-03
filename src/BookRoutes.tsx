import { Route, Routes } from 'react-router-dom';
import { Book } from './pages/Book';
import { Books } from './pages/Books';
import { NewBook } from './pages/NewBook';
import { NotFound } from './pages/NotFound';
import { BookLayout } from './shared/BookLayout';

export function BookRoutes() {
  return (
    <Routes>
      <Route element={<BookLayout />}>
        <Route index element={<Books />} />
        <Route path=':id' element={<Book />} />
        <Route path='new' element={<NewBook />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
