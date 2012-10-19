// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This is a sample app to show others how to use our push messaging service.
// As such, we should ensure this is the highest quality code we can write
// in anticipation of it getting cut and pasted into the actual apps using
// push messaging.

// when the html page is loaded, fetch the channel id so we can display it
// in this case, it is only used to display to the user so the user can
// cut and paste it to their server app.  In a real app, we would have
// instead sent the channel id to the server in onInstalled.
window.onload = fetchChannelId;

// Get the channel ID for display to the user
function fetchChannelId() {
  // get the channel ID and log it
  chrome.pushMessaging.getChannelId(channelIdCallback);
  console.log("fetchChannelId returned.  Awaiting callback...");
}

// When the channel ID callback is available, this callback recieves it.
function channelIdCallback(message) {
  console.log("Push Sample Channel ID callback seen, channel Id is " + message.channelId);
  channel_id = message.channelId;

  showChannelId(channel_id);
}

// Pop up when the icon is clicked to show the channel ID that is registered
function showChannelId(channelId) {

  var break_node = document.createElement("br");
  document.body.appendChild(break_node);

  // display the channel ID if we have one
  var channel_id_node = document.createElement("p");
  channel_id_node.textContent = "channel_id is " + channelId;
  document.body.appendChild(channel_id_node);
  document.body.appendChild(break_node);
}
