function makeActiveTable(query) {
    // function to fill table with result of an sql query
    var table = document.getElementById("activeTable");


    // traverses query legnth
    for (i = 0; i < query.length; i++) {
        //insert row and cells
        var row = table.insertRow(i + 1);
        row.className = 'activeD';
        var cellBlank = row.insertCell(0);
        cellBlank.style.background = "none";
        var cellName = row.insertCell(1);
        cellName.innerHTML = query[i].name;
        var cellTotal = row.insertCell(2);
        cellTotal.innerHTML = query[i].total;
        var cellQ1 = row.insertCell(3);
        cellQ1.innerHTML = query[i].q1;
        var cellQ2 = row.insertCell(4);
        cellQ2.innerHTML = query[i].q2;
        var cellQ3 = row.insertCell(5);
        cellQ3.innerHTML = query[i].q3;
        var cellQ4 = row.insertCell(6);
        cellQ4.innerHTML = query[i].q4;
        var cellSinceLast = row.insertCell(7);
        cellSinceLast.innerHTML = query[i].sinceLast;
        var cellStatus = row.insertCell(8);
        cellStatus.innerHTML = query[i].status;
        
        if (query[i].status == 'Requested') { cellStatus.style.backgroundColor = '#579BFC'; cellStatus.style.color = 'white'; }
        else if (query[i].status == 'Paid') { cellStatus.style.backgroundColor = '#00B359'; cellStatus.style.color = 'white'; }
        else if (query[i].status == 'Not claimed') { cellStatus.style.backgroundColor = '#FCAB3E'; cellStatus.style.color = 'white'; }

        
    }
}

function makeFreezerTable(query) {
    // function to fill table with result of an sql query
    var table = document.getElementById("freezerTable");


    // traverses query legnth
    for (i = 0; i < query.length; i++) {
        //insert row and cells
        var row = table.insertRow(i + 1);
        row.className = 'col1-freez';
        var cellBlank = row.insertCell(0);
        cellBlank.style.background = "none";
        var cellName = row.insertCell(1);
        cellName.innerHTML = query[i].name;
        var cellAddress = row.insertCell(2);
        cellAddress.innerHTML = query[i].address;
        var cellEmail = row.insertCell(3);
        cellEmail.innerHTML = query[i].email;
        var cellNumber = row.insertCell(4);
        cellNumber.innerHTML = query[i].number;

    }
}

function makeVolunteerTable(query) {
    // function to fill table with result of an sql query
    var table = document.getElementById("volTable");


    // traverses query legnth
    for (i = 0; i < query.length; i++) {
        //insert row and cells
        var row = table.insertRow(i + 1);
        row.className = 'col1-vol';

        var cellBlank = row.insertCell(0);
        cellBlank.style.background = "none";

        var cellName = row.insertCell(1);
        cellName.innerHTML = query[i].name;

        var cellStatus = row.insertCell(2);
        cellStatus.innerHTML = query[i].status;
        if (query[i].status == 'Active') { cellStatus.style.backgroundColor = '#CCEEFF'; }
        else if (query[i].status == 'Cookathons only') { cellStatus.style.backgroundColor = '#FFE6CC'; }

        var cellSafety = row.insertCell(3);
        cellSafety.innerHTML = query[i].safety;
        if (query[i].safety == 'Current') { cellSafety.style.backgroundColor = '#00B359'; cellSafety.style.color = 'white'; }
        else if (query[i].safety == 'Scheduled') { cellSafety.style.backgroundColor = '#69A6FC'; cellSafety.style.color = 'white'; }
        else if (query[i].safety == 'Expired') { cellSafety.style.backgroundColor = '#E2445C'; cellSafety.style.color = 'white'; }

        var cellProcess = row.insertCell(4);
        cellProcess.innerHTML = query[i].process;
        if (query[i].process == 'Done') { cellProcess.style.backgroundColor = '#00B359'; cellProcess.style.color = 'white'; }

        var cellBirthday = row.insertCell(5);
        cellBirthday.innerHTML = query[i].birthday;
    }
}

var objVolunteer = [
    {
        name: 'Lynnette Symmonds',
        status: 'Active',
        safety: 'Current',
        process: 'Done',
        birthday: '31 Mar 1970'
    },
    {
        name: 'Tania Dakins',
        status: 'Cookathons only',
        safety: 'No',
        process: 'Done',
        birthday: '18 Oct 1969'
    },
    {
        name: 'Carole Jenkins',
        status: 'On leave',
        safety: 'Scheduled',
        process: 'Done',
        birthday: '4 May 1973'
    },
    {
        name: 'Josie Cartwright',
        status: 'Cookathons only',
        safety: 'Expired',
        process: '',
        birthday: '31 Mar 1970'
    }
   ]

var objActive = [
    {
        name: 'Jenny Craig',
        total: '12',
        q1: '12',
        q2: '0',
        q3: '0',
        q4: '0',
        sinceLast: '12',
        status: 'Requested'
    },

    {
        name: 'Melanie Brown',
        total: '10',
        q1: '10',
        q2: '0',
        q3: '0',
        q4: '0',
        sinceLast: '10',
        status: 'Paid'
    },

    {
        name: 'Alex Kirkman',
        total: '9',
        q1: '9',
        q2: '0',
        q3: '0',
        q4: '0',
        sinceLast: '9',
        status: 'Insufficient'
    },

    {
        name: 'Emily Rhodes',
        total: '7',
        q1: '7',
        q2: '0',
        q3: '0',
        q4: '0',
        sinceLast: '7',
        status: 'Not claimed'
    }
    
]

var objFreezer = [
    {
        name: 'Meghan Fiddler',
        address: '2 St Peter Street, Northcote',
        email: 'meghanfid@active.net',
        number: '022 894 7866'
    },

    {
        name: 'Julie Deakins',
        address: '90 calliope Rd, Devonport',
        email: 'julie.deakins@gmail.com',
        number: '021 658 998'
    },
    {
        name: 'Helen Hudson',
        address: '180 Fairway Drive, Albany',
        email: 'helen_h@hotmail.com',
        number: '027 554 9088'
    }
]
