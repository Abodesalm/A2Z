
let titlee = document.getElementById("titlee");
let disc = document.getElementById("disc");
let plat = document.getElementById("platform");
let url = document.getElementById("url");
let addd = document.getElementById("addd");
let contain = document.getElementById("filesdiv");
let outputf = document.getElementById("filesout");
let mode = 'add';
let index;
let nav = document.getElementById("nav");
nav.innerHTML = `
  <div class="container-fluid">
        <a class="navbar-brand green fs-1 col-3">A to Z</a>
        <form class="d-flex col-8" role="search">
          <input class="form-control me-2" type="search" placeholder="search" id="search" onkeyup="searchd(this.value.toLowerCase())" />
        </form>
      </div>
`
let srch = document.getElementById("search");
let sbtn = document.getElementById("sbtn");
// let file = `<div class="file col-5 col-md-4 col-lg-3"><h3 class="green mt-2">${titlee.value}</h3><p class="mt-2 para">${disc.value}</p><span class="mt-1 green d-block">${plat.value}</span><a href="${url.value}" class="btn mt-1 mb-1 btn-success">Download</a></div>`;


function cleard(){
  titlee.value = '';
  disc.value ='';
  plat.value ='';
  url.value ='';
}


// create
let dataf;
if (localStorage.product != null){
  dataf = JSON.parse(localStorage.product);
}else{dataf = []}
addd.onclick = function(){
  let newFile = {
    titlee:titlee.value.toLowerCase(),
    disc:disc.value.toLowerCase(),
    plat:plat.value.toLowerCase(),
    url:url.value.toLowerCase(),
  };
  if (titlee.value != '' && disc.value != '' && plat.value != '' && url.value != ''){
      if (mode === 'add'){
      dataf.push(newFile);
    }else{
      dataf[index] = newFile;
      mode = 'add';
      addd.innerHTML = 'add'
    }
  }
  
  
  localStorage.setItem('product', JSON.stringify(dataf));
  cleard();
  showd();
  
};
function showd(){
  let files = '';
  for (let i=0;i<dataf.length;i++){
    files += `
      <div class="file d-block col-5 col-md-4 col-lg-3 mt-3" id="${i}">
        <h3 class="green mt-2">${dataf[i].titlee}</h3>
        <p class="mt-2 para">${dataf[i].disc}
        </p>
        <span class="mt-1 green d-block">${dataf[i].plat}</span>
        <div onclick="updated(${i})" class="btn mt-1 mb-1 btn-warning d-block ed">edit</div>
        <div onclick="deleted(${i})" class="btn btn-danger ed">delete</div>
        <a href="${dataf[i].url}" target="_blank" class="btn mt-1 mb-1 btn-success d-block ed">visit</a></div>
      </div>
      `
  }
  contain.innerHTML = files;
}
showd();
function deleted(i){
  dataf.splice(i,1);
  localStorage.product = JSON.stringify(dataf);
  showd()
}
function updated(i){
  titlee.value = dataf[i].titlee;
  disc.value = dataf[i].disc;
  plat.value = dataf[i].plat;
  url.value = dataf[i].url;
  addd.innerHTML = "update";
  mode = 'update';
  index = i;
  scroll({
    top:0,
    behaviour:'smooth'
  })
  showd()
}
function searchd(valu){
  let filess = '';
  for (let i=0; i<dataf.length; i++){
    if(dataf[i].titlee.includes(valu)){
      filess += `
      <div class="file d-block col-5 col-md-4 col-lg-3 mt-3" id="${i}">
        <h3 class="green mt-2">${dataf[i].titlee}</h3>
        <p class="mt-2 para">${dataf[i].disc}
        </p>
        <span class="mt-1 green d-block">${dataf[i].plat}</span>
        <div onclick="updated(${i})" class="btn mt-1 mb-1 btn-warning d-block ed">edit</div>
        <div onclick="deleted(${i})" class="btn btn-danger ed">delete</div>
        <a href="${dataf[i].url}" target="_blank" class="btn mt-1 mb-1 btn-success d-block ed">visit</a></div>
      </div>
      `
    }
    contain.innerHTML = filess;
  }
}