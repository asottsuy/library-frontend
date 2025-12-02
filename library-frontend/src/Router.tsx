import { Route, Routes } from "react-router-dom";
import App from "./App";
import { BookList } from "./pages/BookList";
import Login from "./pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/manager" element={<BookList></BookList>} />
        {/* <Route path="/autores" element={<AuthorList></AuthorList>} /> */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Route>
    </Routes>
  );
}
