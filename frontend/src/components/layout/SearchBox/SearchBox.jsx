import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import './searchBox.css'

const SearchBox = () => {
    const [keyword, setKeyword] = useState("")
    let navigate = useNavigate()
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate('/products')
        }
    };
  return (

    <form onSubmit={searchSubmitHandler}>
    <div className="searchBox">
      <input
        className="searchTxt" style={{background: 'transparent'}}
        type="text"
        name=""
        placeholder="Type to search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <label className="searchBtn" >
      <input type="submit" /><BiSearchAlt />
      </label>
      
    </div>
    </form>  
  );
};

export default SearchBox;
