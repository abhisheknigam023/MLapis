var ffmpeg = require('fluent-ffmpeg');
/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)        
 */
function convert(input, output, callback) {
    var input = '/home/abhishek/Desktop/video_store/English Video Downloaded.mp4';
    var output = '/home/abhishek/Desktop/video_store/English Video Downloaded.wav';
    ffmpeg(input)
        .output(output)
        .on('end', function() {                    
            console.log('conversion ended');
            callback(null);
        }).on('error', function(err){
            console.log('error: ', err, err.code, err.msg);
            callback(err);
        }).run();
}

convert('./df.mp4', './output.wav', function(err){
   if(!err) {
       console.log('conversion complete');
       //...

   }
});


(function() {
    "use strict";
    
    // pull in the required packages.
    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var fs = require("fs");
    
    var settings = require("./settings");
    var speech = require("./speech");
    var intent = require("./intent");
    var translate = require("./translation");

    function openPushStream(filename) {
        // create the push stream we need for the speech sdk.
        var pushStream = sdk.AudioInputStream.createPushStream();
    
        // open the file and push it to the push stream.
        fs.createReadStream(filename).on('data', function(arrayBuffer) {
            pushStream.write(arrayBuffer.buffer);
        }).on('end', function() {
            pushStream.close();
        });
    
        return pushStream;
    }
    
    if (process.argv.length > 3) {
        settings.filename = process.argv[3];
    }
    
    if (process.argv.length >= 2) {
        switch (process.argv[1]) {
            case "intent":
                console.log("Now recognizing intent from: " + settings.filename);
                intent.main(settings, openPushStream(settings.filename));
                break;
    
            case "translate":
                console.log("Now translating from: " + settings.filename);
                translate.main(settings, openPushStream(settings.filename));
                break;
    
            case "speech":
            default:
                console.log("Now recognizing speech from: " + settings.filename);
                speech.main(settings, openPushStream(settings.filename));
                break;
        }
    }
    else {
        console.log("usage: index.js [speech|intent|translate] {filename}");
    }
}());