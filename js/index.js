var documentHTML=document;

var siteName = documentHTML.getElementById('siteName');
var siteURL = documentHTML.getElementById('siteURL');
var sites = [];
var errName = ``;
var errURL = ``;
var sitesInput;
var btnadd= documentHTML.getElementById('btnadd')
var btnUpdate=documentHTML.getElementById('btnUpdate')
var indexUpdat=0;
var searchInput=documentHTML.getElementById('searchInput')

if (localStorage.getItem("sites") != null) {
    sites = JSON.parse(localStorage.getItem("sites"))
    displaySites(sites)
}

btnadd.onclick= function(){
    addSite()
}

btnUpdate.onclick=function(){
    updateData()
}

searchInput.oninput=function(){
    search(this.value)
}

function addSite() {
    if (checkBox()) {
        sitesInput = {
            siteNameInput: siteName.value,
            siteURLInput: siteURL.value
        }
        sites.push(sitesInput);
        // alert("jj")
        localStorage.setItem("sites", JSON.stringify(sites))
        displaySites(sites);
        clearForm();
        errName = ``;
        errURL = ``;

    } else {
        alerterr();
    }
}


function clearForm() {
    siteName.value = '';
    siteURL.value = '';
    errName = ``;
    documentHTML.getElementById('errName').innerHTML = errName;
    errURL = ``;
    documentHTML.getElementById('errURL').innerHTML = errURL;


}

function displaySites(arr) {
    var siteList = ``;

    for (var i = 0; i < arr.length; i++) {
        siteList += `<tr class="">
        <td class="pe-5">${arr[i].siteNameInput}</td>
        <td>
        <button class="btnblue btn bg-primary text-white "><a href="${arr[i].siteURLInput}">Visit</a></button>
        <button onclick="setUpdateInput(${i})" class=" btn bg-warning text-white mx-1">Edit</button>
        <button onclick="deleteSite(${i})" class="btnred btn bg-danger text-white mx-1">Delete</button>
        </td>
    </tr>`;
        // console.log(siteName.value);
    }
    documentHTML.getElementById('tableSites').innerHTML = siteList;
}


function checkBox() {

    if (siteName.value == '' || siteURL.value == '') {
        return false;

    } else {
        return true;
    }
}

function alerterr() {
    if (siteName.value == '' && siteURL.value == '') {
        errName = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Name is required </div>`;
        documentHTML.getElementById('errName').innerHTML = errName;
        errURL = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Url Field is required </div>`;
        documentHTML.getElementById('errURL').innerHTML = errURL;
    } else if (siteName.value == '') {
        errName = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Name is required </div>`;
        documentHTML.getElementById('errName').innerHTML = errName;
    } else if (siteURL.value == '') {
        errURL = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Url Field is required </div>`;
        documentHTML.getElementById('errURL').innerHTML = errURL;
    }

}

function deleteSite(siteIndex) {
    sites.splice(siteIndex, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySites(sites);
}

function setUpdateInput(index) {
 //   console.log(sites[index]);
    indexUpdat=index;

    siteName.value=sites[index].siteNameInput;
    siteURL.value=sites[index].siteURLInput;

    btnadd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
    
}

function updateData() {
    sitesInput = {
        siteNameInput: siteName.value,
        siteURLInput: siteURL.value
    }
    
    sites.splice(indexUpdat,1,sitesInput);

    localStorage.setItem("sites", JSON.stringify(sites));

    displaySites(sites);

    clearForm();

    btnadd.classList.remove('d-none')
    btnUpdate.classList.add('d-none')

}

function search(term){
    var matchedSites=[]

    for (let i = 0; i < sites.length; i++) {

        if(sites[i].siteNameInput.toLowerCase().includes(term.toLowerCase()))
        {
            matchedSites.push(sites[i])
        }
        displaySites(matchedSites)
        // console.log(matchedSites);
        
    }
}

