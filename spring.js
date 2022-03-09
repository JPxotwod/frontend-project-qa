"use strict"

let getData = async () => {
    let response = await fetch ('http://localhost:8080/getAll');
    if (response.status !==200) {
        throw new Error("Request Failed");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

let showData = async (i) => {
    let returnedData
    if (i==1) {returnedData = await getData();}
    if (i==2) {returnedData = await getById();}
    if (i==3) {returnedData = await getByNumber();}
    if (i==4) {returnedData = await getByName();}
    let allTable =
    `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Number</th>
    <th>Team</th>
    <th>Position</th>
    </tr>`;
for (let d=0;d<returnedData.length;d++){
    allTable += `<tr>
    <td>`+returnedData[d].id+`</td>
    <td>`+returnedData[d].name+`</td>
    <td>`+returnedData[d].number+`</td>
    <td>`+returnedData[d].team+`</td>
    <td>`+returnedData[d].position+`</td>
    </tr>`;
    console.log(allTable);
    document.getElementById("player").innerHTML = allTable;
}
}

let getById = async () => {
    let i = parseInt(document.getElementById("id").value);
    let response = await fetch ('http://localhost:8080/get/' +i);
    if (response.status !=200) {
        throw new Error("Request Failed");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    const result = jsonData.keys
    return jsonData;
}

let getByName = async () => {
    let i = document.getElementById("name").value;
    let response = await fetch ('http://localhost:8080/getByName/' +i);
    if (response.status !==200) {
        throw new Error("Request Failed");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  
}

let getByNumber = async () => {
    let response = await fetch ('http://localhost:8080/getByNumber/' +i);
    if (response.status !==200) {
        throw new Error("Request Failed");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

function createPlayer() {
    const data = {
        name: document.getElementById("fullname").value,
        number: document.getElementById("number").value,
        team: document.getElementById("team").value,
        position: document.getElementById("position").value,
    };

    fetch("http://localhost:8080/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


function removePlayer(id) {
    fetch("http://localhost:8080/remove/" + id, {
        method: "DELETE"
    }).then(response => {
        console.log(response);
        renderTodo();
    }).catch(error => console.error(error));
}


