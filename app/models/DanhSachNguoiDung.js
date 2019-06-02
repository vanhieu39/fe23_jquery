function DanhSachNguoiDung() {
    this.mangNguoiDung = [];
  
    this.themNguoiDung = function(nguoiDung) {
      this.mangNguoiDung.push(nguoiDung);
    };
   
};

DanhSachNguoiDung.prototype.capNhatNguoiDung = function(ma){
  this.mangNguoiDung.forEach(element => {
    if(element.taiKhoan == ma.taiKhoan){
      element.taiKhoan = ma.taiKhoan;
      element.hoTen = ma.hoTen;
      element.matKhau  = ma.matKhau;
      element.email = ma.email;
      element.soDT = ma.soDT;
    }   
  });
};
DanhSachNguoiDung.prototype.layThongTinNguoiDung = function(tk){
  return this.mangNguoiDung.find(function(item){
    return tk == item.taiKhoan;
  });
};
DanhSachNguoiDung.prototype.xoaNguoiDung = function(matk){
    let viTri = this.mangNguoiDung.findIndex(function(item){
          return matk == item.taiKhoan;
    });
    this.mangNguoiDung.splice(viTri,1);
};
DanhSachNguoiDung.prototype.timKiemNguoiDung = function(chuoiTimKiem){
  var mangTimKiem = [];

  this.mangNguoiDung.map(function(item) {
    if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
      mangTimKiem.push(item);
    }
  });

  return mangTimKiem;
};