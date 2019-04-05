const Video = require('./app/models/videoModel.js');
var fs = require('fs');
const _ = require('lodash');


exports.test = (req, res) => {
    res.status(200).send('Video Controller - Success');
};


// Retrieve and return all Videos from the database.
exports.get = function (req, res, next) {
    Video.find().
        populate().
        exec().
        then(function (videos) {
            res.json(videos);
        }, function (err) {
            next(err);
        });
};


// Find a Video with it's videoId
exports.getById = function (req, res, next) {
    Video.findById(req.params.videoId).
        populate().
        exec().
        then(function (videos) {
            res.json(videos);
        }, function (err) {
            next(err);
        });
};


// Create a new video
exports.post = function (req, res, next) {

// Read file with proper encoding...
function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('err: ', err);
        }
        console.log('DATA: ',data);
       
        Video.create(data).
        then(function (video) {
            res.json(video);
        }, function (err) {
            next(err);
        });

        callback(data);
    });
}

var output = read('/home/abhishek/Desktop/video_store/English Video Downloaded.txt', function(data) {
    console.log('data: ', data);
});

    
    // Video.create(newvideo).
    //     then(function (video) {
    //         res.json(video);
    //     }, function (err) {
    //         next(err);
    //     });
};



// // Delete a Video with the specified videoId in the request
// exports.deleteById = function (req, res, next) {
//     Video.findById(req.params.videoId).
//         deleteOne(function (err, removed) {
//             if (err) {
//                 next(err);
//             } else {
//                 res.json(removed);
//             }
//         });
// };


// Search Videos count
exports.searchVideosCount = function (req, res) {
    const filters = formatQueryFilters(req.params.video, req.body);
    Video.find(filters).countDocuments(function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
};


// // Search Videos without filters
exports.searchVideos = function (req, res) {
    const filters = formatQueryFilters(req.params.video, req.body);
    Video.find(filters).
        sort({
            'title': 1
        }).
        exec(function (err, videos) {
            if (!err) {
                res.json(videos);
            }
        });
};

