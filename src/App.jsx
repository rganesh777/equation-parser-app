import "./App.css";
import Parser from "./components/Parser";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Parser />
        </div>
      </main>
    </>
  );
}

export default App;
