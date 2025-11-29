// import { BookList } from './components/BookList'

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        autoClose={3000}
        position="top-right"
        aria-label="Notificações do Sistema"
      />
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>

      <footer className="bg-black text-white py-4 text-center mt-8">
        <p>Realizado por Felipe Aso e Eduardo Vianna</p>
      </footer>
    </div>
  );
}

export default App;
