import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainPage from "./components/MainPage";
import Table from "./components/Table";
import CodeSnippet from "./components/CodeSnippet";
import { Route, Routes } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/code-list" element={<Table />} />
        <Route path="/code-block">
          <Route path=":id" element={<CodeSnippet />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
