let categoryBtnsContainer = document.getElementById("category_btns")
let productContainer = document.getElementById("products_container")
let allProducts = []
let fetchData = async () => {
let api = await fetch("https://dummyjson.com/products?limit=194")
let response = await api.json()
let finalData = response.products
allProducts = finalData
displayProducts(finalData)

	let categories = finalData.map((product) => {
		return product.category
	})

	let uniqueCategories = [...new Set(categories)]
	uniqueCategories.forEach((category) => {
		categoryBtnsContainer.innerHTML += `
			<button>${category}</button>
		`
	})

	let allButtons = document.querySelectorAll("#category_btns button")
	allButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			allButtons.forEach((button) => {
				button.classList.remove("active")
			})
			btn.classList.add("active")

			let filteredProducts = finalData.filter((product) => {
				return product.category === btn.textContent
			})

			productContainer.innerHTML = ""
			displayProducts(filteredProducts)
		})
	})
}

function displayProducts(finalData) {
	productContainer.innerHTML = ""
	finalData.forEach((product) => {
		productContainer.innerHTML += `
			<div class="card">
				<article class="product_img_container">
					<p class="discount">
						-${product.discountPercentage}%
					</p>
					<img src="${product.images[0]}" alt="${product.title}">

<p class="ratings">
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width="18" 
		height="18" 
		viewBox="0 0 24 24" 
		fill="gold" 
		stroke="gold" 
		stroke-width="2" 
		stroke-linecap="round" 
		stroke-linejoin="round"
	>
		<polygon points="12 2 15 8.5 22 9.3 17 14.2 18.3 21 12 17.8 5.7 21 7 14.2 2 9.3 9 8.5 12 2"/>
	</svg>

	${product.rating}
</p>
				</article>
				<p class="category">
					${product.category}
				</p>
				<h2 class="title">
					${product.title}
				</h2>
				<aside>
					<div>
						<p class="product_price">
							$${(
								product.price -
								product.price * (product.discountPercentage / 100)
							).toFixed(2)}
							<del>$${product.price}</del>
						</p>
						<p>
							${product.availabilityStatus}
						</p>
					</div>
					<div>
						<p 
							class="product_cart" 
							data-id="${product.id}" 
							onclick="addToCart(${product.id})"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
						</p>
					</div>
				</aside>
			</div>
		`
	})
}

function addToCart(id) {
	let clickedProduct = allProducts.find(product => product.id === id)
	console.log(clickedProduct)
	let cartItems = JSON.parse(localStorage.getItem("cart")) || []
	let existingProduct = cartItems.find((product) => {
		return product.id === id
	})
	if(existingProduct){
		clickedProduct.qty=existingProduct.qty++
	}
	else 
	{
		let productObj = {
			id: clickedProduct.id,
			title: clickedProduct.title,
			img : clickedProduct.images[0],
			qty:1,
			price: Number((clickedProduct.price - (clickedProduct.price * (clickedProduct.discountPercentage/100))).toFixed(2))
		}
	cartItems.push(productObj)
	}
localStorage.setItem("cart",JSON.stringify(cartItems))
}

fetchData()