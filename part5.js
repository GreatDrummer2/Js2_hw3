function correctEmail(){
  var elem = document.getElementById('form_1');
  elem.classList.remove(elem.classList[0]); 
  var str = elem.value;
  var emailIndex = str.match(/@gmail.com|@mail.ru|@yahoo.com|@yandex.ru|@ukr.net/ig);
  var nickName = str.match(/[0-9a-z]{3,}(?=@)/ig);
  var newStr = nickName + emailIndex;
  var clazName = newStr == str ? 'green' : 'red';
  elem.classList.add(clazName);
}