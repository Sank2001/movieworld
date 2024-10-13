import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); // Get the movie ID from the route parameters
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    title: '',
    key: '',
    release_date: '',
    original_language: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTU4NzJlNzEwM2QyYWUxNDc5Yzc2YmQyMDk5MTMyZiIsIm5iZiI6MTcyMjk1NDI3Ny44NDk1MzMsInN1YiI6IjY2YWRkZTdlNWRkY2ZiM2Y3NTAxNDI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IpPnTblhi7hpEzdCg-vWqj4NLr5i1gnafbcLomuSeHg',
    },
  };

  useEffect(() => {
    // Fetch movie details and trailer using the movie ID
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(response => response.json())
      .then(movieResponse => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
          .then(videoResponse => videoResponse.json())
          .then(videoResponse => {
            const videoKey = videoResponse.results.length > 0 ? videoResponse.results[0].key : '';
            setApiData({
              title: movieResponse.title,
              key: videoKey,
              release_date: movieResponse.release_date,
              original_language: movieResponse.original_language,
            });
          })
          .catch(err => console.error('Video Fetch Error:', err));
      })
      .catch(err => console.error('API Fetch Error:', err));
  }, [id]); // Add id as a dependency to re-fetch data when the id changes

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-1); }} />
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.release_date}</p>
        <p>{apiData.title}</p>
        <p>{apiData.original_language}</p>
      </div>
    </div>
  );
};

export default Player;
 