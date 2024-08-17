const express=require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors=require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cheerio = require('cheerio');

const app=express();
const PORT=5000;

app.use(bodyParser.json());
app.use(cors());

const YOUTUBE_API_KEY = '';

// Proxy configuration (adjust port as needed)
app.use('/youtube', createProxyMiddleware({
  target: 'https://www.youtube.com',
  changeOrigin: true,
}));

// Your scraping logic using axios
app.get('/scrape', async (req, res) => { // Wrap in async function
  
  const searchTerm = req.query.q || 'study'; // Get search term from request
  const minDuration = req.query.duration || 300; // Get duration in seconds, default 300

  try {
    // Fetch YouTube search results
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        key: YOUTUBE_API_KEY,
        maxResults: 10,
      },
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    // Fetch video details using the YouTube Data API
    const detailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    // Extract relevant video data
    const videos = detailsResponse.data.items.map(item => {
      const duration = item.contentDetails.duration;
      const durationInSeconds = parseISO8601Duration(duration);

      return {
        title: item.snippet.title,
        link: `https://www.youtube.com/watch?v=${item.id}`,
        duration: durationInSeconds,
      };
    });

    // Filter videos based on duration
    const filteredVideos = videos.filter(video => video.duration >= minDuration);

    res.send(filteredVideos);
  } catch (error) {
    // Log specific parts of the error to avoid circular structure
    if (error.response) {
      console.error('Error response data:', error.response.data);
      res.status(500).send('Error fetching YouTube data');
    } else {
      console.error('Error message:', error.message);
      res.status(500).send('An unexpected error occurred');
    }
  }
   
});

function parseISO8601Duration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

app.get('/scrape1', async (req, res) => {
  const query = req.query.q || 'lambda'; // Get search term from request
  const duration = req.query.duration || 300; // Get duration in seconds, default 300

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: YOUTUBE_API_KEY,
        maxResults: 10,
      },
    });

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    console.log(videos);
    res.json(videos); // Return the videos to the client
  } catch (error) {
    console.error('Error fetching YouTube data:', error.response?.data || error.message);
    res.status(500).send('An error occurred while fetching YouTube data');
  }


});


app.post('/payment/request',async(req,res)=>{

    try {
       
        let response=await axios.post('https://secure-global.paytabs.com/payment/request',req.body,{
        headers:{
            authorization:'SKJ9TTHHWD-JJ9MGLHLZR-MGW9WG26LH',
            'content-type': 'application/json',
        }
       });
      
       res.status(200).json(response.data);

      } catch (error) {
       console.log(`error in payment processing is= `,error);
      }
    
    });


    app.get('/payment/callback', async (req, res) => {
        try {
          console.log(JSON.stringify(req.body, null, 2));
          res.status(200).send('Callback received successfully');
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      });

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})