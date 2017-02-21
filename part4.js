function ChessDesk(node){
  this.desk = function(){
    desk = document.createElement('div'); // формируем шахматную доску
    desk.className = 'desk';
    node.appendChild(desk);
  }

  this.tup = function(){
    tup = document.createElement('div'); 
    tup.className = 'tup';
    node.appendChild(tup);
  }

  this.tdown = function(){
    tdown =document.createElement('div'); 
    tdown.className = 'tdown';
    node.appendChild(tdown);
  }

  this.tabdown = function(){
    for (var i = 0; i <8;i++){  //буквы снизу
    tabdown = document.createElement('div');
    tabdown.className = 'tabdown';
    tabdown.innerHTML = String.fromCharCode(65+i);
    tdown.appendChild(tabdown);
    }
  }

  this.tabup = function(){
    for (var i = 0; i <8;i++){
    tabup = document.createElement('div'); // буквы сверху
    tabup.className = 'tabup';
    tabup.innerHTML = String.fromCharCode(65+i);
    tup.appendChild(tabup);
    }
  }

  this.sqr = function(){
    for(var i= 1 ;i<= 8;i++){
      for(var j = 0;j<8;j++){
          square = document.createElement('div');
          square.className = (i+j)%2 ? 'black' : 'white';
          square.id = String.fromCharCode(65+j)+i;
          desk.appendChild(square);
       }
    }
  }

  this.colleft = function(){
    colleft = document.createElement('div'); //боковые цифры
    colleft.className ='colleft';
    node.appendChild(colleft);
  }

  this.colleftNum = function(){
    for (var i = 1; i <=8;i++){
      var number = document.createElement('div'); //создание цифр
      number.className = 'number';
      number.innerHTML = ''+i;
      colleft.appendChild(number);
    }
  }

  this.colright = function(){
    colright = document.createElement('div'); //боковые цифры
    colright.className ='colright';
    node.appendChild(colright);
  }

  this.colrightNum = function(){
    for (var i = 1; i <=8;i++){
      var number2 = document.createElement('div'); //создание цифр
      number2.className = 'number2';
      number2.innerHTML = ''+i;
      colright.appendChild(number2);
    }
  }

  this.eventClick = function () {
    desk.onclick = function(event){
    coord = document.getElementById('coordinates');
    var x = document.getElementsByClassName('active')[0];
    if(x != undefined)x.classList.remove('active');
    event.target.classList.add('active'); 
    coord.innerHTML = event.target.id;
    }
  }

  this.eventKeyBoard = function(){
    document.body.onkeydown = function(event){ 
      if(event.keyCode == 39){
        coord = document.getElementById('coordinates');
        elem = document.getElementsByClassName('active')[0].nextSibling;
        if(elem ==null){
          elem = desk.children[0];
        }
        x= document.getElementsByClassName('active')[0];
        if(x != undefined)x.classList.remove('active');
        elem.classList.add('active'); 
        coord.innerHTML = elem.id;
      }
      else if(event.keyCode == 37){
        coord = document.getElementById('coordinates');
        elem = document.getElementsByClassName('active')[0].previousSibling;
        if(elem ==null){
          elem = desk.children[63];
        }
        x= document.getElementsByClassName('active')[0];
        if(x != undefined)x.classList.remove('active');
        elem.classList.add('active'); 
        coord.innerHTML = elem.id;
      }
      else if(event.keyCode == 38){
        coord = document.getElementById('coordinates');
        arr=[].map.call(desk.children,function(el){return el});
        i=arr.indexOf(document.getElementsByClassName('active')[0]);
        desk.children[i].classList.remove('active');
        if(i<=7 && i!=0){
          desk.children[i+55].classList.add('active');
          a=i+55;
        }
        else if(i==0){
          desk.children[63].classList.add('active');
          a=63;
        }
        else {
          desk.children[i-8].classList.add('active');
          a=i-8;
        }
        coord.innerHTML = desk.children[a].id;
      }
      else if(event.keyCode == 40){
        coord = document.getElementById('coordinates');
        arr=[].map.call(desk.children,function(el){return el});
        i=arr.indexOf(document.getElementsByClassName('active')[0]);
        desk.children[i].classList.remove('active');
        if(i>=56 && i!=63){
          desk.children[i%8+1].classList.add('active');
          a=i%8+1;
        }
        else if(i==63){
          desk.children[0].classList.add('active');
          a=0;
        }
        else {
          desk.children[i+8].classList.add('active');
          a=i+8;
        }
        coord.innerHTML = desk.children[a].id;
      }
    }
  }

  this.exe = function(){
    this.desk();
    this.sqr();
    this.eventClick();
    this.eventKeyBoard();
  }
    this.extra = function(){
    this.tup();
    this.tdown();
    this.tabdown();
    this.tabup();
    this.colleft();
    this.colleftNum();
    this.colright();
    this.colrightNum();
  }

  this.gettingCoord = function(url){
    var xhr = new XMLHttpRequest(); //создаем запрос
    xhr.open('GET',url,true); // настраиваем
    xhr.send(); //посылаем
    xhr.onreadystatechange = function(){
      if(xhr.readyState != 4) return; // если еще ничего не получили-ничего не надо возвращать
      if(xhr.status != 200){
        alert(xhr.status +':'+xhr.statusText); // если есть ошибки выводим айди ошибки
      }
      else{
        var array = JSON.parse(xhr.responseText);
        for(var i =0;i< array.length;i++){
          for(var j =0;j< array[i].position.length;j++){
            array[i].position[j] = array[i].position[j].toUpperCase().replace(/[^A-Z0-9]/g,''); 
            /*
            Новая строка из 3 дз!Убираем все лишние знаки:пробельные знаки,не латиницу тд
            */
            var sqrIcon = document.getElementById(array[i].position[j]);
            sqrIcon.innerHTML = '<img src = \"'+array[i].img+'\">';
          }
        }
      }
    }
  };
  this.fullexe = function(url){
    this.exe();
    this.extra();
    this.gettingCoord(url);
  }
}

var desk01 = new ChessDesk(document.body);
desk01.fullexe('http://localhost/coord.json');