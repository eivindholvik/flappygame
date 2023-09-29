class MapObject {
  findAnimationFrame = undefined;
  animationFrame = 0;
  animationCounter = {
    counter: 0,
    limit: 10
  }
  constructor(size, spriteNames, pos = [-size[0], -size[1]], dPos = [0, 0], animationLimit = 10) {
    this.size = size;
    this._pos = [...pos];
    this._dPos = [...dPos];
    this.animationCounter.limit = animationLimit;
    if (Array.isArray(spriteNames)) {
      this.findAnimationFrame = [-1, 0];
      this.spriteNames = [...spriteNames];
    } else {
      this.spriteNames = [spriteNames];
    }
  }

  updatePos() {
    this._pos[0] += this._dPos[0];
    this._pos[1] += this._dPos[1];
  }

  get pos() {
    return [...this._pos];
  }

  get dPos() {
    return [...this._dPos];
  }

  set pos(pos) {
    this.pos = [...pos];
  }
  set dPos(dPos) {
    this.dPos = [...dPos];
  }
  setAnimationFrame() {
    if (this.animationCounter.counter > this.animationCounter.limit) return;
    if (this.findAnimationFrame) {
      this.animationFrame = this.findAnimationFrame[1];
      if (this.findAnimationFrame[1] === 0 || this.findAnimationFrame[1] === this.spriteNames.length - 1) {
        this.findAnimationFrame = [this.findAnimationFrame[1], this.findAnimationFrame[0]];
      } else if (this.findAnimationFrame[0] < this.findAnimationFrame[1]) {
        this.findAnimationFrame = [this.findAnimationFrame[1], this.findAnimationFrame[1] + 1];
      } else {
        this.findAnimationFrame = [this.findAnimationFrame[1], this.findAnimationFrame[1] - 1];
      }
    }
  }

  get animationFrame() {
    this.setAnimationFrame();
    return this.animationFrame;
  }
}

const gameLogic = {
  jumpConst: 20,
  canvasSize: [420, 640],
  startPosition: [(canvasSize[1] - base.height) / 2, canvasSize[0] / 5],

}

class Bird extends MapObject {
  constructor(size, spriteNames, pos = [-size[0], -size[1]], dPos = [0, 0]) {
    super(size, spriteNames, pos, dPos);
    this._overEnemy = false;
    this._alive = true;
  }
}