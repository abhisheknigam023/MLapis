const express = require('express');
const router = express.Router();


const video = require('../controllers/videoController.js');

// -------------------------------------------------------------------------

// User routes:

// Create a new video
router.post('/videos', video.post);

// Retrieve all videos
router.get('/videos', video.get);

// Retreive videos count that are displayed
router.post('/videos/search/count/:video?', video.searchVideosCount);


// Retreive videos based on video name provided
router.post('/videos/search/:video?', video.searchVideos);

// Retrieve a single video with videoId
router.get('/videos/:videoId', video.getById);

// Delete a videos
router.delete('/videos', video.deleteById);

// ------------------------------------------------------------------------------


router.get('/test', video.test);

module.exports = router;