import { Route, Routes } from "react-router-dom";
import App from "./App";
import { BookList } from "./components/BookList";
import Login from "./pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/livros" element={<BookList></BookList>} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Route>
    </Routes>
  );
}
