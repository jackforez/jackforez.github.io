var login = document.getElementById('in'),
main = document.getElementById('main'),
logout = document.getElementById('out'),
play = document.getElementById('play'),
again = document.getElementById('again');

var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');
var balls=[],_R=15,_N = 1,_C=0,_W=false,_S = 1000,_V=0.025,_SC=0,_T,batdaudem = false,tick_toc = 59,_P = false,tt;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
play.addEventListener('click',start);
again.addEventListener('click',start);
canvas.addEventListener('mousedown',function(e){
let x = e.clientX, y = e.clientY;
for(var i =0;i<balls.length;i++){
    if(balls[i].dist(x,y)<balls[i].r*1.5 && balls[i].v>0){
        let v = balls[i].v;
        balls[i].v =0;
        _SC+=10;
        _C++;
        if(_C==_N){
            _W = true;
            batdaudem = false;
            setTimeout(function(){
                _N++;
                if(_S>50){
                    _S-=50;
                }
                if(_V<1){
                    _V+=0.025;
                }
                init();
            },1000);
        }
        else{
            batdaudem = true;
//                for(var j =0;j<balls.length;j++){
//                    if(j!=i && balls[j].v >0 && balls[j].v<=1){
//                        balls[j].v+=v;
//                    }
//                }
        }
    }
}
});
//------------------
canvas.addEventListener('touchend',function(event){
    let touches = event.changedTouches[0];
    let x = touches.clientX, y = touches.clientY;
    for(var i =0;i<balls.length;i++){
        if(balls[i].dist(x,y)<balls[i].r*1.5 && balls[i].v>0){
            let v = balls[i].v;
            balls[i].v =0;
            _SC+=10;
            _C++;
            if(_C==_N){
                _W = true;
                batdaudem = false;
                setTimeout(function(){
                    _N++;
                    if(_S>50){
                        _S-=50;
                    }
                    if(_V<1){
                        _V+=0.025;
                    }
                    init();
                },1000);
            }
            else{
                batdaudem = true;
    //                for(var j =0;j<balls.length;j++){
    //                    if(j!=i && balls[j].v >0 && balls[j].v<=1){
    //                        balls[j].v+=v;
    //                    }
    //                }
            }
        }
    }
    event.preventDefault();
});
   
//-----------------
function myrd(max,min = 0){
return Math.floor(Math.random()*(max-min)+min)
}
function myhsl(){
return 'hsl('+myrd(360)+',100%,50%)';
}
function myhsla(f){
return 'hsl('+myrd(360)+',100%,50%,'+f+')';
}
function init(){
balls = [];
_V=0.025;_C=0;_W=false;tick_toc = 59;batdaudem = false;
_T = 1+Math.floor(_N*0.5);  
for(var i =0;i<_N;i++){
    balls.push(new myBall(myrd(canvas.width),myrd(canvas.height),0,myhsl(),_V));
}
}
function myBall(x,y,r,c,v){
this.x = x;
this.y = y;
this.c = c;
this.r = r;
this.tox = -1;
this.toy = -1;
this.v = v;
this.show = function(){
context.strokeStyle = '#3b3b3b';
context.fillStyle = this.c;
context.beginPath();
context.arc(this.x,this.y,this.r,0,2*Math.PI);
context.fill();
context.lineWidth = 2;
context.stroke();
};
this.to = function(){
this.x = (this.tox - this.x)*this.v + this.x;
this.y = (this.toy - this.y)*this.v + this.y;
};
this.settoXY = function(x_,y_){
this.tox = x_;
this.toy = y_;
};
this.dist = function(x_,y_){
 return Math.sqrt(Math.pow((this.x-x_),2)+Math.pow((this.y-y_),2));
};
};
function start(){
_P = true;
_N =1;_SC = 0;
login.style.display = 'none';
main.style.display = "block";
logout.style.display = "none";
init(); 
update();
}
function update(){
context.clearRect(0,0,canvas.width,canvas.height);
context.textAlign="center";  
if(_P){
context.font = "30px Baloo";
context.fillStyle = 'green';
context.fillText(_SC,50,40);
if(batdaudem){
  tick_toc--;
    if(tick_toc==0){
      _T--;
      tick_toc=59;
      if(_T<0){
        _T = 0;
        tick_toc=0;
        _P = false;
      }
    }
  context.fillStyle = 'red' ;
  context.fillText(_T+":"+tick_toc,canvas.width-100,40);
} 
for(var i=0 ;i<balls.length;i++){
  if(_W && balls[i].r>0){
      balls[i].r --;
  }
  if(!_W &&balls[i].r<_R){
    balls[i].r ++;
  }
  balls[i].show();
  if(balls[i].tox > 0){
    balls[i].to();
  }
}
tt = requestAnimationFrame(update); 

}else{
cancelAnimationFrame(tt);
logout.style.display="block";
main.style.display = "none";
} 
}
setInterval(function(){
for(var i =0 ; i< balls.length;i++){
balls[i].settoXY(
  myrd(canvas.width),
  myrd(canvas.height)
);
}
},_S);
