
$(document).ready(function(){

    var danhSachNguoiDung = new DanhSachNguoiDung();
    var validation = new Validation();
    getLocalStorage();
   
   
    //Dom den nut them moi
    $("#btnThemNguoiDung").click(function(){
        var title = "Thêm người dùng";
        //Heading modal
        $(".modal-title").html(title);

        //Footer Modal

        var footer = `
            <button id ='btnThem' class='btn btn-success'>Thêm</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `;
        $(".modal-footer").html(footer);
        $("#TaiKhoan").removeAttr("disabled","false");
    });

    $("body").delegate("#btnThem","click",function() {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        
        var isValid = true;

        isValid &= validation.kiemTraRong(taiKhoan,"#tbTaiKhoan","(*)Vui lòng nhập vào tài khoản")
        //&& validation.kiemTraTrungTaiKhoan(taiKhoan,"#tbTaiKhoan","(*)Tài khoản bị trùng");
        && validation.kiemTraDoDai(taiKhoan,"#tbTaiKhoan","(*)Vui lòng nhập từ 6-12 ký tự",6,12);
        isValid &= validation.kiemTraRong(hoTen,"#tbHoTen","(*)Vui lòng nhập vào họ tên");
        isValid &= validation.kiemTraRong(matKhau,"#tbPass","(*)Vui lòng nhập vào password");
        isValid &= validation.kiemTraRong(email,"#tbEmail","(*)Vui lòng nhập vào email") 
        && validation.kiemTraEmail(email,"#tbEmail","(*) Mail phải có @");
        console.log(isValid);
        isValid &= validation.kiemTraRong(soDT,"#tbSDT","(*)Vui lòng nhập vào số điện thoại")
        && validation.kiemTraDoDai(soDT,"#tbSDT","(*)Vui lòng nhập 10-11 số",10,11);
        

        if(isValid){
            var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT);
            
            danhSachNguoiDung.themNguoiDung(nguoiDung);
            taoBang(danhSachNguoiDung.mangNguoiDung);
            setLocalStorage();
        }
        
    });      
    function taoBang(dsnd){
        var tblBody = $("#tblDanhSachNguoiDung");
        var content = ``;
        danhSachNguoiDung.mangNguoiDung.map(function(item, index) {
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.matKhau}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>
                    <button id="btnSua" class="btn btn-primary" data-toggle="modal" data-target="#myModal" 
                    data-taikhoan="${item.taiKhoan}">Sửa</button>
                    <button id="btnXoa" class="btn btn-danger" data-taikhoan="${item.taiKhoan}">Xóa</button>
                </td>
            </tr>
            `;
    
        });
        tblBody.html(content);
    };
    
    $("body").delegate("#btnSua","click",function(taiKhoan){

        
        //Heading modal
        var title = "Sửa thông tin người dùng";
        $(".modal-title").html(title);
        $("#btnThem").css({"display":"none"});     
        var footer = `
        <button id ='btnCapNhat' class='btn btn-success' >Cập nhật</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `;

        $(".modal-footer").html(footer);

        var taiKhoan = $(this).data("taikhoan");             

        var nguoidung = danhSachNguoiDung.layThongTinNguoiDung(taiKhoan);

        var tk = $("#TaiKhoan").val(nguoidung.taiKhoan); 
        $("#TaiKhoan").attr("disabled","true");

        $("#HoTen").val(nguoidung.hoTen);
        $("#MatKhau").val(nguoidung.matKhau);
        $("#Email").val(nguoidung.email);
        $("#SoDienThoai").val(nguoidung.soDT);


    });
    $("body").delegate("#btnCapNhat","click",function(){
        //var taiKhoan = $(this).data("taikhoan");
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();
        
        var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,sdt);

        danhSachNguoiDung.capNhatNguoiDung(nguoiDung);      

        taoBang(danhSachNguoiDung.mangNguoiDung);    
        setLocalStorage();  

    });
    $("body").delegate("#btnXoa","click",function(){
        var taiKhoan = $(this).data("taikhoan"); 
        console.log(taiKhoan);
        danhSachNguoiDung.xoaNguoiDung(taiKhoan);
        taoBang(danhSachNguoiDung.mangNguoiDung);
        setLocalStorage();
    });
    function setLocalStorage() {
        localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung.mangNguoiDung));
      };
      
      function getLocalStorage() {
        if (localStorage.getItem("DSND") != null) {
            danhSachNguoiDung.mangNguoiDung = JSON.parse(localStorage.getItem("DSND"));
            taoBang(danhSachNguoiDung.mangNguoiDung);
        }
    };

    $("#search").keyup(function (){
        var value = $(this).val().toLowerCase();
        $("#tblDanhSachNguoiDung tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) >-1)
        });
       
    });
   
    // $("#search").keyup(function (){
    //     console.log("tim kiem 1 ");
    //     var chuoiTimKiem = $("search").val();
    //     console.log("tim kiem 2");
    //     var mangTimKiem = danhSachNguoiDung.timKiemNguoiDung(chuoiTimKiem);
    //     console.log("tim kiem 3");
    //     taobang(mangTimKiem);
    //     console.log("tim kiem 4");
    // });
    
});




