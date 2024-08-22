// src/components/YouTubeSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const YouTubeSearch = () => {

  const [query, setQuery] = useState('');
  const [videoId, setVideoId] = useState('');

  const searchYouTube = async (e) => {
    e.preventDefault();
    const apiKey = 'AIzaSyASCPnY42U8ZFm6jFsW9hxQ8RtH8_ggY-o';
    const url = `/api/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.items.length > 0) {
        setVideoId(response.data.items[0].id.videoId);
      } else {
        alert('No videos found');
      }
    } catch (error) {
      console.error('Error fetching data from YouTube API', error);
    }
  };

  {videoId}

  return (
    <div>
      <form onSubmit={searchYouTube}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos"
        />
        <button type="submit">Search</button>
      </form>
      {videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default YouTubeSearch;
