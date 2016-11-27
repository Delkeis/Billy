function compare_date(current)
{
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var fulldate = date + "/" + month + "/" + year;
    alert(fulldate+"-"+current);
}

//compare_date("13/01/1996");
