import {Routes, Route} from 'react-router-dom';
import AlbumResults from './components/AlbumResults';
import Home from './components/Home';
import SearchAlbum from './components/SearchAlbum';
import Login from './components/Login';
import Test from  './components/Test'
import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <Routes>

      <Route path='/' element={<Home/>}/>
      
      <Route path='/login' element={<Login/>}/>

      <Route path='/register' element={<Register/>}/>

      <Route path='/1' element={<Test/>}/>
      
      <Route path='/search/albums' element={<SearchAlbum />} />
      
      <Route path='/search/albums/results/:q' element={<AlbumResults />} />

      </Routes>
    </div>
  );
}

export default App;
