function generateDate() {
    let i, temp;
    temp = document.getElementById("date");
    for(i = 1; i <= 31; ++i) temp.innerHTML = temp.innerHTML + '<option value="'+ i + '">' + i.toString() + '</option>';
    temp = document.getElementById("year");
    for(i = 1900; i <= new Date().getFullYear(); ++i) temp.innerHTML = temp.innerHTML + '<option value="'+ i + '">' + i.toString() + '</option>';
}

function generateDynamicData() {
    generateDate();
}

window.onload = generateDynamicData;
