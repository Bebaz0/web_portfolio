
import './App.css'
import TechStack from "./components/TechStack/TechStack.jsx";
import Todo from "./components/ToDo/Todo.jsx";

function App() {

  return (
    <div className={'heroWrapper'}>
        <div className={'profile'}>
            <h1>Afonso Lima</h1>
            <div className={'socials'}> </div>
            <p>Full-Stack Developer specialized in modern frontend and user-centric UI. I build things with a clear
                purpose, no gimmicks. Straightforward, original. Driven by creator mentality and good ideas.</p>
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
