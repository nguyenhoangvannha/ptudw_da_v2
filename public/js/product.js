function createItem(image, name, price) {
    var html = `<!-- Recently Viewed Item -->
    <div class="col-lg-2">
    <a href="product.html">
    <div class="card" style="width: 10rem;">
    <div class="owl-item">
        <div class="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
            <div class="viewed_image">
                <img src="` + image + '" alt="' + name + `">
                </div>
                <div class="viewed_content text-center">
                    <div class="viewed_price">` + price + `</div>
                    <div class="viewed_name">
                        <a href="#">` + name + `</a>
                        </div>
                    </div>
                </div>
            </div> </div></a></div>`;
    return html;
}
function createContent(jsonFile, callback) {
    getTextFromFile(jsonFile, function (text) {
        var json = JSON.parse(text);
        var html = "";
        for (var i = 1; i < 6; i++) {
            var hinhAnh, ten, giaBan, urlXe;
            try {
                hinhAnh = json[i].hinhAnh;
                ten = json[i].ten;
                giaBan = json[i].giaBan;
                urlXe = json[i].urlXe;

            }
            catch (err) {
            }
            var urlHinh;
            if(hinhAnh == undefined){
                urlHinh = '/images/noimage.png';
            } else {
                urlHinh = "carsdata" + hinhAnh;
            }
            var s = createItem(urlHinh, ten
                , "$" + giaBan);
            html += s;
        }
        callback(html);
    });
}