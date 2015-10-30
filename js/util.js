var SoundLoadException = function(path) {
  this.path = path;
  this.message = "Can not load sound from this path: ";
  this.name = "SoundLoadException";
  this.toString = function() {
    return this.message + this.path;
  }
}

SoundLoadException.prototype = Error.prototype;

var XHRGetBuffer = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    callback(request.response);
  };
  request.onerror = function() {
    throw new SoundLoadException(url);
  };
  request.send();
};


var WebAudioAPIException = function() {
  this.message = "Web Audio API is not supported in this browser";
  this.name = "WebAudioAPIException";
  this.toString = function() {
    return this.message;
  };
};

WebAudioAPIException.prototype = Error.prototype;

var getAudioContext = function() {
  var context = null;
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    return context;
  }
  catch (e) {
    throw new WebAudioAPIException();
  }
}
