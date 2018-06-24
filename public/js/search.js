function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}

document.querySelector('p').innerText = truncateText('p', 200);

function createResultItem(name, image, price, des, year) {
    var html = `<!-- Product item -->
    <div class="card flex-md-row mb-4 box-shadow h-md-250">
    <div class="card-body d-flex flex-column align-items-start">
      <strong class="d-inline-block mb-2 text-primary">`+name+`</strong>
      <h3 class="mb-0">
        <a class="text-dark" href="#">$`+price+`</a>
      </h3>
      <div class="mb-1 text-muted">`+year+`</div>
      <p style="width: 400px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">`+des+`</p>
      <a href="product.html">Chi tiết</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="`+name+`" style="width: 220px; height: 170px;" src="`+image+`" data-holder-rendered="true">

    <div class="product_extras">
                        <a href="javascript:void(0);" name="" id="" class="btn btn-primary btn-buy" style="color: white" role="button">Thêm vào giỏ hàng</a>
                    </div>
  </div>`
  return html;
}
function createResultContent(jsonFile, callback) {
    getTextFromFile(jsonFile, function (text) {
        var json = JSON.parse(text);
        var html = "";
        for (var i = 0; i < 20; i++) {
            var loai, moTa,hinhAnh, ten, giaBan, urlXe;
            try {
                loai = json[i].loai;
                moTa = json[i].moTa;
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
            var s = createResultItem(ten, urlHinh, giaBan, moTa, loai);
            html += s;
        }
        callback(html);
    });
}

$(document).on('click','.btn-buy',function (e) {
    e.preventDefault();
    var parent = $(this).parents('.card' ,'.flex-md-row', '.mb-4 box-shadow', '.h-md-250');
    var cart = $(document).find('#cart-shop');
        src = parent.find('img').attr('src');
        
        var parTop = parent.offset().top;
        var parLeft = parent.offset().left;
    
        $('<img />', { 
          class: 'img-fly',
          src: src,
        }).appendTo('body').css({
            'top' : parTop,
            'left' : parseInt(parLeft) + parseInt(parent.width()) - 50
        });

    setTimeout(function(){
        $(document).find('.img-fly').css({
        'top' : cart.offset().top,
        'left' : cart.offset().left
        });
        setTimeout(function(){
            $(document).find('.img-fly').remove();
            var citem = parseInt(cart.find('#count-item').data('count'))+1;
            cart.find('#count-item').text(citem).data('count',citem);
        },1000);	
    },500);
});


