const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search");
const table = document.getElementById("tbl-data");

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
    console.log("Search empty, please enter something to search!");
    return;
  }

  const searchResults = await searchFBRList(searchFor);

  if (searchResults.length < 1)
    searchResults.push({
      sr_no: NaN,
      id: NaN,
      name: "No Record Found!",
    });
  const newRows = searchResults.map((result) => constructRow(result));

  resetTableBody();
  let tbody = table.tBodies[0];
  newRows.forEach((row) => tbody.appendChild(row));
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

function getDummyList() {
  const dummyList = [];
  const record = {
    sr_no: 87383,
    id: 6104578692733,
    name: "Mufaddal Hussain Vohra",
  };
  dummyList.push(record);
  return dummyList;
}

function resetTableBody() {
  let tbody = table.tBodies[0];
  if (tbody != null) {
    table.removeChild(tbody);
    tbody = null;
  }
  tbody = table.createTBody();
  tbody.id = "list_tbody";
}
