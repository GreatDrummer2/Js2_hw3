function correctEmail(){
  var elem = document.getElementById('form_1');
  elem.classList.remove(elem.classList[0]); 
  var str = elem.value;
  var arr = ['gmail.com','mail.ru','yahoo.com','yandex.ru','ukr.net'];
  var emailIndex;
  arr.forEach(function(item){
    var re = new RegExp('@' + item, 'gi');
    var brand = str.match(re);
    if(brand != null){
      emailIndex = brand;
    }
  }); 
  var nickName = str.match(/[0-9a-z]{3,}(?=@)/ig);
  var newStr = nickName + emailIndex;
  var clazName = newStr == str ? 'green' : 'red';
  elem.classList.add(clazName);
}

function correctPI(){
  var elem = document.getElementById('form_2');
  elem.classList.remove(elem.classList[0]); 
  var str = elem.value;
  var newStr = str.match(/\d{4} \d{6}/g);
  var clazName = newStr == str ? 'green' : 'red';
  elem.classList.add(clazName);
}
function correctPN(){
  var elem = document.getElementById('form_3');
  elem.classList.remove(elem.classList[0]); 
  var str = elem.value;
  var newStr = str.match(/\+\d\(\d{3}\)\-\d{3}\-\d{2}\-\d{2}/g);
  var clazName = newStr == str ? 'green' : 'red';
  elem.classList.add(clazName);
}