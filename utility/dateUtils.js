// dateUtils.js

// 날짜를 'YYYY년 MM월 DD일' 형식으로 변환하는 함수
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// utility/dateUtils.js

/**
 * 주어진 날짜와 오늘 날짜의 차이를 계산하여 D-Day 형식으로 반환하는 함수
 * @param {string} enlistmentDate - '입대일' 역할에서 추출한 날짜 문자열 (형식: 'YYMMDD')
 * @returns {string} - D-Day 형식의 문자열 ('D+N' 또는 'D-N')
 */
function calculateDday(enlistmentDate) {
    const today = new Date();
    const [year, month, day] = [
        `20${enlistmentDate.substring(0, 2)}`,
        enlistmentDate.substring(2, 4),
        enlistmentDate.substring(4, 6)
    ];

    const enlistment = new Date(`${year}-${month}-${day}`);
    const timeDifference = today - enlistment;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference >= 0 ? `D+${dayDifference}` : `D${dayDifference}`;
}


// 두 함수를 모듈로 내보내기

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
    sliceDate,
    calculateDday
};