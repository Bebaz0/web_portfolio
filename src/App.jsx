
import './App.css'
import TechStack from "./components/TechStack/TechStack.jsx";
import Todo from "./components/ToDo/Todo.jsx";

function App() {

  return (
    <div className={'heroWrapper'}>
        <div className={'profile'}>
            <img/>
            <h1>Afonso Lima</h1>
            <p>BiriBiBabidiBoo</p>
            <TechStack/>
        </div>
        <div className={'todo'}>
            <Todo/>
        </div>
        <span></span>
    </div>
  )
}

export default App
