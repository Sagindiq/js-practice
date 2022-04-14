const PRODUCT = document.querySelector(".products");

// const localStorageJson = localStorage.setItem("products", JSON.stringify(products)); // "products" bu key JSON.stringify(products) bu value JSON.stringify()bu array ni string formatga otkazib beradi.

const renderProduct = function (product) {
    // const {
    //     id,
    //     title,
    //     img,
    //     price,
    //     discountPrice,
    //     model,
    //     addedDate,
    //     benefits
    // } = product

    const prodcutTemplate = document.querySelector("#product-template");

    const productItem = prodcutTemplate.content.cloneNode(true);

    productItem.querySelector(".card-title").textContent = "sd";

    
    PRODUCT.append(productItem);
}

let showProduct = products
const productCount = document.querySelector("#products-count");
const refreshProduct = function(){

    PRODUCT.innerHTML = ""

    productCount.textContent = `Count: ${showProduct.length}`;

    const ProductFragment = document.createDocumentFragment();

    showProduct.forEach(function(rProduct){
        const productItem = renderProduct(rProduct);
        ProductFragment.append(productItem);
    });

    PRODUCT.append(ProductFragment)

}

refreshProduct()