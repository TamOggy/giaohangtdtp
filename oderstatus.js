
function loadBill() {
    const urlParams = new URLSearchParams(window.location.search);
    const numBill = urlParams.get('billCode');

    const storedBill = localStorage.getItem('bill')
    console.log(numBill)
    if(!storedBill){
      alert('Không có dữ liệu đơn');
      return;
    }
    const billData = JSON.parse(storedBill)
    console.log(billData)
    console.log(billData.find(({billCode}) => billCode === numBill ))


    const bill = billData.find(({billCode}) => billCode === numBill );
    document.getElementById('displayBill').textContent = bill.billCode;
    document.getElementById('displayContent').textContent = bill.content;
    document.getElementById('displayDate').textContent = bill.createTime;
    document.getElementById('displayNamesent').textContent = bill.sender;
    document.getElementById('displayNumbersent').textContent = bill.numOfSender;
    document.getElementById('displayNamereceive').textContent = bill.receiver;
    document.getElementById('displayNumberreceive').textContent = bill.numOfReceiver;
    document.getElementById('displayAddress').textContent = bill.address;
    document.getElementById('displayStatus').textContent = bill.status;
}

window.onload = loadBill;