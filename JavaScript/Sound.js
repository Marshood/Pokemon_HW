
class GameSound{
    
    constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
      this.sound.play();
    }
    this.playLoop=function(){
        this.sound.loop = true;
        this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
    MuteSound()
  {
    this.sound.pause();  
  }

}