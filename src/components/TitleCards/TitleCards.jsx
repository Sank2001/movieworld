import React, { useState, useEffect, useRef } from 'react';
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'


const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTU4NzJlNzEwM2QyYWUxNDc5Yzc2YmQyMDk5MTMyZiIsIm5iZiI6MTcyMzIxNDE5OS44MzUzOTcsInN1YiI6IjY2YWRkZTdlNWRkY2ZiM2Y3NTAxNDI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qxx-Sh__zQvdf2uCILn14tlq9mAk2HmM6E_ngmTL3ns'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  console.log("Ajeet")
  

  useEffect(() => {
    // Fetch API data
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    // Add event listener
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    // Cleanup event listener on unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);
  console.log("apiData=>",apiData)

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img 
              src={card.backdrop_path ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}` : 'path/to/placeholder/image.jpg'} 
              alt={card.original_title || 'Movie Image'} 
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
