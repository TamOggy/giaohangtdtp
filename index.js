const selectTinh = document.getElementById('footer__item-input-select')
const selectHuyen = document.getElementById('footer__item-input-select-h')

const Tinh ={
    'Vĩnh Long': ['Tam Bình','Long Hồ', 'Trà Ôn' ,'Bình Minh'],
    'Cần Thơ'  : ['Ninh Kiểu', 'Cái Răng', 'Ô Môn','Thốt Nốt']
}

selectTinh.addEventListener('change',(event)=>{
  const listHuyen = Tinh[event.target.value]
  selectHuyen.innerHTML = ''
  listHuyen.forEach(Option => {
    const newOption = document.createElement('option')
    console.log(Option)
    newOption.innerText = Option
    selectHuyen.appendChild(newOption)
  });
})

document.getElementById('buttonSearch').addEventListener('click', function(event) {
  event.preventDefault();

  const numBill = document.getElementById('numberBill').value;

  const storedBill = localStorage.getItem('bill')
  console.log(numBill)
  if(!storedBill){
    alert('Không có dữ liệu đơn');
    return;
  }
  const billData = JSON.parse(storedBill)
  console.log(billData)
  console.log(billData.find(({billCode}) => billCode === numBill ))
  if(billData.find(({billCode}) => billCode === numBill )){
    window.location.href = "http://127.0.0.1:5500/oderstatus.html?billCode="+numBill;
  }
  else  {
  alert('Không có dữ liệu đơn');
}})
