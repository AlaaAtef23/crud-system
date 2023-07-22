var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var sites = [];
var errName = ``;
var errURL = ``;
if (localStorage.getItem("sites") != null) {
    sites = JSON.parse(localStorage.getItem("sites"))
    displaySites(sites)
}

function addSite() {
    if (checkBox() == true) {
        siteName.value;
        siteURL.value;
        sites.push(siteName.value);
        localStorage.setItem("sites", JSON.stringify(sites))
        displaySites(sites);
        clearForm();
        errName = ``;
        errURL = ``;
        // console.log(siteName.value);
    } else {

        alerterr();
        // clearForm();
    }


}

function clearForm() {
    siteName.value = '';
    siteURL.value = '';
    errName = ``;
    document.getElementById('errName').innerHTML = errName;
    errURL = ``;
    document.getElementById('errURL').innerHTML = errURL;


}

function displaySites(arr) {
    var siteList = ``;
    for (var i = 0; i < sites.length; i++) {
        siteList += `<tr class="">
        <td class="pe-5">${sites[i]}</td>
        <td>
        <button class="btnblue btn bg-primary text-white "><a href="${ siteURL.value}">Visit</a></button>
        <button onclick="deleteSite(${i})" class="btnred btn bg-danger text-white mx-3">Delete</button>
        </td>
    </tr>`;
        // console.log(siteName.value);
    }
    document.getElementById('tableSites').innerHTML = siteList;
}

function deleteSite(siteIndex) {
    sites.splice(siteIndex, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySites(sites);
}

function checkBox() {

    if (siteURL.value == '' || siteName.value == '') {
        // alert('LOL')
        return false;

    } else {
        return true;
    }

}

function alerterr() {
    if (siteName.value == '' && siteURL.value == '') {
        errName = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Name is required </div>`;
        document.getElementById('errName').innerHTML = errName;
        errURL = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Url Field is required </div>`;
        document.getElementById('errURL').innerHTML = errURL;
    } else if (siteName.value == '') {
        errName = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Name is required </div>`;
        document.getElementById('errName').innerHTML = errName;
    } else if (siteURL.value == '') {
        errURL = `<div class = "col-12 border-danger border-1 border rounded-1 bg-danger text-danger p-1 mt-2 bg-opacity-25" > Url Field is required </div>`;
        document.getElementById('errURL').innerHTML = errURL;
    }

}