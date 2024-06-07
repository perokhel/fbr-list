const btnSearch = document.getElementById("btn-search");
const table = document.getElementById("tbl-data");

const searchResults = [];

const record = {
  sr_no: 87383,
  id: 6104578692733,
  name: "Mufaddal Hussain Vohra",
};

searchResults.push(record);

const newRows = searchResults.map((result) => {});

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

function resetTableBody() {
  let tbody = table.tBodies[0];
  if (tbody != null) {
    table.removeChild(tbody);
    tbody = null;
  }
  tbody = table.createTBody();
  tbody.id = "list_tbody";
}
