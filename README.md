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