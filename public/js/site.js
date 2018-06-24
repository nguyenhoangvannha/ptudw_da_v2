function getTextFromFile(file, callback) {
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}
function createMenuItem(title, link) {
    var html = `<li>
    <a href="` + link + '">' + title + `<i class="fas fa-chevron-down"></i>
    </a>
    </li>`;
    return html;
}
function createDropDownItem(title) {
    var html = `<li>
    <a class="clc" href="#">` + title + `</a>
</li>`;
    return html;
}