let addTocart  = document.querySelectorAll('.add-to-cart')





addTocart.forEach((btn) => {
    btn.addEventListener('click' ,(e) =>{
        
        let pizzas  = JSON.parse(btn.dataset.pizzas)
        updateCart(pizzas)
    })
})