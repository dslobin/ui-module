const tags = [
    {
        id: 1,
        name: "active_rest"
    },
    {
        id: 2,
        name: "romantics"
    },
    {
        id: 3,
        name: "photo_sessions"
    },
    {
        id: 4,
        name: "fitness_and_sport"
    },
    {
        id: 5,
        name: "animals"
    },
    {
        id: 6,
        name: "travel"
    },
    {
        id: 7,
        name: "quests"
    },
    {
        id: 8,
        name: "exclusive"
    },
    {
        id: 9,
        name: "health"
    },
    {
        id: 10,
        name: "dates"
    }
];

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 15;

function fillLocalStorage() {
    const giftCertificates = [];
    const certificatesNumber = 31;
    for (let index = 1; index < certificatesNumber; index++) {
        const price = getRandomNumber(1, 5000);
        let today = new Date();
        const duration = getRandomNumber(1, 366);
        const categories = [];
        const categoriesCount = getRandomNumber(1, 3);
        for (let index = 0; index < categoriesCount; index++) {
            const tag = tags[getRandomNumber(1, tags.length - 1)];
            categories.push(tag);
        }
        const certificate = {
            id: index,
            name: `Certificate ${index}`,
            description: `Description ${index}`,
            price: price,
            createdAt: today,
            updatedAt: today,
            duration: duration,
            tags: categories
        };
        giftCertificates.push(certificate);
    }
    localStorage.setItem('certificates', JSON.stringify(giftCertificates));
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function findAllGiftCertificates() {
    return JSON.parse(localStorage.getItem('certificates'));
}

function findCertificatesPaginated(pageSize, pageNumber) {
    console.log(`Finding all certificates(size = ${pageSize}) on page = ${pageNumber}`)
    const giftCertificates = JSON.parse(localStorage.getItem('certificates'));
    return giftCertificates.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const certificateNameInput = document.getElementById('certificateName');

certificateNameInput.addEventListener('input', _.debounce((event) => {
    clearGiftCertificates();
    const certificateInfo = event.target.value;
    if (certificateInfo && certificateInfo.trim().length > 0) {
        const certificates = findAllGiftCertificates();
        const filterResult = certificates.filter(c => {
            return c.name.toUpperCase().indexOf(certificateInfo.toUpperCase()) > -1 ||
                c.description.toUpperCase().indexOf(certificateInfo.toUpperCase()) > -1
        });
        filterResult.forEach(c => addCertificateToDOM(c));
    } else if (certificateInfo.trim().length === 0) {
        const certificates = findCertificatesPaginated(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER);
        certificates.forEach(c => addCertificateToDOM(c));
    }
}, 1000));

const certificateCategoryInput = document.getElementById('certificateCategory');

certificateCategoryInput.addEventListener('input', _.debounce((event) => {
    clearGiftCertificates();
    const tagName = event.target.value;
    console.log(`User input(certificate tags): ${tagName}`);
    if (tagName && tagName.trim().length > 0) {
        const certificates = findAllGiftCertificates();
        const filterResult = certificates.filter(c => {
            const tags = c.tags;
            let isCertificateContainsTag = false;
            for (const tag of tags) {
                if (tag.name.toUpperCase().indexOf(tagName.toUpperCase()) > -1) {
                    isCertificateContainsTag = true;
                    break;
                }
            }
            return isCertificateContainsTag;
        });
        console.log(filterResult);
        filterResult.forEach(c => addCertificateToDOM(c));
    } else if (tagName.trim().length === 0) {
        const certificates = findCertificatesPaginated(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER);
        certificates.forEach(c => addCertificateToDOM(c));
    }
}, 1000));

function isCategoryInputEmpty() {
    const categoryValue = certificateNameInput.value;
    return categoryValue != null && categoryValue.trim().length <= 0;
}

let pageNumber = 1;
const loading = document.querySelector('.lds-roller');

function fillGiftCertificates(certificates) {
    if (certificates != null && certificates.length !== 0) {
        pageNumber += 1;
        certificates.forEach(certificate => {
            addCertificateToDOM(certificate);
        });
    }
    loading.style.display = 'none';
}

function addCertificateToDOM(certificate) {
    let certificateCard = document.createElement('div');
    certificateCard.className = "product-card";
    certificateCard.innerHTML =
        `
        <div class="product-image">
            <img src="img/default-certificate.png" alt="${certificate.name}">
        </div>
        <div class="product-info">
            <div class="product-name">
                <h3>${certificate.name}</h3>
                <a class="fav" href="#"><i class="material-icons">favorite</i></a>
            </div>
            <div class="product-description">
                <p>${certificate.description}</p>
                <span class="validity">Expires in ${certificate.duration} days</span>
            </div>
        </div>
        <hr>
        <div class="product-info">
            <div class="product-price">
                <div>
                    <h3>$${certificate.price}</h3>
                </div>
                <div>
                    <button class="btn-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('products').appendChild(certificateCard);
}

function clearGiftCertificates() {
    let certificateCards = document.getElementById('products');
    while (certificateCards.firstChild) {
        certificateCards.removeChild(certificateCards.firstChild);
    }
}

function fillCategories() {
    const displayedItemsNumber = 5;
    const categories = tags.sort((a, b) => b.id - a.id).splice(0, displayedItemsNumber);
    categories.forEach(category => {
        addCategoryToDOM(category);
        addCategoryToDropdown(category);
    });
}

function addCategoryToDOM(category) {
    let categoryElement = document.createElement('div');
    categoryElement.className = "item";
    categoryElement.innerHTML =
        `
        <img src="" alt="${category.name}">
        <span class="caption">${category.name}</span>
    `;
    document.getElementById('category-container').appendChild(categoryElement);
}

function addCategoryToDropdown(category) {
    let a = document.createElement('a');
    let link = document.createTextNode(`${category.name}`);
    a.appendChild(link);
    a.title = category.name;
    a.href = `#${category.name}`;
    document.getElementById('categoryDropdown').appendChild(a);
}

/* When the user scrolls down for a certain distance from the top of the document, show the button */
window.addEventListener('scroll', () => {
    showTopButton()
});

let topButton = document.getElementById('topButton');

function showTopButton() {
    const minScrollPositionToShowButton = 75;
    if (
        document.body.scrollTop > minScrollPositionToShowButton ||
        document.documentElement.scrollTop > minScrollPositionToShowButton
    ) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
        topButton.onclick = goToDocumentTop;
    }
}

/* When the user clicks on the button, scroll to the top of the document */
function goToDocumentTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let lastScrollPosition = 0;

/* When the user clicks on the button, scroll to the last scroll position when the certificates were loaded */
function goToLastScrollPosition() {
    document.body.scrollTop = lastScrollPosition;
    document.documentElement.scrollTop = lastScrollPosition;
    topButton.onclick = goToDocumentTop;
}

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        if (isCategoryInputEmpty()) {
            lastScrollPosition = scrollTop;
            topButton.onclick = goToLastScrollPosition;
            showLoading();
        }
    }
});

function showLoading() {
    loading.style.display = 'inline-block';
    const certificatePage = findCertificatesPaginated(DEFAULT_PAGE_SIZE, pageNumber);
    console.log(certificatePage);
    if (certificatePage == null || certificatePage.length === 0) {
        return;
    }
    fillGiftCertificates(certificatePage);
}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
const allCategoriesButton = document.getElementById('allCategoriesButton');

allCategoriesButton.addEventListener('click', () => {
    document.getElementById('categoryDropdown').classList.toggle('show');
});


/* Filter certificate categories when the user releases a key (on the keyboard) */
const categoryDropdownElement = document.getElementById('categoryDropdown');
const categoryLinks = categoryDropdownElement.getElementsByTagName('a');

certificateCategoryInput.addEventListener('keyup', _.debounce((event) => {
    let filter = event.target.value.toUpperCase();
    for (let index = 0; index < categoryLinks.length; index++) {
        const txtValue = categoryLinks[index].textContent || categoryLinks[index].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            categoryLinks[index].style.display = '';
        } else {
            categoryLinks[index].style.display = 'none';
        }
    }
}, 1000));

const isLocalStorageEmpty = false;
document.addEventListener('DOMContentLoaded', function () {
    if (isLocalStorageEmpty) {
        fillLocalStorage();
    }
    const certificatePage = findCertificatesPaginated(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER);
    fillGiftCertificates(certificatePage);
    fillCategories();
});
