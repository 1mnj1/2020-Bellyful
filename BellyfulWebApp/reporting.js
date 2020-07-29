//dummy data
var objDeliveries = [
    {
        name: "Hannah Wells",
        suburb: "Devenport",
        dateStart: "16 Feb",
        dateFinish: "26 Feb",
        deliverer: "Karen B"

    },
    {
        name: "Kelly Marama",
        suburb: "Northcross",
        dateStart: "18 Feb",
        dateFinish: "27 Feb",
        deliverer: "Lisimi"

    },
    {
        name: "Andrew Winters",
        suburb: "Albany",
        dateStart: "16 Jun",
        dateFinish: "26 Jun",
        deliverer: "Matt L"

    }

]

function makeTable(t, query) {
    // function to fill table with result of an sql query
    var table = document.getElementById(t);
    var x = table.rows.length;
    //delete existing rows
    if (x > 1) {
        for (var i = 0; i < x; i++) {
            table.deleteRow(1);
            console.log(table.rows.length);
        }
    } 

        // traverses query legnth
    for (i = 0; i < query.length; i++) {
        //insert row and cells
        var row = table.insertRow(i + 1);
        row.className = 'completed';
        var cellBlank = row.insertCell(0);
        cellBlank.style.background = "none";
        var cellName = row.insertCell(1);
        cellName.innerHTML = query[i].name;
        var cellSuburb = row.insertCell(2);
        cellSuburb.innerHTML = query[i].suburb;
        var cellStart = row.insertCell(3);
        cellStart.innerHTML = query[i].dateStart;
        var cellFinish = row.insertCell(4);
        cellFinish.innerHTML = query[i].dateFinish;
        var cellDeliverer = row.insertCell(5);
        cellDeliverer.innerHTML = query[i].deliverer;

        
    }
   
}