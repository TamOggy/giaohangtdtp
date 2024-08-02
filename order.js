const datas = {
    data: [],
    lastBillCode: "",
  };
  
  // load Data từ localStorage về datas
  window.addEventListener("load", () => {
    const dataLocal = JSON.parse(localStorage.getItem("bill"));
    for (const value of dataLocal) {
      datas.data.push(value);
    }
    datas.lastBillCode = JSON.parse(localStorage.getItem("bill"))[
      JSON.parse(localStorage.getItem("bill")).length - 1
    ].billCode;
    renders();
  });
  
  // tìm kiếm
  function filterSearch() {
    const valueSearch = document.getElementById("search-btn-id").value;
    const table = document.getElementById("table");
    const tr = table.getElementsByTagName("tr");
    if (!valueSearch) {
      for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "";
      }
    } else {
      for (let j = 1; j < tr.length; j++) {
        tr[j].style.display = "none";
        const td = tr[j].getElementsByTagName("td");
        if (valueSearch == td[1].innerHTML) {
          tr[j].style.display = "";
        }
      }
    }
  }
  
  // mở form
  document.getElementById("btn-add").addEventListener("click", () => {
    document.getElementById("form-id").style.display = "grid";
  });
  
  // đóng form
  document.getElementById("exit-form-btn").addEventListener("click", () => {
    document.getElementById("form-id").style.display = "none";
  });
  // ---------------------------------------------------------------------------------------------------------------
  // tạo đơn và lưu đơn
  document.getElementById("form-id").addEventListener("submit", function (e) {
    e.preventDefault();
    const userInput = {
      numericalOrder: datas.data.length + 1,
  
      billCode: setBillCode(),
  
      createTime: setTime(),

      status:'Đơn vừa được tạo'
    };
  
    const inputdata = new FormData(this);
    inputdata.forEach((value, key) => {
      userInput[key] = value;
    });
    datas.data.push(userInput);
    localStorage.setItem("bill", JSON.stringify(datas.data));
    render(userInput);
    location.reload();
    
  });
  
  // set time cho đơn hàng
  function setTime() {
    // Tạo đối tượng Date cho thời gian hiện tại
    const now = new Date();
  
    // Định dạng ngày theo kiểu Việt Nam (ngày/tháng/năm)
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const vietnamDateTime = now.toLocaleDateString("vi-VN", options);
  
    return vietnamDateTime;
  }
  
  // set mã đơn cho đơn hàng
  function setBillCode() {
    if (datas.lastBillCode === "") {
      datas.lastBillCode = "000001";
      return "000001";
    } else {
      let numInt =
        parseInt(
          JSON.parse(localStorage.getItem("bill"))[
            JSON.parse(localStorage.getItem("bill")).length - 1
          ].billCode
        ) + 1;
      let formatNum = numInt.toString().padStart(6, "0");
      return formatNum;
    }
  }
  
  // render từng bill khi thêm mới
  // Sửa button để dễ thao tác click (Phước)
  function render(ord) {
    const tbody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = ` <tr>
              <td>${ord.numericalOrder}</td>
              <td onclick="getBillCode(${ord.billCode})">${ord.billCode}</td>
              <td>${ord.content}</td>
               <td>${ord.cod}</td>
               <td>${ord.createTime}</td>
              <td><button class="btn-modal" onclick="showModal()"><i class="fa-solid fa-caret-down fa-xl" onclick="getBillCode(${ord.billCode})"></i></button></td>
          </tr> `;
    // <td>${userInput.sender}</td>
    // <td>${userInput.numOfSender}</td>
    // <td>${userInput.receiver}</td>
    // <td>${userInput.numOfReceiver}</td>
    // <td>${userInput.address}</td>
    // <td>Đơn vừa được tạo</td>
    // onclick="getBillCode(${ord.billCode})"
    tbody.appendChild(tr);
  }
  
  // render tất cả bill ra UI khi load
  function renders() {
    for (let i = 0; i <= datas.data.length; i++) {
      render(datas.data[i]);
    }
  }
  
  
  
  
  // ------------------------------------------------------------------------------------------------------
  // lấy hàng có chứa billcode(Mã vận đơn) tương ứng trong localStorage
  let editingBillcode = '';

  function getBillCode(code) {
    let formattedCode = code.toString().padStart(6, "0");
    editingBillcode = formattedCode ;
    const vl = JSON.parse(localStorage.getItem("bill"));
    for (let i of vl) {
      if (i.billCode === formattedCode) {
        return renderModal(i);
      }
    }
  }
  
  // -----------------------------------------------------------------------------------------------
  // Modal thông tin khách hàng
  
  const modal = document.getElementById("modal");
  
  // Đóng modal
  const btnClosed = document.getElementById("btn-closed");
  btnClosed.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Mở modal thông tin người dùng
  function showModal(billcode) {
    if ((modal.style.display = "none")) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }
  
  // Xóa thông tin người dùng
  
  function deleteUser(code) {
    const tbodyModal = document.getElementById("tbody-modal");
  
    let formattedCode = code.toString().padStart(6, "0");
    const vl = JSON.parse(localStorage.getItem("bill"));
    const newUser = vl.filter((item) => item.billCode !== formattedCode);
  
    datas.data.push(newUser);
    localStorage.setItem("bill", JSON.stringify(newUser));
    tbodyModal.innerHTML = "";
    render(datas.data);
    location.reload();
  }
  
// Edit modal thông tin người dùng
  const btnEdit = document.getElementById("btn-edit");
  const btnExitEdit = document.getElementById("exit-form-edit");
  const formEdit = document.getElementById("form-edit");
  const btnSave = document.getElementById("btn-save");
  
        // Mở form-edit
        btnEdit.addEventListener("click", () => {
            formEdit.style.display = "grid";
          });
  
  
        // đóng form-edit
        btnExitEdit.addEventListener("click", () => {
            formEdit.style.display = "none";
          });
  
    
        // Lưu thông tin người dùng
  
 
 
document.getElementById('form-edit').addEventListener('submit', function(event) {
  event.preventDefault();      
  // function saveOder(){
  const storedBill = localStorage.getItem('bill')
  const billData = JSON.parse(storedBill)
  const bill = billData.find(({billCode}) => billCode === editingBillcode );


  //Xét giá trị Ob
  const contentEdit = document.getElementById("content-edit").value
  const codEdit = document.getElementById("cod-edit").value
  const senderEdit = document.getElementById("sender-edit").value
  const numOfSenderEdit = document.getElementById("numOfSender-edit").value
  const receiverEdit = document.getElementById("receiver-edit").value
  const numOfReceiverEdit = document.getElementById("numOfReceiver-edit").value
  const addressEdit = document.getElementById("address-edit").value

  //gán giá trị
  bill.content = contentEdit
  bill.cod = codEdit
  bill.sender = senderEdit
  bill.numOfSender = numOfSenderEdit
  bill.receiver = receiverEdit
  bill.numOfReceiver = numOfReceiverEdit
  bill.address = addressEdit

  //upload
  localStorage.setItem('bill', JSON.stringify(billData))

  location.reload()
});


  
  // Render chi tiết UI
  function renderModal(ord) {
    const tbodyModal = document.getElementById("tbody-modal");
    const tr = document.createElement("tr");
  
    tr.innerHTML = ` <tr>
              <td>1</td>
              <td>${ord.billCode}</td>
              <td>${ord.content}</td>
              <td>${ord.cod}</td>
              <td>${ord.createTime}</td>
              <td>${ord.sender}</td>
              <td>${ord.numOfSender}</td>
              <td>${ord.receiver}</td>
              <td>${ord.numOfReceiver}</td>
              <td>${ord.address}</td>
              <td>Đơn vừa được tạo</td>
              <td><i class="fa-solid fa-trash" onclick="deleteUser(${ord.billCode})"></i></td>
          </tr> `;
  
    tbodyModal.innerHTML = "";
    tbodyModal.appendChild(tr);
  }

  // Tên người dùng hiển thị
  const btnUser = document.getElementById('header__navbar-button--user')
window.onload = function () {
    const userData = JSON.parse(localStorage.getItem('userData'))
    btnUser.innerText = `Hi ${userData.username}`;
}