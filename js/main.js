const PRODUCT = document.querySelector(".products");

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

// const localStorageJson = localStorage.setItem("products", JSON.stringify(products)); // "products" bu key JSON.stringify(products) bu value JSON.stringify()bu array ni string formatga otkazib beradi.

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

    return productItem
}

let showProduct = products
const productCount = document.querySelector("#products-count");

const refreshProduct = function () {

    PRODUCT.innerHTML = "";

    productCount.textContent = `Count: ${showProduct.length}`;

    const ProductFragment = document.createDocumentFragment();

    showProduct.forEach(function (productArray) {
        const productItem = renderProduct(productArray);
        ProductFragment.append(productItem);
    });

    PRODUCT.append(ProductFragment)

}

// manufacturer va benefits uchun joy


const addProductModal = document.querySelector("#add-product-modal")
const HideMOdal = new bootstrap.Modal(addProductModal);
const addProductForm = document.querySelector("#add-product");
const productManufacturer = addProductForm.querySelector("#product__manufacturer");


//manufacturer
manufacturers.forEach(function(manufacturerArray){
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

manufacturers.forEach(function(editManufacturerArray){
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
benefits.addEventListener("input", function(){
    const benefitsValue = benefits.value;
    const splited = benefitsValue.trim().split(",");

    if (splited.length == 2) {
        benefitsOptions.push(splited[0]);
        benefits.value = "";
        benefitList.textContent = "";

        benefitsOptions.forEach(function(benefitArray){
            const benefitElement = addElement("li", "badge bg-danger me-1 mb-1", benefitArray);
            benefitList.append(benefitElement);
        })
    }

});

refreshProduct()

const addproductBtn = document.querySelector(".addProduct");

    const title = addProductForm.querySelector("#title");
    const price = addProductForm.querySelector("#product__price");
    const manufacturer = addProductForm.querySelector("#product__manufacturer");
    const benefitsInput = addProductForm.querySelector("#benefit");

    
    addproductBtn.addEventListener("click", function(){
        benefitsOptions = [];
        benefitList.textContent = ""
    });
    
    
    
    
    addProductForm.addEventListener("submit", function(evt){
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

        HideMOdal.hide()

        benefitsOptions = [];

    }
});