function getRandom(n) {
    //원하는 정수를 반환받기 위해서는 n값을 호출시 결정하자.
    //예) getRandom(1001)이 나오게 해야한다.
    

    //0 보다 크고 11보다 작은 난수이다. 
    return parseInt(Math.random() * (n+1));
}