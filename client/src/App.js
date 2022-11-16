import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Test from './components/Test';


function App() {
  return (
    <div className="App">
      <Routes>

      <Route path='/' element={<Home/>}/>
      
      <Route path='/login' element={<Login/>}/>

      <Route path='/1' element={<Test/>}/>


      </Routes>
    </div>
  );
}

export default App;
