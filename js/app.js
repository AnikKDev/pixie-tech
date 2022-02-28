const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data))
    searchInput.value = '';
}

const searchResult = phones => {
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
                        <button id="details-button" href="#" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        });
    }
}