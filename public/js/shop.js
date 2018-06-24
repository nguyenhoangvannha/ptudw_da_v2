function createShopItem(hinhAnh, alt, giaBan, link, ten, mark) {
    var html = '<a href="' + link + 
    `"><div class="product_item">
    <div class="product_border"></div>
    <div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="`
        + hinhAnh + '" alt="' + alt + ` width="100" height="100"></div>
        <div class="product_content">
            <div class="product_price">` + giaBan + `</div>
            <div class="product_name"><div><a href="`+ link+`" tabindex="0">` + ten + `</a></div></div>
            </div>
            <ul class="product_marks">
                <li class="product_mark product_discount">-25%</li>
                <li class="product_mark product_new">` + mark + `</li>
            </ul>
        </div></a>`;
        return html;
}
function createShopContent(jsonFile, mark, callback) {
    getTextFromFile(jsonFile, function (text) {
        var json = JSON.parse(text);
        var html = "";
        for (var i = 0; i < 20; i++) {
            var hinhAnh, ten, giaBan, urlXe;
            try {
                hinhAnh = json[i].hinhAnh;
                ten = json[i].ten;
                giaBan = json[i].giaBan;
                urlXe = json[i].urlXe;
                urlXe = "/product.html"
            }
            catch (err) {
            }
            var urlHinh;
            if(hinhAnh == undefined){
                urlHinh = '/images/noimage.png';
            } else {
                urlHinh = "carsdata" + hinhAnh;
            }
            var s = createShopItem(urlHinh, ten
                , "$" + giaBan, urlXe, ten, mark);
            html += s;
        }
        callback(html);
    });
}
function getProductsCount(jsonFile, callback) {
    var count = 0;
    for(var i = 0; i < jsonFile.length; i++){
        getTextFromFile("/carsdata/" + jsonFile[i], function (text) {
            var json = JSON.parse(text);
            count += json.length;
        });
    }
    callback(count);
}
function createManufactureItem(title) {
    return `<li style="cursor: pointer;" class="list-group-item">` + title + "</li>";
}
function createManufactureItems(indexJson) {
    var html = "";
    for(var i = 0; i < indexJson.length; i++){
        var title = indexJson[i].substring(0, indexJson[i].indexOf("."));
        html += createManufactureItem(title);
    }
    return html;
}
function createTypeItems() {
    var html = "";
    var year = new Date().getFullYear();
    for(var i = 0; i < 10; i++){
        html += createManufactureItem("Năm " + year);
        year--;
    }
    return html;
}