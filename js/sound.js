var Sound = function(context, buffer) {
  this.context = context;
  this.buffer = buffer;
  this.playing = false;
};

Sound.prototype.toggle = function() {
  this.playing ? this.pause() : this.play();
};

Sound.prototype.play = function() {
  this.source = this.context.createBufferSource();
  this.source.buffer = this.buffer;
  this.source.connect(this.context.destination);
  this.source.loop = true;
  this.source.start(0);
  this.playing = true;
};

Sound.prototype.pause = function() {
  if (!this.source) {
    throw new Error("Can not call 'pause' without call 'play'");
  }
  this.source.stop(0);
  this.playing = false;
};
