const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search");
const table = document.getElementById("tbl-data");
const message = document.getElementById("message");
const spanner = document.getElementById("prog-spanner");

btnSearch.onclick = rePopulateTable;

async function searchFBRList(searchFor) {
  let apiUrl = "http://localhost:3100/fbr";

  let postOptions = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ searchFor }), // body data type must match "Content-Type" header
  };

  return await sendData(apiUrl, postOptions);
}

async function sendData(apiUrl, postOptions) {
  let response = await fetch(apiUrl, postOptions);
  let jsonData = await response.json();
  return jsonData;
  // console.log(jsonData);
}

async function rePopulateTable(event) {
  event.preventDefault();
  const searchFor = searchInput?.value.trim();
  if (searchFor == "") {
    message.innerHTML = "Search empty, please enter something to search!";
    return;
  }

  message.innerHTML = "Loading..... Please wait!";
  spanner.hidden = false;
  const searchResults = await searchFBRList(searchFor);

  if (searchResults.length < 1)
    searchResults.push({
      sr_no: NaN,
      id: NaN,
      name: "No Record Found!",
    });

  refreshTableBody(searchResults);
  spanner.hidden = true;
  message.innerHTML = `<strong>${searchResults.length}</strong> records found.`;
}

function constructRow(record) {
  const newRow = document.createElement("tr");
  const keys = Object.keys(record);
  keys.forEach((key) => {
    const rowCell = document.createElement("td");
    const textNode = document.createTextNode(record[key]);
    rowCell.appendChild(textNode);
    newRow.appendChild(rowCell);
  });
  return newRow;
}

function refreshTableBody(searchResults) {
  let tBody = table.tBodies[0];
  if (tBody != null) {
    table.removeChild(tBody);
    [...tBody.rows].forEach((row) => tBody.removeChild(row));
    tBody = null;
  }
  tBody = document.createElement("TBODY");
  tBody.id = "list_tbody";
  const newRows = searchResults.map((result) => constructRow(result));
  newRows.forEach((row) => tBody.appendChild(row));
  table.appendChild(tBody);
}
