var BufferLoader = function(context, xhr) {
  this.context = context;
  this.xhr = xhr;
  this.caches = {};
  this.count = 0;
};

BufferLoader.prototype.load = function(url, callback) {
  if (this.caches[url]){
    callback(url);
  }
  else {
    var loader = this;
    this.xhr(url, function(response) {
      loader.context.decodeAudioData(response,
        function(buffer) {
          loader.caches[url] = buffer;
          loader.count++;
          callback(url);
        },
        function() {
          throw new BufferDecodeException();
        });
    });
  }
};


var BufferDecodeException = function(path) {
  this.path = path;
  this.message = "";
  this.name = "BufferDecodeException";
  this.toString = function() {
    return this.message + this.path;
  }
}
BufferDecodeException.prototype = Error.prototype;
