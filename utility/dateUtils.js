// dateUtils.js

// 날짜를 'YYYY년 MM월 DD일' 형식으로 변환하는 함수
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// 오늘 날짜와 D-day 계산 함수
function calculateDateDifferences(todayDateStr, ddayDateStr) {
    // 문자열을 Date 객체로 변환
    const today = new Date(todayDateStr);
    const dday = new Date(ddayDateStr);

    // 날짜 차이 계산
    const timeDifference = dday - today; // 밀리초 단위
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일 단위로 변환

    // 형식화된 날짜 문자열 생성
    const formattedToday = formatDate(today);
    const formattedDday = formatDate(dday);

    let result = '';

    if (daysDifference < 0) {
        // D-day가 현재 날짜보다 이후인 경우
        result = `D+${daysDifference}일`;
    } else if (daysDifference > 0) {
        // D-day가 현재 날짜보다 이전인 경우
        result = `D-${Math.abs(daysDifference)}일`;
    } else {
        // D-day가 현재 날짜와 같은 경우
        result = `D-day`;
    }

    return result.trim();
}

// 두 함수를 모듈로 내보내기
module.exports = {
    formatDate,
    calculateDateDifferences
};
function sliceDate(rawDate)
{
    const string = String(rawDate);
    const numArray = Array.from(string);
    
    var year = numArray.slice(0,2);
    year = year[0] + year[1];

    var month = numArray.slice(2,4);
    month = month[0] + month[1];

    var day = numArray.slice(4,6);
    day = day[0] + day[1];

    const date = `${year}-${month}-${day}`

    return date;

    
}


// 두 함수를 모듈로 내보내기
module.exports = {
    formatDate,
    calculateDateDifferences,
    sliceDate
};