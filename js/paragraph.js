var Paragraph = function(elem) {
  this.elem = elem;
  this.mask = elem.parentNode;
  this.maskShadowSpread = this.mask.clientHeight * 0.17;
  this.y = window.innerHeight;
  this.height = this.elem.clientHeight;
  this.acc = 0;
  this.vel = 0;
  this.fric = 0.9;
  this.isDragging = false;
  this.dragY = 0;
  paragraph = this;
  var xform = 'transform';
  ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
      var e = prefix + 'Transform';
      if (typeof elem.style[e] !== 'undefined') {
          paragraph.xform = e;
          return false;
      }
      return true;
  });
};

Paragraph.prototype.applyDragForce = function() {
  if (!this.isDragging) {
    return;
  }
  var dragVel = this.dragY - this.y;
  var dragForce = dragVel - this.vel;
  this.applyForce(dragForce);
};

Paragraph.prototype.applyForce = function(f) {
  this.acc += f;
};

Paragraph.prototype.checkEdges = function() {
  if (this.y > window.innerHeight) {
    this.y = window.innerHeight;
  }
  else if (this.y < this.mask.clientHeight - this.height - this.maskShadowSpread) {
    this.y = this.mask.clientHeight - this.height - this.maskShadowSpread;
  }
};

Paragraph.prototype.update = function() {
  this.vel += this.acc;
  this.vel *= this.fric;
  this.y += this.vel;
  this.acc = 0;
};

Paragraph.prototype.render = function() {
  this.elem.style[this.xform] = "translateY(" + this.y + "px)";
};
