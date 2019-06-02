function Validation() {
    var danhSachNguoiDung = new DanhSachNguoiDung();
    this.kiemTraRong = function (input, spanId, message) {
        if (input == "") {
            $(spanId).html(message);
            $(spanId).css("display", "block");
            return false;
        } else {
            $(spanId).html();
            $(spanId).css("display", "none");
            return true;
        }
    };
    this.kiemTraTrungTaiKhoan = function (input, spanId, message) {
        // var check = !danhSachNguoiDung.mangNguoiDung.some(function(item){
        //     return item.taiKhoan == input;
        // });
        var check = danhSachNguoiDung.mangNguoiDung.findIndex(function (item) {
            return input = item.maNV;
        });
        if (!check) {
            $(spanId).html();
            $(spanId).css("display", "none");
            return 1;
        }
        $(spanId).html(message);
        $(spanId).css("display", "block");
        return 0;
    };
    this.kiemTraEmail = function (input, spanId, message) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!input.match(mailformat)) {
            $(spanId).html(message);
            $(spanId).css("display", "block");
            return false;
        } else {
            $(spanId).html();
            $(spanId).css("display", "none");
            return true;
        }

    };
    this.kiemTraDoDai = function (input, spanId, message, min, max) {
        if (input.length >= min && input.length <= max) {
            $(spanId).html();
            $(spanId).css("display", "none");
            return true;
        }
        $(spanId).html(message);
        $(spanId).css("display", "block");
        return false;
    };
}