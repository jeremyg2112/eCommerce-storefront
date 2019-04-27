const boxes = document.getElementsByClassName("product-box");
const galleryElemOne = document.getElementById("sale");
const galleryElemTwo = document.getElementById("products-container");
const productDetailOne = document.getElementById("product-detail-view");
const productDetailTwo = document.getElementById("product-detail-desc");
const returnToGallery = document.getElementById("fake-link");


function createHTML(arr) {
 	for (let i = 0; i < arr.length; i++) {

 	// assigns id to HTML elements which corresponds to JSON object ID property
 		boxes[i].id = arr[i].productId;

 	// will listen for products in gallery being clicked 
 		boxes[i].addEventListener("click", function(e) {
 			
 	// finds data corresponding to clicked product and prepares HTML 	
 			data.forEach(function(obj) {		
 				if (obj.productId == boxes[i].id) {
 					document.getElementById("product-detail-title").innerText = obj.productName;
 					document.getElementById("product-price").innerText = '$' + obj.price;
 					document.getElementById("product-description").innerText = obj.desc;
 					document.getElementById("product-detail-main-photo").src = obj.productImgSrc;
 				}
 			})

 	// clears product gallery elements, changes page to "product detail" view
 			galleryElemOne.style = "display: none;";
 			galleryElemTwo.style = "display: none;";
 			productDetailOne.style = "display: grid;";
 			productDetailTwo.style = "display: block;";
 		})


 	// checks to see if product is on sale. if so, creates discount bubble on thumbnail 
		if (arr[i].sale) {
			boxes[i].innerHTML=
			`<img class="product-img" src="${arr[i].productImgSrc}">
			<span class="discount">${arr[i].sale}% off</span>
				<p class="item-title">${arr[i].productName}</p>`
		} else {
			boxes[i].innerHTML=
			`<img class="product-img" src="${arr[i].productImgSrc}">
				<p class="item-title">${arr[i].productName}</p>`
		}
    };
}

// gets JSON object from another site, stores as Javascript object in variable "data"
fetch('https://jeremyg2112.github.io/eCommerce-storefront-data/products.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    const data = Object.values(myJson);
   //  for (let i = 0; i < data.length; i++) {
   //  	boxes[i].innerHTML=`<img class="product-img" src="${data[i].productImgSrc}">
			// <span class="item-title">
			// 	<p>${data[i].productName}</p>
			// </span>`
   //  	};
   createHTML(data);
   this.data = data;
  });

// changes page back to gallery view when user clicks "return to gallery"
returnToGallery.addEventListener("click", function(){
	productDetailOne.style = "display: none;";
 	productDetailTwo.style = "display: none;";
	galleryElemOne.style = "display: flex;";
 	galleryElemTwo.style = "display: grid;";
 	
})


