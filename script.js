const boxes = document.getElementsByClassName("product-box");

function createHTML(arr) {
 	for (let i = 0; i < arr.length; i++) {
    	boxes[i].innerHTML=`<img class="product-img" src="${arr[i].productImgSrc}">
				<p class="item-title">${arr[i].productName}</p>`
    	};
}

fetch('https://jeremyg2112.github.io/eCommerce-storefront-data/products.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    const data = Object.values(myJson);
    console.log(data);
   //  for (let i = 0; i < data.length; i++) {
   //  	boxes[i].innerHTML=`<img class="product-img" src="${data[i].productImgSrc}">
			// <span class="item-title">
			// 	<p>${data[i].productName}</p>
			// </span>`
   //  	};
   createHTML(data);

  });




	// let xhttp = new XMLHttpRequest();
	// xhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		let response = JSON.parse(xhttp.responseText);
	// 		console.log(response.product1.productName);
	// 	}
	// };
	// xhttp.open("GET", "products.json", true);
	// xhttp.send();

