function getRandom(n) {
    //원하는 정수를 반환받기 위해서는 n값을 호출시 결정하자.
    //예) getRandom(1001)이 나오게 해야한다.


    //0 보다 크고 11보다 작은 난수이다. 
    return parseInt(Math.random() * (n + 1));
}

/* -------------------------
한자리수 정수에 대한 0처리
----------------------------*/
function zeroString(n) {
    //만일 n이 한자리 수이면. 앞에 '0'을 붙여주자
    let str = n;
    if (n < 11 && n > 0) {
        str = "0" + n;
    }
    else {
        str;
    }


    return str;
}


/*=======================
    해당월의 시작 요일 구하기
    API 사용 예시 ) 2025 5월 getStartDay(2025,4)
    결과 : 요일이 나온다.
    =========================*/
function getStartDay(yy, mm) {
    let d = new Date(yy, mm, 1); //2025년 5월 1일
    return d.getDay();
}

/*====================
영어 또는 한국어로 요일을 변환하여 반환하기
ex_ convertDay(2,"eng"/"kor") -> 반환
=======================*/
function convertDay(n, lang) {
    let korWeekArr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let EngWeekArr = ["Sunday", "Monday", "Tuesday", "wednesday", "Tursday", "Friday", "saturday"];

    let day;
    if (lang == "kor") {
        day = korWeekArr[n];
    }
    else if (lang == "eng") {
        day = EngWeekArr[n];
    }

    return day;
}
/*=======================================
해당 월의 마지막 날 구하기
API 사용 예) convertDate(원하는 연도, 원하는 월)
=========================================*/
function getLastDate(yy,mm){
    let d= new Date(yy,mm,0);
    return d.getDate();
}


