const PRODUCT = document.querySelector(".products");

const localStorageSet = function(){
    const localStorageJson = localStorage.setItem("products", JSON.stringify(products));

    return localStorageJson
}

const addZero = function (number) {
    return number < 10 ? "0" + number : number
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
}

const addElement = function (tagName, className, content) {
    const addedElement = document.createElement(tagName);

    if (className) {
        addedElement.className = className;
    }

    if (content) {
        addedElement.textContent = content;
    }

    return addedElement
}



const renderProduct = function (product) {
    const {
        id,
        title,
        img,
        price,
        discountPrice,
        model,
        addedDate,
        benefits
    } = product

    const prodcutTemplate = document.querySelector("#product-template");

    const productItem = prodcutTemplate.content.cloneNode(true);

    productItem.querySelector(".card-title").textContent = title;
    productItem.querySelector(".product__discount-price-mark").textContent = discountPrice;
    productItem.querySelector(".product__original-price").textContent = price;
    productItem.querySelector(".product__manufacturer-name").textContent = model;
    productItem.querySelector(".product__added-date").textContent = showDate(addedDate);
    const benefitsList = productItem.querySelector(".benefits__list");

    benefits.forEach(function (benefitArray) {
        const benefitsItems = addElement("li", "badge bg-primary me-1 mb-1", benefitArray);

        benefitsList.append(benefitsItems);
    });

    const editBtn = productItem.querySelector(".delete-button").setAttribute("data-id", id);
    const deltBtn = productItem.querySelector(".edit-button").setAttribute("data-id", id);

    return productItem
}

let showProduct = products.slice()
const productCount = document.querySelector("#products-count");

const refreshProduct = function () {

    PRODUCT.innerHTML = "";

    productCount.textContent = `Count: ${showProduct.length}`;

    const ProductFragment = document.createDocumentFragment();

    showProduct.forEach(function (productArray) {
        const productItem = renderProduct(productArray);
        ProductFragment.append(productItem);
    });

    localStorageSet()

    PRODUCT.append(ProductFragment)

}

// manufacturer va benefits uchun joy


const addProductModal = document.querySelector("#add-product-modal")
const HideMOdal = new bootstrap.Modal(addProductModal);
const addProductForm = document.querySelector("#add-product");
const productManufacturer = addProductForm.querySelector("#product__manufacturer");


// add product manufacturer
manufacturers.forEach(function (manufacturerArray) {
    const {
        id,
        name
    } = manufacturerArray

    const manufacturer = addElement("option", "productManufacturers", name);
    manufacturer.value = name;
    manufacturer.textContent = name;

    productManufacturer.append(manufacturer);
});

const editProductForm = document.querySelector("#edit-product");
const editProductManufacturer = editProductForm.querySelector("#edit-product__manufacturer");

manufacturers.forEach(function (editManufacturerArray) {
    const {
        id,
        name
    } = editManufacturerArray

    const editManufacturer = addElement("option", "productManufacturers", name);
    editManufacturer.value = name;
    editManufacturer.textContent = name;

    editProductManufacturer.append(editManufacturer);
});




//benefits
const benefits = addProductForm.querySelector("#benefit");
const benefitList = addProductForm.querySelector("#benefitsExample");
benefitsOptions = []
benefits.addEventListener("input", function () {
    const benefitsValue = benefits.value;
    const splited = benefitsValue.trim().split(",");

    if (splited.length == 2) {
        benefitsOptions.push(splited[0]);
        benefits.value = "";
        benefitList.textContent = "";

        benefitsOptions.forEach(function (benefitArray) {
            const benefitElement = addElement("li", "badge bg-danger me-1 mb-1", benefitArray);
            benefitList.append(benefitElement);
        })
    }

});

const editBenefits = editProductForm.querySelector("#edit-benefit");
const editBenefitsList = editProductForm.querySelector("#edit-benefits-example");

editBenefits.addEventListener("input", function () {
    const benefitsValue = editBenefits.value;
    const splited = benefitsValue.trim().split(",");

    if (splited.length == 2) {
        benefitsOptions.push(splited[0]);
        editBenefits.value = "";
        editBenefitsList.textContent = "";

        benefitsOptions.forEach(function (benefitArray) {
            const benefitElement = addElement("li", "badge bg-danger me-1 mb-1", benefitArray);
            editBenefitsList.append(benefitElement);
        })
    }

});

refreshProduct()

const addproductBtn = document.querySelector(".addProduct");

const title = addProductForm.querySelector("#title");
const price = addProductForm.querySelector("#product__price");
const manufacturer = addProductForm.querySelector("#product__manufacturer");
const benefitsInput = addProductForm.querySelector("#benefit");


addproductBtn.addEventListener("click", function () {
    benefitsOptions = [];
    benefitList.textContent = ""
});




addProductForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    const titleValue = title.value
    const pricValue = price.value
    const manufacturerValue = manufacturer.value;

    if (titleValue && pricValue && manufacturerValue) {
        const product = {
            id: Math.floor(Math.random() * 1000),
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: pricValue,
            discountPrice: pricValue * 0.75,
            model: manufacturerValue,
            addedDate: new Date,
            benefits: benefitsOptions
        }
        addProductForm.reset();

        const productItem = renderProduct(product);
        PRODUCT.append(productItem);
        // products.push(product);

        showProduct.push(product);

        refreshProduct()

        localStorageSet()

        HideMOdal.hide()

        benefitsOptions = [];

    }
});

const editTitle = editProductForm.querySelector("#edit-title");
const editPrice = editProductForm.querySelector("#edit-product__price");
const editManufacturer = editProductForm.querySelector("#edit-product__manufacturer");
const editBenefitInput = editProductForm.querySelector("#edit-benefit")


PRODUCT.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete-button")) {
        const productItemId = +evt.target.dataset.id;

        const productItemIndex = products.findIndex(function (product) {
            return productItemId === product.id;
        });

        showProduct.splice(productItemIndex, 1);
        products.splice(productItemIndex, 1);

        localStorageSet()

        refreshProduct()
    } else if (evt.target.matches(".edit-button")) {
        const editProductItemId = +evt.target.dataset.id;

        const editProductItemIndex = products.findIndex(function (editProduct) {
            return editProductItemId === editProduct.id;
        })

        const editProductElements = products.find(function (editProductElement) {
            return editProductItemId === editProductElement.id
        });

        editTitle.value = editProductElements.title;
        editPrice.value = editProductElements.price;
        editManufacturer.value = editProductElements.model;
        benefitsOptions = products[editProductItemIndex].benefits


        // const editBenefitsList = editProductForm.querySelector("#edit-benefits-example");
        // benefitsOptions.forEach(function (editBenefitsArray) {
        //     const specsItem = addElement("li", "me-1 mb-1 benefit-livbtn btn-sm badge rounded-pill btn-danger mr-5 benefit-btn", editBenefitsArray);

        //     editBenefitsList.append(specsItem);
        // });

        benefitsOptions = []

        editProductForm.setAttribute("data-edit-id", editProductElements.id);
    }
});

const editProductModal = document.querySelector("#edit-product-modal");
const hideEditModal = new bootstrap.Modal(editProductModal);

editProductForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const editedItemId = +evt.target.dataset.editId;
    const editedTitle = editTitle.value;
    const editedPrice = editPrice.value;
    const editedManufacturer = editManufacturer.value;
    const hasBenefits = benefitsOptions.length !== 0
    
    if (editedTitle.trim() && editedPrice.trim()) {

        const editProduct = {
            id: editedItemId,
            title: editedTitle,
            img: "https://picsum.photos/300/200",
            price: editedPrice,
            discountPrice: editedPrice * 0.75,
            model: editedManufacturer,
            addedDate: new Date(),
            benefits: benefitsOptions
        }

        const editedItemIndex = products.findIndex(function (editedProduct) {
            return editedItemId === editedProduct.id
        })

        showProduct.splice(editedItemIndex, 1, editProduct);
        products.splice(editedItemIndex, 1, editProduct);

        localStorageSet()

        editProductForm.reset();

        refreshProduct()
        hideEditModal.hide();
    }
});

const filterForm = document.querySelector("#filter-form");
// const search = filterForm.querySelector("#search");
// const fromPrice = filterForm.querySelector("#from");
// const toPrice = filterForm.querySelector("#to");
// const sort = 

// filterForm.addEventListener("submit", function(evt){
    
// });

filterForm.addEventListener("submit", function(evt){
    evt.preventDefault();

        const elements = evt.target.elements;

        const searchValue = elements.search.value;
        const fromPriceValue = elements.from.value;
        const toPriceValue = elements.to.value;
        const sortValue = elements.sortby.value;

        showProduct = products
            .sort(function (a, b) {
                switch (sortValue) {
                    case "1":
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1
                        } else if (a.title < b.title.toLowerCase()) {
                            return -1
                        } else {
                            return 0
                        }

                        case "2":
                            return b.price - a.price;
                        case "3":
                            return a.price - b.price;

                        default:
                            break;
                }
            })

    .filter(function (productFilter) {
        const productPrice = Math.round(productFilter.discountPrice)
        const toPrice = !toPriceValue ? true : productPrice <= toPriceValue;

        const searchRegEXp = new RegExp(searchValue, "gi");

        return productPrice >= fromPriceValue && toPrice && productFilter.title.match(searchRegEXp);
    })

    refreshProduct();
})