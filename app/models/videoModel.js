const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    'title': {
        'type': String,
        'required': false
    },
    'videoUrl': {
        'type': String,
        'required': false
    },
    'description': {
        'type': String,
        'required': false
    }
}, {
    'collection': 'Video',
    'versionKey': false
});

module.exports = mongoose.model('Video', videoSchema);