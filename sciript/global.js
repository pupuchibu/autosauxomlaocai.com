function check_login(){
    var error = "";
    var email = document.getElementById('email').value;
    if (email.length < 6) error += "- Bạn cần nhập đúng email \n";

    var password = document.getElementById('password').value;
    if (password.length == 0 ) error += "- Bạn cần nhập đúng mật khẩu \n";

    if (error != "") {
        alert(error);
        return false;
    } 
    
    return true;
}
function check_field() {
    var error = "";
    var email = document.getElementById('email').value;
    if (email.length < 6) error += "- Mời bạn nhập địa chỉ email\n";
    var password = document.getElementById('password').value;
    if (password.length < 6) error += "- Mật khẩu yếu\n";
    
    var full_name = document.getElementById('full_name').value;
    if (full_name.length < 6) error += "- Mời bạn nhập đúng tên\n";
    var mobile = document.getElementById('mobile').value;
    if (mobile.length < 9) error += "- Mời bạn nhập đủ số điện thoại\n";
            var address = document.getElementById('address').value;
    if (address.length < 6) error += "- Mời bạn nhập địa chỉ\n";
            var vapt_er = $("#check_user2").text();
            var vapt_trong = $("#capt_tr").val();
            if(vapt_er != "" || vapt_trong == "") error += "- Mời bạn nhập đúng mã bảo mật\n";

    if (document.getElementById("cb_rules_agree").checked == false) error += "- Bạn chưa tích chọn đồng ý với điều khoản của \n";

    if (error != "") {
        alert(error);
        return false;
    }
    return true;
}  
function subscribe_newsletter(a){
var email = $(a).val();
if(email.length > 3){
    $.post("/ajax/post.php", { 
        action : 'customer', 
        action_type: 'register-for-newsletter', 
        full_name : 'Khách hàng nhận bản tin', 
        email: email 
    }, function(data) {
        if(data=='success') {
            alert("- Quý khách đã đăng ký thành công !");
            $(a).val("");
        }
        else if(data=='exist'){
            alert("- Email này đã tồn tại");
        }
        else {
            alert('- Lỗi xảy ra, vui lòng kiểm tra lại');
        }
    });
}else{
    alert('- Vui lòng nhập địa chỉ email');
}
}


function check_form_contact(){
var error = "";
var check_name = document.getElementById('contact_name').value;
var check_email = document.getElementById('contact_email').value;
var check_tel = document.getElementById('contact_tel').value;
var check_message = document.getElementById('contact_message').value;

if(check_name.length < 4) error += "- Bạn chưa nhập tên\n";
if(check_email.length < 4) error += "- Bạn chưa nhập email\n";
if(check_message.length < 4) error += "- Bạn chưa nhập nội dung\n";

if(error == ""){
    $.post("/ajax/customer_contact.php", {
      from: 'ajax',
      contact_name:check_name, 
      contact_email:check_email, 
      contact_tel:check_tel, 
      contact_message:check_message
    },function(data){
      alert("Bạn đã gửi liên hệ thành công");
      location.reload();
      return true;
    });  
}
else alert(error);
return false;
}
function validateEmail(sEmail) {
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
    return true;
}
else {
    return false;
}
}


function validatePhoneNumber(a){
var number_regex1 = /^[0]\d{9}$/i;
var number_regex2 = /^[0]\d{10}$/i;

if(number_regex1.test(a) == false && number_regex2.test(a) == false) return false;
return true;
}

function isOnScreen(elem) {
// if the element doesn't exist, abort
if( elem.length == 0 ) {
    return;
}
var $window = jQuery(window)
var viewport_top = $window.scrollTop()
var viewport_height = $window.height()
var viewport_bottom = viewport_top + viewport_height
var $elem = jQuery(elem)
var top = $elem.offset().top
var height = $elem.height()
var bottom = top + height

return  (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}

function formatCurrency(a) {
var b = parseFloat(a).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
var len = b.length;
b = b.substring(0, len - 3);
return b;
}                           
function formatcontent(text){
var html = text.replace(/[<>"=']/g, '');
return html;
}

//show cart summary
function showCartSummary(display_node) {
var $status_container = $(display_node);
$status_container.html('...');
Hura.Cart.getSummary().then(summary => {
    $status_container.html(summary.total_item);
});
  
}
// show content
function collapse_content(item, contentHeight) {
if ($(item).height() > contentHeight) {
    $(".item-btn").css('display','flex');
      $(item).css('height', contentHeight);
    
}else{
        $(".item-btn").remove();
       $(item).css('height', '100%');
}
  console.log($(item).height());
}
$(".js-viewmore-content").click(function () {
var content = $(this).attr("data-content");
$(this).toggleClass("active");
$(content).toggleClass("active");

if ($(this).hasClass("active")) {
    $(this).html('Thu gọn');
} else {
    $(this).html('Xem thêm');
    $('html,body').animate({ scrollTop: $(content).offset().top }, 500);
}
});
function getProductList(url, holder) {
  $.getJSON(url, function (result) {
      var data = "";
      var html = "";
      var limit = 12;
      if (typeof result.list !== 'undefined') data = result.list;
      else data = result;
          //console.log("data",data);
    
       if (data.length > 0) {
          data.forEach(function (item, index) {
              if (index > limit - 1) return;
              var productId = item.productId;
              var productUrl = item.productUrl;
              var productName = item.productName;
              var productImage = item.productImage.original;
              var productSKU = item.productSKU;
            
              var productSummary = item.productSummary;
              if(productSummary == '') productSummary = 'Đang cập nhật.....';
            
              if (productImage == '') productImage = "/template/giaodien_2022/images/logo.png";

              var price = item.price;
              var priceFormat = Hura.Util.writeStringToPrice(price) + "đ";
              if (price == 0) priceFormat = "Liên hệ";
              var marketPrice = '';
              if (parseInt(item.marketPrice) > 0) {
                  marketPrice = '<del class="old-price">' + Hura.Util.writeStringToPrice(item.marketPrice) + 'đ</del>';
              }else{
                    marketPrice = '<del class="old-price"></del>';
              }
              var discount = '';
              if (parseInt(item.marketPrice) > parseInt(price) && parseInt(price) > 0) {
                  percent = Math.ceil(100 - price * 100 / item.marketPrice);
                  discount = '<div class="sale">- ' + percent + '%</div>';
              }else{
                  discount ='';	
              }
              var kmaiHtml = '';
              if(item.specialOffer.all.length > 0 ) {
                  kmaiHtml = "<div class='product-summary line-clamp-2'>"+item.specialOffer.all[0].title +"</div>";
              }else{
                  kmaiHtml = "<div class='product-summary line-clamp-2'>Đang cập nhật khuyến mại...</div>";
              }
                

              html += `
                    <div class="product-item">
                        <div class="product-img">
                            <a href="`+ productUrl + `">
                                <img src="`+ productImage + `" alt="` + productName + `">
                            </a>
                            `+ discount + `
                        </div>
                        <div class="product-info">
                            <div class="product-title">
                                <a href="`+ productUrl + `">` + productName + `</a>
                            </div>
                            <div class="product-price">
                                `+ marketPrice + `
                                <span class="item-price">`+ priceFormat + `</span>
                            </div>
                            `+ kmaiHtml +`
                       </div>
                  </div>
                `;
          });
         
        $(holder).html(html);
         
       }else{
       
         $(holder).html('<p style="color:gray;">Sản phẩm đang được cập nhật.....</p>');
       
       }
});
}