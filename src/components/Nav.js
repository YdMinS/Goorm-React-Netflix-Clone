import React, {useEffect, useState} from 'react';
import "./Nav.css";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 50){
                setShow(true);
            } else{
                setShow(false);
            }
        });
        return () =>{
            window.removeEventListener("scroll", ()=>{});
        };
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img
            alt='Neflix logo'
            src='https://cdn.icon-icons.com/icons2/2699/PNG/256/netflix_official_logo_icon_168085.png'
            className='nav__logo'
            onClick={()=>window.location.reload()}
        />
        <input value={searchValue} onChange={handleChange} className='nav__input' type='text' placeholder='영화를 검색하세요.'/>
        <img
            alt="User logged"
            src="https://cdn.icon-icons.com/icons2/1780/PNG/64/v-avatar_114344.png"
            className='nav__avatar'    
        />
   </nav>)
}