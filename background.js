// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This is a sample app to show others how to use our push messaging service.
// As such, we should ensure this is the highest quality code we can write
// in anticipation of it getting cut and pasted into the actual apps using
// push messaging.

// this function gets called in the packaged app model on launch
chrome.app.runtime.onLaunched.addListener(function() {
  // stuff to do when the app is launched
  console.log("Push Messaging Sample Client Launched!");

  // normally we wouldn't do this, but this lets you get the channel ID every
  // time the app starts.
  firstTimePushSetup();

  // do the normal setup steps every time the app starts, listen for events
  setupPush();

  // pretend we just got a message
  showPushMessage("no payload yet", 8);
});

// this function gets called in the packaged app model on install
chrome.runtime.onInstalled.addListener(function() {
  // stuff to do when the app is installed
  firstTimePushSetup();
  console.log("Push Messaging Sample Client installed!");
});

// this function gets called in the packaged app model on shutdown
chrome.runtime.onSuspend.addListener(function() {
  // stuff to do when the app shuts down - nothing
  console.log("Push Messaging Sample Client shutting down");
});

// This should only be called once on the instance of chrome where the app
// is first installed for this user.  It need not be called every time the
// Push Messaging Client App starts.
function firstTimePushSetup() {
  // get the channel ID and log it
  chrome.pushMessaging.getChannelId(channelIdCallback);
  console.log("getChannelId returned.  Awaiting callback...");
}

// Register for push messages.
// This should be called every time the Push Messaging App starts up.
function setupPush() {

  // make sure that the API seems to exist before calling it
  if (typeof(chrome.pushMessaging) == "undefined")
    console.log("chrome.pushMessaging is undefined");

  // call a method on the new API
  //console.log('about to call addListener');
  chrome.pushMessaging.onMessage.addListener(messageCallback);
  console.log('called addListener');

  // see if adding the listener took effect
  var listeners = chrome.pushMessaging.onMessage.hasListeners();
  console.log('hasListeners returned ' + listeners +
              ' after calling addListener');
}

// Unregister for push messages (only call if you have previously
// called setupPush).
function takedownPush() {
  chrome.pushMessaging.onMessage.removeListener(messageCallback);
  console.log('called removeListener');
}

// This callback recieves the pushed message from the push server.
function messageCallback(message) {
  console.log("push messaging callback seen");
  console.log("payload is "                 + message.payload);
  console.log("subChannel is "              + message.subchannelId);

  // This sample app will popup a window when it gets a push message.
  // Your app should instead take whatever action it does when a push message
  // arrives.
  showPushMessage(message.payload, message.subchannelId.toString());
}

// When the channel ID callback is available, this callback recieves it.
// The push client app should communicate this to the push server app as
// the 'address' of this user and this app (on all instances of Chrome).
function channelIdCallback(message) {
  console.log("Background Channel ID callback seen, channel Id is " + message.channelId);

  // TODO: This is where your application should send the channel id to
  // your own push messaging server, which will use the channel id for
  // routing through the push servers at Google to deliver the push message.

  // display the channel ID in a HTML window
  chrome.app.window.create('PushSample.html');
}

// When a push message arrives, show it as a text notification (toast)
function showPushMessage(payload, subChannel) {
  var notification = window.webkitNotifications.createNotification(
      'icon.png', 'Push Message',
      "Push message for you sir! " +
      payload +" [" + subChannel + "]");
  notification.show();
}
