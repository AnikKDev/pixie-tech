// search event function
const searchPhone = () => {
    document.getElementById('search-result').innerHTML = '';
    document.getElementById("detail-container").innerHTML = '';
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    // input value empty or not
    if (searchInput.value === '') {
        document.getElementById("search-result-count").innerText = '';
        document.getElementById("warning").innerText = "Input-field can't be empty. Try again :("
    }
    else {
        document.getElementById('spinner').style.display = 'block';
        fetch(url)
            .then(res => res.json())
            .then(data => searchResult(data.data))
        searchInput.value = '';
    }
}
// search result
const searchResult = phones => {
    const slicing = phones.slice(0, 20);
    document.getElementById('spinner').style.display = 'none';
    if (phones.length == 0) {
        // result count
        document.getElementById("search-result-count").innerText = `Showing Results: ${slicing.length}, Result found: ${phones.length}.`;
        document.getElementById("search-result-count").style.color = "red";
        // if search result can't be found
        document.getElementById('warning').innerText = 'Please try again :(';
    }
    else {
        // result count
        if (phones.length > 1) {
            document.getElementById("search-result-count").innerText = `Showing Results: ${slicing.length}, Result found: ${phones.length}.`;
        }
        else {
            document.getElementById("search-result-count").innerText = `Showing Result: ${slicing.length}, Result found: ${phones.length}.`;
        }
        document.getElementById("search-result-count").style.color = "green";
        // clearing waring message
        document.getElementById('warning').innerText = '';
        const searchResult = document.getElementById('search-result');
        slicing.forEach(element => {
            // dynamic div with its childrens
            const div = document.createElement('div');
            div.className = 'col-md-4 d-flex justify-content-center my-5';
            div.innerHTML = `
            <div class="card shadow-lg p-3 each-card" style="width: 18rem;">
                <div class="d-flex justify-content-center">
                    <img src="${element.image}" class="card-img-top w-75" alt="...">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${element.phone_name}</h5>
                        <p class="card-text"><span class="brand-span">Brand:</span> ${element.brand}</p>
                    </div>
                    <div class="d-flex mt-3">
                        <a onclick="seeDetails('${element.slug}')" id="details-button" href="#" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        });
    }
}

// details button
const seeDetails = details => {
    // get api of product details
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewDetails(data.data))

}

// functional approaches

// check if there is a release date or not
const releaseDateCheck = (date) => {
    if (date == null || date == '') {
        return 'Release date not found';
    }
    else {
        return date;
    }
}
// get the sensor data
const getSensors = (sensor) => {
    let sensors = [];

    sensor.forEach(element => {
        sensors.push(element);
    });
    return sensors;
}
// get the other feature data of product
const checkOthers = others => {
    if (others == '' || others == undefined) {
        return 'No';
    }
    else {
        return others;
    }
}

// detailed card of a selected product
const viewDetails = details => {
    console.log(details.data)
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card detailed-card p-4 mt-5 shadow" style="width: 20rem;">
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${details.name}</h5>
            <p class="card-text text-muted" id="release-date">${releaseDateCheck(details.releaseDate)}.</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}.</li>
            <li class="list-group-item"><span class="fw-bold">Display-size:</span> ${details.mainFeatures.displaySize}.</li>
            <li class="list-group-item"><span class="fw-bold">Chipset:</span> ${details.mainFeatures.chipSet}.</li>
            <li class="list-group-item"><span class="fw-bold">Sensors:</span> ${getSensors(details.mainFeatures.sensors)}.</li>
            <li class="list-group-item"><span class="fw-bold">Bluetooth:</span> ${checkOthers(details?.others?.Bluetooth)}.</li>
            <li class="list-group-item"><span class="fw-bold">GPS:</span> ${checkOthers(details?.others?.GPS)}.</li>
            <li class="list-group-item"><span class="fw-bold">Bluetooth:</span> ${checkOthers(details?.others?.NFC)}.</li>
            <li class="list-group-item"><span class="fw-bold">Radio:</span> ${checkOthers(details?.others?.Radio)}.</li>
            <li class="list-group-item"><span class="fw-bold">USB:</span> ${checkOthers(details?.others?.USB)}.</li>
            <li class="list-group-item"><span class="fw-bold">WLAN:</span> ${checkOthers(details?.others?.WLAN)}.</li>
        </ul>
    </div>
    `
    detailContainer.appendChild(div);
}


// end