
/* -------------------------
한자리수 정수에 대한 0처리
----------------------------*/
function zeroString(n) {
    return n < 10 ? "0" + n : "" + n;
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
    let EngWeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (lang === "kor") {
        return korWeekArr[n];
    } else if (lang === "eng") {
        return EngWeekArr[n];
    } else {
        return ""; // 안전처리
    }
}

/*=======================================
해당 월의 마지막 날 구하기
API 사용 예) convertDate(원하는 연도, 원하는 월)
=========================================*/
function getLastDate(yy,mm){
    let d= new Date(yy,mm,0);
    return d.getDate();
}


