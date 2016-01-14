

function izberiUcenca(element){
  var index = element.parentNode.parentNode.rowIndex;
  var seznam = document.getElementById("seznam");
  var ime = seznam.rows[index].cells[0].innerHTML;
  var priimek = seznam.rows[index].cells[1].innerHTML;
  var str = ime+" "+priimek;
  $("#vprasani").val(str);

}



function sendGrade() {
  var vprasani = document.getElementById("vprasani").value;
  if(vprasani == ""){
    console.log("null");
    return;
  }

  var ocena=document.getElementById("izberiOceno").value;
  if(ocena == "false"){
    console.log("null");
    return;
  }


  var arr = vprasani.split(/[ ]+/);
  arr[2] = ocena;
  var jsonObj = {
    ime: arr[0],
    priimek: arr[1],
    ocena: arr[2]
  };
  //console.log(jsonObj);




  var xmlhttp = new XMLHttpRequest();
  var url = "/ustno-ocena";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var response = JSON.parse(xmlhttp.responseText);
      console.log(response);
    }
    else {
      console.log('readyState=' + xmlhttp.readyState + ', status: ' + xmlhttp.status);
    }
  };
  xmlhttp.send(JSON.stringify(jsonObj));



  $("#uspeh3").html("<span class='label label-success'>Ocena je bila uspešno vnešena v e-Redovalnico!</span>");

}

function cleanList(){
  var seznam = document.getElementById("seznam");
  var dolzina = seznam.rows.length;
  for(var i = 1;  i < dolzina; i++){
    seznam.deleteRow(1);
  }
}

function sendClass(razred) {
  var id = razred;
  if(id == "false") {
    cleanList();
    return;
  }
  console.log("SENT");
  var xmlhttp = new XMLHttpRequest();
  var url = "/ustno-test";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      arr = JSON.parse(xmlhttp.responseText);
      //console.log(arr[0].ime);
      //console.log(arr.length);
      cleanList();

      for(var i = 0; i < arr.length; i++){
        var row = seznam.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = arr[i].ime;
        cell2.innerHTML = arr[i].priimek;
        cell3.innerHTML = '<button onclick="izberiUcenca(this)" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-arrow-right"></button>';
      }
    }
    else {
      console.log('readyState=' + xmlhttp.readyState + ', status: ' + xmlhttp.status);
    }
  };
  xmlhttp.send(id);
}

function naloziSeznam(){


  var razred = document.getElementById("izberiRazred").value;

  sendClass(razred);
/*
  var xmlhttp = new XMLHttpRequest();
  var url = "/ustno-test";
  var arr;
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      arr = JSON.parse(xmlhttp.responseText);
      console.log("DELAAAAAAAAAA", arr[1].ime);
      console.log(arr[0].ime);
      console.log(arr.length);



      var seznam = document.getElementById("seznam");

      var dolzina = seznam.rows.length;

      for(var i = 1;  i < dolzina; i++){
        seznam.deleteRow(1);
      }

      for(var i = 0; i < arr.length; i++){
        var row = seznam.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = arr[i].ime;
        cell2.innerHTML = arr[i].priimek;
        cell3.innerHTML = '<button onclick="izberiUcenca(this)" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-arrow-right"></button>';
      }


    }
    else {
      return;
    }

  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

*/


}

function dodajTabelaIzostanki() {

  var polnoIme="";
  polnoIme = document.getElementById("polnoIme").value;
  izbranaUra = document.getElementById("izberiUro").value;
  var loceno = polnoIme.split(/[ ]+/);
  if (loceno[0] == "" || loceno[1] == "" || loceno.length < 2 || izbranaUra == "false") {
    $("#obvestilo").html("<span class='label label-warning'>Vnesite zahtevane podatke!</span>");
  }

  else{
    document.getElementById("polnoIme").value = "";
    $("#obvestilo").html("");
    var tabela = document.getElementById("tabelaIzostanki");
    var row = tabela.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = loceno[0];
    cell2.innerHTML = loceno[1];
    cell3.innerHTML = '<button id="odstrani" class="btn btn-danger btn-xs" onclick="odstraniUcencaIzostanki(this)"><span class="glyphicon glyphicon-remove"></button>';
    //cDate();

  }

}

function odstraniUcencaIzostanki(element) {
  var index = element.parentNode.parentNode.rowIndex;
  var tabela = document.getElementById("tabelaIzostanki");
  tabela.deleteRow(index);
}

function datum(){
  var danes = new Date();
  var dd = danes.getDate();
  var mm = danes.getMonth()+1; //januar == 0
  var yyyy = danes.getFullYear();
  var danes = dd+'.'+mm+'.'+yyyy;
  return danes;
}

function odsotnost(){
  var tabela = document.getElementById("tabelaIzostanki");
  var ura = document.getElementById("izberiUro").value;
  var dolzina = tabela.rows.length;
  var jsonObj = [];
  for(var i = 1;  i < dolzina; i++){
    var ime = tabela.rows[i].cells[0].innerHTML;
    var priimek = tabela.rows[i].cells[1].innerHTML;
    var item = {};
    item["ime"] = ime;
    item["priimek"] = priimek;
    item["stUr"] = ura;
    jsonObj.push(item);
  }

  //console.log(jsonObj[0].ime, "AAAA");

  console.log(JSON.stringify(jsonObj));

  var xmlhttp = new XMLHttpRequest();
  var url = "/izostanek";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var response = JSON.parse(xmlhttp.responseText);
      console.log(response);
    }
    else {
      console.log('readyState=' + xmlhttp.readyState + ', status: ' + xmlhttp.status);
    }
  };
  xmlhttp.send(JSON.stringify(jsonObj));



  for(var i = 1;  i < dolzina; i++){
    tabela.deleteRow(1);
  }




  $("#uspeh").html("<span class='label label-primary'>Odsotnost je bila uspešno vnešena v bazo!</span>");
  $("#uspeh").fadeIn("slow");
  $("#obvestilo").html("");
  setTimeout(function() { $("#uspeh").fadeOut("slow"); }, 3000);

}

function initVal(){
  var danes = datum();
  document.getElementById("datum").placeholder = danes;
  document.getElementById("datum2").placeholder = danes;
  $(".type").click(function(){
   $(".type").removeClass("active");
   $(this).addClass("active");
  });
}
function cDate(element){
  var danes = datum();
  element.value = danes;
}

function vpisiDnevnik() {
  var polnoIme="";
  polnoIme = document.getElementById("polnoIme2").value;
  var komentar="";
  komentar = document.getElementById("comment").value
  var loceno = polnoIme.split(/[ ]+/);
  loceno[2] = komentar;
  if (loceno[0] == "" || loceno[1] == "" || loceno.length < 2 || komentar == "") {
    $("#obvestilo2").html("<span class='label label-warning'>Vnesite zahtevane podatke!</span>");
  }
  else{


    var xmlhttp = new XMLHttpRequest();
    var url = "/dnevnik";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.responseText);
        console.log("RESPONSE:", response);
        document.getElementById("polnoIme2").value = "";
        document.getElementById("comment").value = "";
        $("#obvestilo2").html("");
        $("#uspeh2").html("<span class='label label-danger'>Vpis v dnevnik ni bil uspešen, ker učenec ne obstaja!</span>");
        $("#uspeh2").fadeIn("slow");
        setTimeout(function() { $("#uspeh2").fadeOut("slow"); }, 5000);
        return;
      }
      else {
        console.log('readyState=' + xmlhttp.readyState + ', status: ' + xmlhttp.status);
      }
    };
    xmlhttp.send(JSON.stringify(loceno));
    document.getElementById("polnoIme2").value = "";
    document.getElementById("comment").value = "";
    $("#obvestilo2").html("");
    $("#uspeh2").html("<span class='label label-primary'>Vpis v dnevnik je bil uspešno vnešen</span>");
    $("#uspeh2").fadeIn("slow");
    setTimeout(function() { $("#uspeh2").fadeOut("slow"); }, 3000);
  }


}
