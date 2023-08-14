import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {useDebounce} from '../../hooks/useDebounce'
import axios from '../../api/axios';
import './SearchPage.css';

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const useQuery = () => {
            return new URLSearchParams(useLocation().search);
        }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    // searchTerm 사용
    // useEffect(()=>{
    //     if(searchTerm){
    //         fetchSearchMovie(searchTerm);
    //     }
    // }, [searchTerm]);
    // const fetchSearchMovie = async (searchTerm) => {
    //     try {
    //         const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
    //         console.log(request);
    //         setSearchResults(request.data.results);
        
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };

    // useEffect(()=>{
    //     if(searchTerm){
    //         fetchSearchMovie(searchTerm);
    //     }
    // }, [searchTerm]);

    // debounceSearchTerm 사용
    useEffect(()=>{
        if(debounceSearchTerm){
            fetchSearchMovie(debounceSearchTerm);
            console.log(debounceSearchTerm);
        }
    }, [debounceSearchTerm]);

    const fetchSearchMovie = async (debounceSearchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${debounceSearchTerm}`);
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    };


    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie)=>{
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path;
                        return(
                            <div className='moive' key={movie.id}>
                                <div onClick={()=>{
                                    navigate(`/${movie.id}`)
                                }} className='movie__column-poster'>
                                    <img src={movieImageUrl} alt='moive' className='movie__poster'/>
                                </div>
                            </div>
                        )
                    }
                })

                }
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찾고자하는 검색어 "{debounceSearchTerm}"에 맞느 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    };

    return renderSearchResults();
}
