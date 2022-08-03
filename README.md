<h1 align="center">
    React Router v6
</h1>

## Description
React Router is the most popular routing library in React, but it can be a bit complicated to wrap your head around some of the more complex features. That is why in this project I will be breaking down everything I need to know about React Router so I can learn even the most advanced features with ease.

### Dynamic Routes

```javascript
 <Route path="/books/:id" element={<Book />} />
```
The final route in the above example is a dynamic route that has a dynamic parameter of :id.

Pretty much always when you have a dynamic route like this you want to access the dynamic value in your custom component which is where the useParams hook comes in.

```javascript
import { useParams } from "react-router-dom"

export function Book() {
  const { id } = useParams()

  return (
    <h1>Book {id}</h1>
  )
}
```

### Nested Routes
In the example we have three routes that start with /books so we can nest those routes inside of each other to clean up our routes.
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/books">
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```
This nesting is pretty simple to do. All you need to do is make a parent Route that has the path prop set to the shared path for all your child Route components.

### Shared Layouts
let's imagine that we want to render a nav section with links to each book as well the new book form from any of our book pages. To do this normally we would need to make a shared component to store this navigation and then import that into every single book related component. This is a bit of a pain, though, so React Router created its own solution to solve this problem. If you pass an element prop to a parent route it will render that component for every single child Route which means you can put a shared nav or other shared components on every child page with ease.

#### Routes
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/books" element={<BooksLayout />}>
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

#### Shared Layout Component
Then whichever child Route is matched will be rendered wherever the Outlet component is placed inside our layout component. The Outlet component is essentially a placeholder component that will render whatever our current page's content is. This structure is incredibly useful and makes sharing code between routes incredibly easy.
```javascript
import { Link, Outlet } from "react-router-dom"

export function BooksLayout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/books/1">Book 1</Link></li>
          <li><Link to="/books/2">Book 2</Link></li>
          <li><Link to="/books/new">New Book</Link></li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
```

#### Outlet Context
The final important thing to know about Outlet components is they can take in a context prop which will work just like React context.

```javascript
import { Link, Outlet } from "react-router-dom"

export function BooksLayout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/books/1">Book 1</Link></li>
          <li><Link to="/books/2">Book 2</Link></li>
          <li><Link to="/books/new">New Book</Link></li>
        </ul>
      </nav>

      <Outlet context={{ hello: "world" }} />
    </>
  )
}
```
```javascript
import { useParams, useOutletContext } from "react-router-dom"

export function Book() {
  const { id } = useParams()
  const context = useOutletContext()

  return (
    <h1>Book {id} {context.hello}</h1>
  )
}
```

## Nested Routes 
The other way to use multiple Routes components is to nest them inside one another. This is pretty common if you have lots of routes and want to clean up your code by moving similar routes into their own files.
Nesting Routes in React Router is pretty simple. All you need to do is create a new component to store your nested Routes this component should have a Routes component and inside that Routes component should be all the Route components that you are matching with the parent Route. In our case we are moving all our /books routes into this BookRoute component. Then in the parent Routes you need to define a Route that has a path equal to the path all your nested Routes share. In our case that would be /books. The important thing, though, is you need to end your parent Route path with a * otherwise it will not properly match the child routes.
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/books/*" element={<BookRoutes />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```
```javascript
import { Routes, Route } from "react-router-dom"
import { BookList } from "./pages/BookList"
import { Book } from "./pages/Book"
import { NewBook } from "./pages/NewBook"
import { BookLayout } from "./BookLayout"

export function BookRoutes() {
  return (
    <Routes>
      <Route element={<BookLayout />}>
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```
## useRoutes Hook
One thing you need to know about defining routes in React Router is that you can use a JavaScript object to define your routes instead of JSX if you prefer.
```javascript
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { BookList } from "./BookList"
import { Book } from "./Book"

export function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />
   
```