
function makeTable(t, query) {
    // function to fill table with result of an sql query
    var table = document.getElementById(t);

   

    // traverses query legnth
    for (i = 0; i < query.length; i++) {
        //insert row and cells
        var row = table.insertRow(i + 1);
        
        var cellBlank = row.insertCell(0);
        cellBlank.style.background = "none";
        var cellName = row.insertCell(1);
        cellName.innerHTML = query[i].name;
        var cellSuburb = row.insertCell(2);
        cellSuburb.innerHTML = query[i].suburb;
        var cellDate = row.insertCell(3);
        cellDate.innerHTML = query[i].date;
        //columns for contact table
        if (t == "conTable") {
            row.className = 'contact';
            cellType = row.insertCell(4);
            cellType.innerHTML = query[i].type;
            cellStatus = row.insertCell(5);
            cellStatus.innerHTML = query[i].status
            cellStatus.style.color = "white";
            if (cellType.innerHTML == 'New') { cellType.style.backgroundColor = '#FFCCE0' }
            else if (query[i].type == 'Follow up') { cellType.style.backgroundColor = '#DDCCFF' }
            if (cellStatus.innerHTML == 'In progress') { cellStatus.style.backgroundColor = '#FCAB3E' }
            else if (query[i].status == 'Contacted') { cellStatus.style.backgroundColor = '#00B359';}
        //columns for outstanding deliveries table
        } else if (t == 'outstandingTable') {
            row.className = 'outstanding';
            cellStatus = row.insertCell(4);
            cellStatus.innerHTML = query[i].status;
            cellStatus.style.color = "white";
            cellDeliverer = row.insertCell(5);
            cellDeliverer.innerHTML = query[i].deliverer;
            if (cellStatus.innerHTML == 'Assigned') { cellStatus.style.backgroundColor = '#00B359' }
            else if (cellStatus.innerHTML == 'In progress') { cellStatus.style.backgroundColor = '#FCAB3E' }
            else if (cellStatus.innerHTML == 'Unassigned') { cellStatus.style.backgroundColor = '#E2445C' }

        //columns for completed deliveries table
        } else if (t == 'completedTable') {
            row.className = 'completed';
            cellComplete = row.insertCell(4);
            cellComplete.innerHTML = query[i].completed;
            cellDeliverer = row.insertCell(5);
            cellDeliverer.innerHTML = query[i].deliverer;
        }
        


    }

}

var objContact = [
    {
        name: 'Dian Salva',
        suburb: 'Browns Bay',
        date: '3 Apr',
        type: 'New',
        status: 'In progress'
    },
    {
        name: 'Ann Sullivan',
        suburb: 'Castor Bay',
        date: '3 Apr',
        type: 'Follow up',
        status: ''
    },
    {
        name: 'Meghan Richte',
        suburb: 'Milford',
        date: '3 Apr',
        type: 'New',
        status: 'Contacted'
    }
]

var objOutstanding = [
    {
        name: 'Dian Salva',
        suburb: 'Browns Bay',
        date: '3 Apr',
        deliverer: 'Tania',
        status: 'Assigned'
    },
    {
        name: 'Ann Sullivan',
        suburb: 'Castor Bay',
        date: '3 Apr',
        deliverer: 'Lynnette',
        status: 'In progress'
    },
    {
        name: 'Meghan Richte',
        suburb: 'Milford',
        date: '3 Apr',
        deliverer: '',
        status: 'Unassigned'
    }
]

var objCompleted = [
    {
        name: 'Dian Salva',
        suburb: 'Browns Bay',
        date: '16 Feb',
        completed: '28 Feb',
        deliverer: 'Karen B'
    },
    {
        name: 'Ann Sullivan',
        suburb: 'Castor Bay',
        date: '16 Feb',
        completed: '20 Feb',
        deliverer: 'Sharleen'
    },
    {
        name: 'Meghan Richte',
        suburb: 'Milford',
        date: '18 Feb',
        completed: '28 Feb',
        deliverer: 'Sharleen'
    }
]
