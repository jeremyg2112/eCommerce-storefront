
// DOM SELECTORS
const boxes = document.getElementsByClassName("product-box");
const galleryElemOne = document.getElementById("sale");
const galleryElemTwo = document.getElementById("products-container");
const productDetailOne = document.getElementById("product-detail-view");
const productDetailTwo = document.getElementById("product-detail-desc");
const emptyCart = document.getElementById("my-cart-empty");
const returnToGallery = document.getElementById("fake-link");
const cart = document.getElementById("cart-contents");
const addToCartButton = document.getElementById("add-cart-btn");
const cartTotal = document.getElementById("cart-total");
	// creates custom HTML attribute to be used for toggling product view mode
const dataId = document.createAttribute("dataId");

// stores contents of cart as array of objects
let myCart = [];


// FUNCTIONS

// will accept array of objects from JSON and create html elements for each
function createHTML(arr) {
 	for (let i = 0; i < arr.length; i++) {

 	// assigns id to HTML elements which corresponds to JSON "productId" property
 		boxes[i].id = arr[i].productId;

 	// will listen for products in gallery being clicked 
 		boxes[i].addEventListener("click", function(e) {

 		// finds data corresponding to clicked product and prepares HTML for product details	
 			data.forEach(function(obj) {		
 				if (obj.productId == boxes[i].id) {
 					let priceHTML = createPriceHTML(findPrice(obj));
  					document.getElementById("product-detail-title").innerText = obj.productName;
 				    document.getElementById("price-container").innerHTML = priceHTML;
 					document.getElementById("product-description").innerText = obj.desc;
 					document.getElementById("product-detail-main-photo").src = obj.productImgSrc;
 					
 					dataId.value = obj.productId;
 					addToCartButton.setAttributeNode(dataId);
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

function findPrice(obj) {

 if (obj.sale) { 						
 						let origPrice = obj.price;
 						let cartPrice = origPrice * (1-(obj.sale/100));
 						let prices = {cartPrice: cartPrice, origPrice: origPrice};						
 						return prices;
 					} else {
 						let cartPrice = obj.price;
 						let prices = {cartPrice: cartPrice}
 						return prices;
 					}

}

function createPriceHTML(obj) {
	
	if (obj.cartPrice && obj.origPrice) {
		let origPrice = obj.origPrice;
		let cartPrice = obj.cartPrice;
		origPrice = origPrice.toLocaleString(Number(origPrice.toFixed(2)));
 		cartPrice = cartPrice.toLocaleString(Number(cartPrice.toFixed(2)));
		return `<p class="strike">$${origPrice}</p><p> $${cartPrice}</p>`;
	} else {
		let cartPrice = obj.cartPrice;
		cartPrice = cartPrice.toLocaleString(Number(cartPrice.toFixed(2)));
		return `<p>$${cartPrice}</p>`
	}
}

function calculateTotal() {
	let total = 0;
	myCart.forEach(function(obj) {
		let price = obj.cartPrice;
		return total += price * obj.quantity;
	})
	total = total.toLocaleString(Number(total.toFixed(2)));
	// value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
	// console.log(total, myCart);
	cartTotal.innerHTML = "$" + total;
}			

function findIndex(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].productId == val) {
			return i;
		} 
	}
	return -1;	
}

function checkIfCartItems() {
	let items = document.getElementsByClassName("cart-item");
	if (items.length < 1) {
		cart.style = "display: none;";
		emptyCart.style = "display: flex;";
		console.log("cart has been emptied");
	} else {
		console.log("still items in the cart");
	}
}

function increaseQuantity(id) {
		let counter = document.getElementById(`${id}_counter`);
		let index = findIndex(myCart, id);
		myCart[index].quantity++;
		counter.innerText = myCart[index].quantity;

}

function decreaseQuantity(id) {
		let counter = document.getElementById(`${id}_counter`);
		let index = findIndex(myCart, id);
		myCart[index].quantity--;
		counter.innerText = myCart[index].quantity;
		if (myCart[index].quantity < 1) {
			let itemToDelete =  document.getElementById(`${id}_cart`);
			itemToDelete.parentNode.removeChild(itemToDelete);
			myCart.splice(index, 1);
			checkIfCartItems();
		}
	}


class CartItem {
  constructor(productId, cartPrice, quantity) {
    this.productId = productId;
    this.cartPrice = cartPrice;
    this.quantity = quantity;
  }
}


// CODE TO EXECUTE

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


addToCartButton.addEventListener("click", function(e) {

	let dataIdHolder = dataId.value;
	
	if (!document.getElementById(`${dataIdHolder}_cart`)) {
		// creates new cart item if one does not already exist for selected product

	data.forEach(function(obj) {		
 				if (obj.productId == dataIdHolder) {
 		
 					let newDiv = document.createElement("div");
 					newDiv.id = `${dataIdHolder}_cart`;
 					newDiv.className = "cart-item";
 					let price = findPrice(obj).cartPrice;
 					let priceHTML = createPriceHTML(findPrice(obj));						

 					newDiv.innerHTML= 
						`<div class="cart-thumb">
							<img class="cart-thumb-img" src="${obj.productImgSrc}">
						</div>
						<div class="cart-item-info">
							<p>${obj.productName}</p>
							<div>${priceHTML}</div>
						</div>
						<div class="cart-quantity">
							<button>
								<div class="quantity-btn" id="${dataIdHolder}_subtract">-</div>
								<span id="${dataIdHolder}_counter">1</span>
								<div class="quantity-btn" id="${dataIdHolder}_add">+</div>
							</button>
						</div>`;
					emptyCart.style = "display: none;";
					cart.style = "display: block;";
					cart.appendChild(newDiv);

					let newCartItem = new CartItem(dataIdHolder, price, 1);
					myCart.push(newCartItem);
					
					// gives functionality to + and - buttons for cart item
					document.getElementById(`${dataIdHolder}_add`).addEventListener("click", function() {
						increaseQuantity(dataIdHolder);
						calculateTotal();
					}); 
					document.getElementById(`${dataIdHolder}_subtract`).addEventListener("click", function() {
						decreaseQuantity(dataIdHolder);
						calculateTotal();
					}); 
					calculateTotal();
 				}
 			})
	} else {
		// increases quantity if product already exists in cart  
		increaseQuantity(dataIdHolder);
		calculateTotal();
	}
})

