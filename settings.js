// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

(function() {
"use strict";
  
  module.exports = {
  
    // Replace with your own subscription key, service region (e.g., "westus"),
    // and recognition language.
    subscriptionKey:   "c56746d7266e437390290eb6ba6a22bf",
    serviceRegion:     "westus", // e.g., "westus"
    language:          "en-US",
  
    // Replace with the full path to a wav file you want to recognize.
    filename: "/home/abhishek/Desktop/video_store/English Video Downloaded.wav", // 16000 Hz, Mono
  
    // Replace with your own Language Understanding subscription key (endpoint
    // key), region, and app ID in case you want to run the intent sample.
    luSubscriptionKey: "YourLanguageUnderstandingSubscriptionKey",
    luServiceRegion:   "YourLanguageUnderstandingServiceRegion",
    luAppId:           "YourLanguageUnderstandingAppId",
  };
  }());
