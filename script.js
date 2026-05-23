let categoryBtnsContainer = document.getElementById("category_btns")

let fetchData = async () => {

	let api = await fetch("https://dummyjson.com/products?limit=194")
	let response = await api.json()

	let finalData = response.products

	// Extract only categories
	let categories = finalData.map((product) => {
		return product.category
	})

	// Remove duplicates
	let uniqueCategories = [...new Set(categories)]

	// Add buttons
	uniqueCategories.forEach((category) => {

		categoryBtnsContainer.innerHTML += `
		<button>${category}</button>
		`
	})

	// ADD ACTIVE BUTTON FUNCTIONALITY
	let allButtons = document.querySelectorAll("#category_btns button")

	allButtons.forEach((btn) => {

		btn.addEventListener("click", () => {

			// remove active from all buttons
			allButtons.forEach((button) => {
				button.classList.remove("active")
			})

			// add active to clicked button
			btn.classList.add("active")
		})
	})
}

fetchData()