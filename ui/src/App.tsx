import "./App.css";
import {makeServer} from '../mirage.ts';
import Feed from "./Feed";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function App() {
  return (
    <>
      <Feed />
    </>
  );
}

export default App;
