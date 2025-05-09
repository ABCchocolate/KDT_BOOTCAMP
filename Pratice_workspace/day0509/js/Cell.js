class Cell{
    constructor(container,width,height,bg,border,border_color,num){
        this.container = container;
        this.div = document.createElement("div");
        this.width =width;
        this.height = height;
        this.bg = bg;
        this.border = border;   
        this.border_color = border_color;

        //스타일 작성
        this.div.style.width = width;
        this.div.style.height = height;
        this.div.style.backgroundColor =bg;
        this.div.style.border= `${this.border}px bold ${this.border_color}`;
        this.div.style.display = "inline-block"
        this.div.innerText = this.num;
        
        //스타일 추가
        this.container.appendChild(this.div);
    }
}