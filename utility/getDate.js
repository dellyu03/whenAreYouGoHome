
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

module.exports.sliceDate = sliceDate;

