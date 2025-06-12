import "./App.css";
import "tailwindcss/tailwind.css";
import Router from "./pages/Router";
import Snackbar from "./components/Snackbar";

function App() {
  return (
    <>
      <section className="bg-[#F9F9F9]">
        <Snackbar/>
        <Router />
      </section>
    </>
  );
}

export default App;
