import {Routes, Route, Navigate} from 'react-router-dom';
import AlbumResults from './components/AlbumResults';
import Home from './components/Home';
import AlbumForm from './components/AlbumForm';
import Login from './components/Login';
import Test from  './components/Test'
import Register from './components/Register';
import ArtistForm from './components/ArtistForm';
import ArtistResults from './components/ArtistResults';
import DisplayAlbum from './components/DisplayAlbum';
import DisplayArtist from './components/DisplayArtist';
import EditProfile from './components/EditProfile';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
      
      <Route path='/' element={<Home/>}/>
      
      <Route path='/login' element={<Login/>}/>

      <Route path='/register' element={<Register/>}/>

      <Route path='/1' element={<Test/>}/>
      
      <Route path='/search/albums' element={<AlbumForm />} />
      
      <Route path='/search/albums/results/:q' element={<AlbumResults />} />

      <Route path='/search/artists' element={<ArtistForm />} />

      <Route path='/search/artists/results/:q' element={<ArtistResults />} />

      <Route path='/album/:id' element={<DisplayAlbum />} />
      
      <Route path='/artist/:id' element={<DisplayArtist />} />

      <Route path='/profile/:id' element={<UserProfile />} />

      <Route path='/edit/profile/' element={<EditProfile />} />

      <Route path='*' element={<Navigate to='/' />} />
      
      </Routes>
    </div>
  );
}

export default App;
