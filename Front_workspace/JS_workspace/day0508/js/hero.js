    //주인공을 정의한다.
    class Hero{
        constructor(container,x,y,width,height,velX,velY){
            //ES6의 클래스는 멤버변수를 생성자 안에 둬야 한다.
            //외부에서 전달된 데이터를 나의 객체에 보관하는 기법을 injection이라고 한다.
            this.img = document.createElement("img");
            this.container = container;
            this.x = x ; 
            this.y = y;
            this.width = width;
            this.height = height;
            this.velX = velX;
            this.velY = velY;
            this.n = 1; //img배열의 index를 결정짓는 변수
            
            this.imgArr =[];
            for(let i = 1; i <= 18; i++){
                this.imgArr.push(`../../../image/warrior/image${i}.png`);
            }
            //스타일 시작
            this.img.src = "../../../image/warrior/image1.png";
            this.img.style.width = this.width + "px"; 
            this.img.style.height = this.height + "px";
            this.img.style.left = x + "px";
            this.img.style.top = y + "px";
            this.img.style.position = "absolute";

            this.container.appendChild(this.img); //컨테이너에 부착 
            //움직이기 시작
            this.idle();
        }

        //주인공 펄럭임 동작
        //게임루프 상관없이 자체적으로 끝없는 루프로 움직임 표현
        idle(){
            this.n++;
            this.img.src = this.imgArr[this.n];
            if(this.n >= 17) this.n = 1; //이미지가 끝에 도달하면 다시n을 초기화시킨다.
            setTimeout(()=>{
                //화살표 함수는 this를 가질 수 없으므로, this는 상위 scope를 나타낸다.
            this.idle();}
            ,100);
        }

        //전방향 움직임
        move(){
            this.x += this.velX; //물리적 변화량을 의미한다. 
            this.y += this.velY; //물리적 변화량을 의미한다.

            this.img.style.left = this.x + "px"; //변화된 물리량을 화면에 반영(rendering)
            this.img.style.top  =this.y + "px"; //변화된 물리량을 화면에 반영


        }
        
        
    }