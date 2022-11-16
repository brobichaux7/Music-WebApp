import {Routes, Route} from 'react-router-dom';
import AlbumResults from './components/AlbumResults';
import Home from './components/Home';
import SearchAlbum from './components/SearchAlbum';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/1' element={<Test/>}/>
      <Route path='/search/albums' element={<SearchAlbum />} />
      <Route path='/search/albums/results/:q' element={<AlbumResults />} />

      </Routes>
    </div>
  );
}

export default App;
