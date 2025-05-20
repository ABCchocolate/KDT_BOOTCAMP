class Cell {
    constructor(container, x, y, width, height, bg, borderColor, date) {

        //[다이어리 관련 내용 보관 능력]
        //년, 월, 일 보관 해야함
        this.year;
        this.month;
        this.date = date;
        this.icon;

        //[Ui 관련 내용]
        this.container = container;
        this.div = document.createElement("div");
        this.numDiv = document.createElement("div"); //달력 날짜 출력할 영역
        this.titleDiv = document.createElement("div"); //다이어리의 제목
        this.iconDiv = document.createElement("div"); //아이콘이 위치할 영역
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bg = bg;
        this.borderColor = borderColor;

        //Cell div조립하기~ :3
        this.div.style.position = "absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.background = this.bg;

        // 오른쪽, 아래쪽만 적용 (겹치지 않음)
        this.div.style.border = `1px solid ${this.borderColor}`;
        this.div.style.borderRadius = 5 + "px";

        //border,margin,padding에 의한 박스의 크기가 바깥쪽으로 늘어나지 않게 해준다.
        this.div.style.boxSizing = "border-box";

        // 마우스 오버 시 색상 변화
        this.div.addEventListener("mouseenter", () => {
            this.div.style.background = "#f0f0f0";
        });

        // 마우스가 벗어나면 원래 배경색으로
        this.div.addEventListener("mouseleave", () => {
            this.div.style.background = this.bg;
        });


        //날짜 출력 div만들기
        this.numDiv.style.width = 100 + "%";
        this.numDiv.style.height = 25 + "px";
        this.numDiv.style.textAlign = "right";
        this.numDiv.style.paddingRight = "0px 5px 0px 0px"; //top-right-bottom-left
        this.numDiv.style.boxSizing = "border-box";


        // this.numDiv.style.background = "gray" //나중에 주석으로 막을 예정.. 확인용


        //다이어리 제목 div style
        this.titleDiv.style.width = 100 + "%";
        this.titleDiv.style.height = 25 + "px";
        // this.titleDiv.style.background = "pink";

        //다이어리 아이콘 div style
        this.iconDiv.style.width = 100 + "%";
        this.iconDiv.style.height = 50 + "px";
        // this.iconDiv.style.background = "yellow";

        //cell에 3층 div각각 부착한다.
        this.div.appendChild(this.numDiv);
        this.div.appendChild(this.titleDiv);
        this.div.appendChild(this.iconDiv);

        //cell자체를 container에 부착한다.
        this.container.appendChild(this.div);

        //Cell선택 시 html의 dialog를 열어야함
        //현재 이 Cell에 클릭 이벤트 부여

        //화살표함수는 this를 가질 수 없다. 바깥쪽 상위 스코프인 객체를 가르키기 위해서는
        //화살표 함수를 사용해야한다.
        this.div.addEventListener('click', () => {
            const match = diaryArray.find(diary =>
                diary.year === this.year &&
                diary.month === this.month &&
                diary.date === this.date
            );

            if (match) {
                showViewDialog(this, match); // 보기 모드
            } else {
                openDialog(this); // 등록 모드
            }
        });


    }

    //Cell에 보여질 날짜를 수시로 변경해야 하므로, 메서드의 대상이 될 수 있다.
    setDate(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;

        //랜더링 처리
        this.numDiv.innerText = date;
    }

    renderIcon(src, width) {//어떤 이미지를 원하는지 호출자가 정하게 한다.
        this.icon = document.createElement("img");
        this.icon.src = src;

        //이미지의 크기 조절
        this.icon.style.width = width + "px";

        this.icon.style.objectFit = "contain";
        this.iconDiv.appendChild(this.icon);
    }

    

}