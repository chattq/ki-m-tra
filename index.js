
// chọn nút add
var addInfor = document.querySelectorAll(".add");
addInfor.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var btnAdd = e.target.parentElement.parentElement;
    var codeProduct = btnAdd.querySelector("#product-code").value;
    var nameProduct = btnAdd.querySelector("#product-name").value;
    var priceProduct = btnAdd.querySelector("#product-price").value;
    var dateProduct = btnAdd.querySelector("#product-date").value;
    var expiryProduct = btnAdd.querySelector("#product-expiry").value;
    var numberProduct = btnAdd.querySelector("#product-number").value;
    error(codeProduct,nameProduct,priceProduct,dateProduct,numberProduct,expiryProduct);
  });
});
// check lỗi
function error(codeProduct,nameProduct,priceProduct,dateProduct,numberProduct,expiryProduct){
    // check mã sản phẩm
  if (_.isEmpty(codeProduct)) {
    codeProduct = "";
    document.querySelector("#code-error").innerHTML =
      "Vui Lòng Nhập Mã Sản Phẩm";
  } else {
    document.querySelector("#code-error").innerHTML = "";
  }
  // check tên sản phẩm
  if (_.isEmpty(nameProduct)) {
    nameProduct = "";
    document.querySelector("#name-error").innerHTML =
      "Vui lòng nhập tên sản phẩm";
  } else if (nameProduct.trim().length < 6) {
    nameProduct = "";
    document.querySelector("#name-error").innerHTML =
      "tên sản phẩm không được nhỏ hơn 6 ký tự";
  } else {
    document.querySelector("#name-error").innerHTML = "";
  };
  // check giá sản phẩm
  if (_.isEmpty(priceProduct)) {
    priceProduct = "";
    document.querySelector("#price-error").innerHTML = "Vui lòng nhập dữ liệu";
  }else if(priceProduct < 0){
    priceProduct = ""
    document.querySelector("#price-error").innerHTML = "dữ liệu nhập vào không đúng";
  }else {
    document.querySelector("#price-error").innerHTML = "";
  };
  // check ngày nhập hàng
  if (_.isEmpty(dateProduct)) {
    dateProduct = "";
    document.querySelector("#date-error").innerHTML =
      "Vui lòng nhập thời gian của sản phẩm";
  } else {
    document.querySelector("#date-error").innerHTML = "";
  };
  // check hạn sử dụng
  if (_.isEmpty(expiryProduct)) {
    expiryProduct = "";
    document.querySelector("#expiry-error").innerHTML =
      "Vui lòng nhập thời gian của sản phẩm";
  } else {
    document.querySelector("#expiry-error").innerHTML = "";
  };
  // check số lượng trong kho
  if (_.isEmpty(numberProduct)) {
    numberProduct = "";
    document.querySelector("#number-error").innerHTML = "Hãy nhập số lượng ";
  }else if(numberProduct < 0){
    numberProduct = ""
    document.querySelector("#number-error").innerHTML = "dữ liệu nhập vào không đúng";
  } else {
    document.querySelector("#number-error").innerHTML = "";
  };
  if (codeProduct && nameProduct && priceProduct && dateProduct && numberProduct && expiryProduct) {
    // lưu data
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    itemList.push({
      codeProduct: codeProduct.toUpperCase(),
      nameProduct: nameProduct,
      priceProduct: priceProduct,
      numberProduct: numberProduct,
      expiryProduct: expiryProduct,
      dateProduct: dateProduct,
    });
    localStorage.setItem("itemList", JSON.stringify(itemList));
    document.querySelector("#product-code").value = '';
    document.querySelector("#product-name").value = '';
    document.querySelector("#product-price").value = '';
    document.querySelector("#product-date").value = '';
    document.querySelector("#product-expiry").value = '';
    document.querySelector("#product-number").value = '';
  };
   render()
};
// in ra dữ liệu
function render() {
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    var tableProduct = document.getElementById("table-product");
    if(itemList == ""){
      tableProduct.innerHTML = `
      <thead>
        <tr class="title-table" style="background-color: gray;">
            <th scope="col">STT</th>
            <th scope="col">Mã Sản Phẩm</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá Sản Phẩm</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Ngày Nhập</th>
            <th scope="col">Hạn Sử Dụng</th>
            <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody id = "tbody-infor">
        <tr id = "infor-product" >
            <td colspan ="8" style ="text-align:center" >Không có dữ liệu</td>
        </tr>       
      </tbody>`;
    }else{
    tableProduct.innerHTML = `<thead>
      <tr class="title-table" style="background-color: gray;">
          <th scope="col">STT</th>
          <th scope="col">Mã Sản Phẩm</th>
          <th scope="col">Tên Sản Phẩm</th>
          <th scope="col">Giá Sản Phẩm</th>
          <th scope="col">Số Lượng</th>
          <th scope="col">Ngày Nhập</th>
          <th scope="col">Hạn Sử Dụng</th>
          <th scope="col">Action</th>
      </tr>
    </thead>`;
    itemList.forEach((item, index) => {
    var itemSTT = index;
    tableProduct.innerHTML += `
    </tbody id = "tbody-infor">
        <tr id = "product-change" >
          <th class ="stt-product" scope="row">${itemSTT + 1}</th>
          <td class ="code-product">${item.codeProduct}</td>
          <td class ="name-product">${item.nameProduct}</td>
          <td class ="price-product">${item.priceProduct}</td>
          <td class ="number-product">${item.numberProduct}</td>
          <td class ="date-product">${item.dateProduct}</td>
          <td class ="expiry-product">${item.expiryProduct}</td>
          <td style ="text-align:center">
            <button onclick = "edit(${itemSTT})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="edit">Chỉnh sửa thông tin</button>
            <button onclick="deleteStore(${itemSTT})"class="delete-product">Xóa Sản Phẩm</button>
          </td> 
        </tr>  
        </tbody>`;
      });
    };
    // lấy dữ liệu để chỉnh sửa lại thông tin
    var editInfor = document.querySelectorAll(".edit");
    editInfor.forEach(function(btn){
      btn.addEventListener("click", function(c){
        var btnEdit = c.target.parentElement.parentElement;
        var sttEdit = btnEdit.querySelector('.stt-product').innerText;
        var indexEdit = sttEdit - 1;
        var codeEdit = btnEdit.querySelector('.code-product').innerText;
        var nameEdit = btnEdit.querySelector('.name-product').innerText;
        var priceEdit = btnEdit.querySelector('.price-product').innerText;
        var numberEdit = btnEdit.querySelector('.number-product').innerText;
        var dateEdit = btnEdit.querySelector('.date-product').innerText;
        var expiryEdit = btnEdit.querySelector('.expiry-product').innerText;
        editDataShop(indexEdit,codeEdit,nameEdit,priceEdit,numberEdit,expiryEdit,dateEdit);
      });
    });
};
function deleteStore(stt) {
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    itemList.splice(stt, 1);
    localStorage.setItem("itemList", JSON.stringify(itemList));
    render();
};
function editDataShop(indexEdit,codeEdit,nameEdit,priceEdit,numberEdit,expiryEdit,dateEdit){
    document.querySelector("#product-code-modal").value = codeEdit;
    document.querySelector("#product-index-modal").value = indexEdit;
    document.querySelector("#product-name-modal").value = nameEdit;
    document.querySelector("#product-price-modal").value = priceEdit;
    document.querySelector("#product-date-modal").value = dateEdit;
    document.querySelector("#product-expiry-modal").value = expiryEdit;
    document.querySelector("#product-number-modal").value = numberEdit;
};
// lưu dữ liệu từ modal
var saveModal = document.querySelectorAll('.save-modal');
saveModal.forEach(function(btn){
  btn.addEventListener('click', function(a){
    var btnSave = a.target.parentElement.parentElement.parentElement;
    var codeModal = btnSave.querySelector('#product-code-modal').value;
    var nameModal = btnSave.querySelector("#product-name-modal").value;
    var priceModal = btnSave.querySelector("#product-price-modal").value;
    var dateModal = btnSave.querySelector("#product-date-modal").value;
    var expiryModal = btnSave.querySelector("#product-expiry-modal").value;
    var numberModal = btnSave.querySelector("#product-number-modal").value;
    editStore(codeModal,nameModal,priceModal,dateModal,expiryModal,numberModal);
  });
});
// chỉnh sửa dữ liệu và in ra ngoài kho từ modal
function editStore(codeModal,nameModal,priceModal,dateModal,expiryModal,numberModal){
  var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
  let index = document.querySelector("#product-index-modal").value;
  itemList[index] = {
    codeProduct: codeModal.toUpperCase(),
    nameProduct: nameModal,
    priceProduct: priceModal,
    numberProduct: numberModal,
    expiryProduct: expiryModal,
    dateProduct: dateModal,
  }
  localStorage.setItem("itemList", JSON.stringify(itemList));
  render()
};
// chức năng search
function search(){
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    let valueSearchInput = document.getElementById('search').value;
    var ketQuaSearch = itemList.filter(function(value){
      return value.nameProduct.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
             value.codeProduct.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
             value.priceProduct.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
             value.numberProduct.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
             value.expiryProduct.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
             value.dateProduct.toUpperCase().includes(valueSearchInput.toUpperCase())
    });
    console.log(ketQuaSearch);
    var tableProduct = document.getElementById("table-product");
    if(ketQuaSearch == ""){
        tableProduct.innerHTML = `
        <thead>
          <tr class="title-table" style="background-color: gray;">
              <th scope="col">STT</th>
              <th scope="col">Mã Sản Phẩm</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Giá Sản Phẩm</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Ngày Nhập</th>
              <th scope="col">Hạn Sử Dụng</th>
              <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id = "tbody-infor">
          <tr id = "infor-product" >
              <td colspan ="8" style ="text-align:center" >Không có dữ liệu</td>
          </tr>       
        </tbody>`;
      }else{
      tableProduct.innerHTML = `<thead>
        <tr class="title-table" style="background-color: gray;">
            <th scope="col">STT</th>
            <th scope="col">Mã Sản Phẩm</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá Sản Phẩm</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Ngày Nhập</th>
            <th scope="col">Hạn Sử Dụng</th>
            <th scope="col">Action</th>
        </tr>
      </thead>`;
      ketQuaSearch.forEach((item, index) => {
      var itemSTT = index;
      tableProduct.innerHTML += ` </tbody id = "tbody-infor">
          <tr id = "product-change" >
            <th class ="stt-product" scope="row">${itemSTT + 1}</th>
            <td class ="code-product">${item.codeProduct}</td>
            <td class ="name-product">${item.nameProduct}</td>
            <td class ="price-product">${item.priceProduct}</td>
            <td class ="number-product">${item.numberProduct}</td>
            <td class ="date-product">${item.dateProduct}</td>
            <td class ="expiry-product">${item.expiryProduct}</td>
            <td style ="text-align:center">
              <button onclick = "edit(${itemSTT})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="edit">Chỉnh sửa thông tin</button>
              <button onclick="deleteStore(${itemSTT})"class="delete-product">Xóa Sản Phẩm</button>
            </td> 
          </tr>  
          </tbody>`;
        });
    };
};
// chức năng cập nhất cửa hàng
function outStock(){
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    let valueSlelectStock = document.getElementById('out-stock').value;
    let indexStock = []; //lấy các giá trị id thỏa mãn điều kiện
    var choose = document.querySelectorAll('#product-change');
    var kq = itemList.filter((el,index) => {
      // sắp hết hàng
      if(valueSlelectStock == "a" && el.numberProduct <= 10){
        indexStock.push(index);
        for(var i = 0;  i < indexStock.length; i++){
            choose[indexStock[i]].style.backgroundColor = "blue"
            choose[indexStock[i]].style.backgroundColor = "none"
        };
      }
      // hết hàng
      if(valueSlelectStock == "b" && el.numberProduct == 0){
        indexStock.push(index);
        for(var i = 0;  i < indexStock.length; i++){
            choose[indexStock[i]].style.backgroundColor = "red"
            choose[indexStock[i]].style.backgroundColor = "none"
        };
      }
      //hạn sử dụng
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      var date = year + '-' + month + '-' + day;
      var date2 = year + '-' + month + '-0' + day;
      // hết hạn sử dụng
      if(valueSlelectStock == "2" && (el.expiryProduct == date || el.expiryProduct == date2)){
        indexStock.push(index);
        for(var i = 0;  i < indexStock.length; i++){
            choose[indexStock[i]].style.backgroundColor = "pink"
            choose[indexStock[i]].style.backgroundColor = "none"
        };
      }
      // còn bao nhiêu ngày là hết hạn
      var splitExpiry = el.expiryProduct.split('-')
      var dayOut = day - splitExpiry[2];
      var monthOut = month - splitExpiry[1];
      if(valueSlelectStock == "1" && dayOut < 5 && monthOut < 12){
        indexStock.push(index);
        for(var i = 0;  i < indexStock.length; i++){
            choose[indexStock[i]].style.backgroundColor = "yellowgreen"
            choose[indexStock[i]].style.backgroundColor = "none"
        };
      }
    });
};
function sort(){
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    let valueSlelectStock = document.getElementById('sort-store').value;
      // chức năng sort-name
      var kQSortName = itemList.sort((a,b) =>{
        if(valueSlelectStock === "3"){
          return a.nameProduct.localeCompare(b.nameProduct)
        }else if(valueSlelectStock === "4"){
          return a.dateProduct.localeCompare(b.dateProduct)
        }
      });
      var tableProduct = document.getElementById("table-product");
        tableProduct.innerHTML = `<thead>
        <tr class="title-table" style="background-color: gray;">
            <th scope="col">STT</th>
            <th scope="col">Mã Sản Phẩm</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá Sản Phẩm</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Ngày Nhập</th>
            <th scope="col">Hạn Sử Dụng</th>
            <th scope="col">Action</th>
        </tr>
      </thead>`;
          kQSortName.forEach((item, index) => {
          var itemSTT = index;
          tableProduct.innerHTML += `</tbody id = "tbody-infor">
          <tr id = "product-change" >
            <th class ="stt-product" scope="row">${itemSTT + 1}</th>
            <td class ="code-product">${item.codeProduct}</td>
            <td class ="name-product">${item.nameProduct}</td>
            <td class ="price-product">${item.priceProduct}</td>
            <td class ="number-product">${item.numberProduct}</td>
            <td class ="date-product">${item.dateProduct}</td>
            <td class ="expiry-product">${item.expiryProduct}</td>
            <td style ="text-align:center">
              <button onclick = "edit(${itemSTT})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="edit">Chỉnh sửa thông tin</button>
              <button onclick="deleteStore(${itemSTT})"class="delete-product">Xóa Sản Phẩm</button>
            </td> 
          </tr>  
          </tbody>`;
      });
}
