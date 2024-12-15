const existingData = localStorage.getItem('posts');
const dataToBeImported = document.getElementById('import');

function importData() {
    if (existingData) {
        const parsedData = JSON.parse(existingData);
        const importedData = JSON.parse(dataToBeImported.value);
        const newData = [...parsedData, ...importedData];
        localStorage.setItem('posts', JSON.stringify(newData));
        document.getElementById("importStatus").innerHTML = "Data imported successfully!";
    } else {
        localStorage.setItem('posts', dataToBeImported.value);
        document.getElementById("importStatus").innerHTML = "Data imported successfully!";
    }
}