import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import JsonTable from "./jsoncomp";
import EditableTable from "./EditableTable";

function App() {
  const [post, setPost] = useState([{}]);
  useEffect(() => {
    axios.get("https://localhost:7266/api/PaymEmployees").then((response) => {
      setPost(response.data);
    });
  }, []);

  return (
    <div>
      <JsonTable jsonData={post} />
    </div>
  );
}

export default App;
