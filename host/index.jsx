/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

app.enableQE();

function hello() {
	return "Hello from index.jsx";
}

function getSelectedClipPath() {
    if (app.project && app.project.activeSequence) {
        var seq = app.project.activeSequence;
        // Check all video tracks for selected clips
        for (var i = 0; i < seq.videoTracks.numTracks; i++) {
            var track = seq.videoTracks[i];
            for (var j = 0; j < track.clips.numItems; j++) {
                var clip = track.clips[j];
                if (clip.isSelected()) {
                    var projectItem = clip.projectItem;
                    if (projectItem) {
                        return projectItem.getMediaPath();
                    }
                }
            }
        }
        // Check all audio tracks for selected clips
        for (var i = 0; i < seq.audioTracks.numTracks; i++) {
            var track = seq.audioTracks[i];
            for (var j = 0; j < track.clips.numItems; j++) {
                var clip = track.clips[j];
                if (clip.isSelected()) {
                    var projectItem = clip.projectItem;
                    if (projectItem) {
                        return projectItem.getMediaPath();
                    }
                }
            }
        }
        return "No selected clip found.";
    }
    return "No active sequence.";
}

function getTimelineClipNames() {
    if (app.project && app.project.activeSequence) {
        var seq = app.project.activeSequence;
        var trackCount = seq.videoTracks.numTracks;
        var clipNames = [];
        for (var i = 0; i < trackCount; i++) {
            var track = seq.videoTracks[i];
            for (var j = 0; j < track.clips.numItems; j++) {
                var clip = track.clips[j];
                clipNames.push(clip.name);
            }
        }
        return clipNames.join(', ');
    } else {
        return "No active sequence.";
    }
}

function testCall(arg) {
    alert("testCall called with: " + arg);
}

function splitSelectedClipAtTimes(splitTimes) {
	// alert("splitSelectedClipAtTimes called! arg: " + splitTimes);
	// $.writeln("splitSelectedClipAtTimes called! arg: " + splitTimes);
    // if (typeof splitTimes === "string") {
	// 	alert("splitTimes is a string");
    //     splitTimes = JSON.parse(splitTimes);
    // }
	// alert("app.project: ", app.project);
	// alert("app.project.activeSequence: ", app.project.activeSequence);
	try {
		for (var k = 0; k < splitTimes.length; k++) {
			var splitTime = splitTimes[k];
			alert("splitTime: " + splitTime);
			var sqe = qe.project.getActiveSequence();
			var hours = Math.floor(splitTime / 3600);
			var minutes = Math.floor((splitTime - (hours * 3600)) / 60);
			var seconds = Math.floor(splitTime - (hours * 3600) - (minutes * 60));
			var frames = Math.floor((splitTime - Math.floor(splitTime)) * 24); // Assuming 24 fps
			var timecodeString = padNumber(hours, 2) + ":" + padNumber(minutes, 2) + ":" + padNumber(seconds, 2) + ":" + padNumber(frames, 2);
			alert("hours: " + hours + ", minutes: " + minutes + ", seconds: " + seconds + ", frames: " + frames);
			alert("timecodeString: " + timecodeString);
			// Apply the cut to all video tracks
			for (var i = 0; i < sqe.numVideoTracks; i++) {
			var videoTrack = sqe.getVideoTrackAt(i);
				videoTrack.razor(timecodeString, true);
			}

			for (var i = 0; i < sqe.numAudioTracks; i++) {
				var audioTrack = sqe.getAudioTrackAt(i);
				audioTrack.razor(timecodeString, true);
			}
		}

		return "split times: " + splitTimes;
		// if (app.project && app.project.activeSequence) {
		// 	var seq = app.project.activeSequence;
		// 	for (var i = 0; i < seq.videoTracks.numTracks; i++) {
		// 		var track = seq.videoTracks[i];
		// 		for (var j = 0; j < track.clips.numItems; j++) {
		// 			var clip = track.clips[j];
		// 			if (clip.isSelected()) {
		// 				for (var k = 0; k < splitTimes.length; k++) {
		// 					var splitTime = splitTimes[k];
		// 					// Convert timecode to a string in HH:MM:SS:FF format
		// 					var timecodeString = timecodeInSecondsToTimecodeString(splitTime);
		// 					seq.razor(timecodeString, true);
		// 					// Convert seconds to ticks (Premiere uses 254016000000 ticks per second)
		// 					var ticks = splitTime * 254016000000;
		// 					// clip.split(ticks);
		// 					alert("splitTime: " + splitTime + ", ticks: " + ticks + ", type: " + typeof ticks);
		// 					// var timeObj = new Time();
		// 					// timeObj.seconds = splitTime;
		// 					// seq.setPlayerPosition(508032000000); // 2 seconds
		// 					// seq.setPlayerPosition(ticks);
		// 					// seq.setPlayerPosition(splitTime);
		// 				}
		// 			}
		// 		}
		// 	}

		// 	return "split times: " + splitTimes;
		// }
		// if (app.project && app.project.activeSequence) {
		// 	alert("splitSelectedClipAtTimes: ", splitTimes);
		// 	alert("app.project: ", app.project);
		// 	alert("app.project.activeSequence: ", app.project.activeSequence);
		// 	var seq = app.project.activeSequence;
		// 	for (var i = 0; i < seq.videoTracks.numTracks; i++) {
		// 		var track = seq.videoTracks[i];
		// 		console.log("track: ", track);
		// 		for (var j = 0; j < track.clips.numItems; j++) {
		// 			var clip = track.clips[j];
		// 			console.log("clip: ", clip);
		// 			if (clip.isSelected()) {
		// 				console.log("clip is selected");
		// 				for (var k = 0; k < splitTimes.length; k++) {
		// 					console.log("splitTime: ", splitTimes[k]);
		// 					var splitTime = splitTimes[k];
		// 					// Convert seconds to ticks (Premiere uses 254016000000 ticks per second)
		// 					var ticks = splitTime * 254016000000;
		// 					clip.split(ticks);
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	} catch (e) {
		alert("Exception: " + e);
		$.writeln("Exception: " + e);
		return "Exception: " + e;
	}
}

// Function to convert seconds to HH:MM:SS:FF
// function timecodeInSecondsToTimecodeString(timecodeInSeconds) {
// 	var hours = Math.floor(timecodeInSeconds / 3600);
// 	var minutes = Math.floor((timecodeInSeconds % 3600) / 60);
// 	var seconds = Math.floor(timecodeInSeconds % 60);
// 	var frames = Math.floor((timecodeInSeconds * 25) % 25); // Assuming 25fps

// 	var paddedHours = padNumber(hours, 2);
// 	var paddedMinutes = padNumber(minutes, 2);
// 	var paddedSeconds = padNumber(seconds, 2);
// 	var paddedFrames = padNumber(frames, 2);

// 	return paddedHours + ":" + paddedMinutes + ":" + paddedSeconds + ":" + paddedFrames;
// }

// Function to pad a number with zeros
function padNumber(number, digits) {
	var numberString = number.toString();

	while (numberString.length < digits) {
		numberString = "0" + numberString;
	}

	return numberString;
}