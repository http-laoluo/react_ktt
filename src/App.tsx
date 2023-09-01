
import './App.css';
import {HashRouter as Router} from "react-router-dom"
import RouterView from './router';
function App() {
  
  return (
    <div className="App">
         <Router><RouterView></RouterView></Router>
    </div>
  );
}

export default App;
