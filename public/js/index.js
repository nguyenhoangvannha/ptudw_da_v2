
// <!-- Slider Item -->
// <div class="arrivals_slider_item">
//     <div class="border_active"></div>
//     <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
//         <div class="product_image d-flex flex-column align-items-center justify-content-center">
//             <img src="images/new_2.jpg" alt="">
//         </div>
//         <div class="product_content">
//             <div class="product_price">$379</div>
//             <div class="product_name">
//                 <div>
//                     <a href="product.html">Transcend T.Sonic</a>
//                 </div>
//             </div>
//             <div class="product_extras">
//                 <div class="product_color">
//                     <input type="radio" checked name="product_color" style="background:#b19c83">
//                     <input type="radio" name="product_color" style="background:#000000">
//                     <input type="radio" name="product_color" style="background:#999999">
//                 </div>
//                 <button class="product_cart_button active">Add to Cart</button>
//             </div>
//         </div>
//         <div class="product_fav">
//             <i class="fas fa-heart"></i>
//         </div>
//         <ul class="product_marks">
//             <li class="product_mark product_discount"></li>
//             <li class="product_mark product_new">new</li>
//         </ul>
//     </div>
// </div>
function makePage(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
        alert("webpage " + xmlhttp.responseText + " was successfully created!");
    }
    var content = "<html><head><meta charset=\"utf-8\" /> </head><body>new website<script>alert(\"test\")</script></body></html>";
    xmlhttp.open("GET","makePage.php?content=" + content,true);
    xmlhttp.send();
}
function createSliderItem(hinhAnh, alt, price, link, name, mark) {

    var result =
        `<!-- Slider Item -->
    <div class="arrivals_slider_item">
    <div class="border_active"></div>
    <a href="`+link+`">
    <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
        <div class="product_image d-flex flex-column align-items-center justify-content-center">
            <img src="` + hinhAnh + '" alt="' + alt + `  width="100" height="100" ">
            </div>
            <div class="product_content">
                <div class="product_price">` + price + `</div>
                <div class="product_name">
                    <div>
                        <a href="` + link + '">' + name + `</a>
                        </div>
                    </div>
                    <div class="product_extras">
                    <a href="javascript:void(0);" name="" id="" class="btn-buy" style="color: white" role="button"><button class="product_cart_button">Thêm vào giỏ hàng</button></a>
                    </div>
                </div>
                <ul class="product_marks">
                    <li class="product_mark product_discount">-25%</li>
                    <li class="product_mark product_new">` + mark + `</li>
                    </ul>
                </div></a>
            </div>`;
    return result;
}

function createSliderContent(jsonFile, mark, callback) {
    getTextFromFile(jsonFile, function (text) {
        var json = JSON.parse(text);
        var html = "";
        for (var i = 0; i < 10; i++) {
            var hinhAnh, ten, giaBan, urlXe;
            try {
                hinhAnh = json[i].hinhAnh;
                ten = json[i].ten;
                giaBan = json[i].giaBan;
                urlXe = json[i].urlXe;
                urlXe ="/carsdata/" + json[i].nhaSanXuat+ "/" + ten + ".html";
                urlXe = "/product.html"
            }
            catch (err) {
            }
            var urlHinh;
            if (hinhAnh == undefined) {
                urlHinh = '/images/noimage.png';
            } else {
                urlHinh = "carsdata" + hinhAnh;
            }

            var s = createSliderItem(urlHinh, ten
                , "$" + giaBan, urlXe, ten, mark);
            html += s;
        }
        callback(html);
    });
}
