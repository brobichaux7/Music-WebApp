import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SearchAlbum = () => {
  
    const [searchItem, setSearchItem] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate("/search/albums/results/" + searchItem)
    }

    return (
    <div>
        <form onSubmit={onSubmitHandler}>
            <input type="text" onChange={e => setSearchItem(e.target.value)}/>
            <button>Search</button>
        </form>
    </div>
  )
}

export default SearchAlbum