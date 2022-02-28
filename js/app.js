const searchPhone = () => {
    document.getElementById('search-result').innerHTML = '';
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    document.getElementById('spinner').style.display = 'block';
    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data))
    searchInput.value = '';
}

const searchResult = phones => {
    document.getElementById('spinner').style.display = 'none';
    if (phones.length == 0) {
        console.log('error')
        document.getElementById('warning').innerText = 'Please try again :)';
    }
    else {
        document.getElementById('warning').innerText = '';
        const searchResult = document.getElementById('search-result');
        phones.forEach(element => {
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
                        <button onclick="seeDetails('${element.slug}')" id="details-button" href="#" class="btn btn-primary">Details</button>
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
    // console.log(details)
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewDetails(data.data))

}
const releaseDateCheck = (date) => {
    if (date == null || date == '') {
        return 'Release date not found';
    }
    else {
        return date;
    }
}

const getSensors = (sensor) => {
    let sensors = [];

    sensor.forEach(element => {
        sensors.push(element);
    });
    return sensors;
}
const viewDetails = details => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card detailed-card p-4 mt-5 shadow" style="width: 18rem;">
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
        </ul>
        <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>
    `

    detailContainer.appendChild(div);


}