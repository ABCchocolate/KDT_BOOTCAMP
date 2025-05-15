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

/*---------------------------------------------------
범위를 지정한 랜덤 
getRandomByRange(5,8)   5부터 8사이의 랜덤값 반환
*---------------------------------------------------*/
function getRandomByRange(min, max){
  return min + (parseInt(Math.random()*(max-min+1)));
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
function getLastDate(yy, mm) {
    let d = new Date(yy, mm, 0);
    return d.getDate();
}

/*======================================
충돌 체크 함수 (in game)
API 사용 예시) 
=======================================*/
function collisionCheck(me, target) {
    //나에 대한 수치 계산
    //현재 나의 x축
    const me_x = parseInt(me.style.left);
    const me_y = parseInt(me.style.top);

    const me_width = parseInt(me.style.width);
    const me_height = parseInt(me.style.height);


    //현재 나의 x축
    const target_x = parseInt(target.style.left);
    const target_y = parseInt(target.style.top);

    const target_width = parseInt(target.style.width);
    const target_height = parseInt(target.style.height);
    return !(
        me_x + me_width < target_x || //me의 오른쪽이 타겟의 왼쪽보다 왼쪽에 있다면
        me_x > target_x + target_width || //me의 왼쪽이 타겟의 우측보다 더 오른쪽에 있다면  
        me_y + me_height < target_y || //me의 아래가 타겟보다 위쪽에 있다면,
        me_y > target_y + target_height //me의 위쪽이 상대방 보다 아래에 있다면
    )
}
