function createRatingStar(percentage) {
    const container = document.createElement('div');
    container.classList.add("relative", "inline-block")
    const starBase = document.createElement('i');
    starBase.classList.add("fas","fa-star","star","text-white","align-top");
    const starOverlay = document.createElement('i');
    starOverlay.classList.add("fas","fa-star","star","text-yellow-400","absolute","top-0","left-0","overflow-hidden",`w-[${percentage}%]`);
    container.appendChild(starBase);
    container.appendChild(starOverlay);
    return container;
}

function createStars(rating) {
    const container = document.createElement('div');
    container.title = rating.toFixed(2)+" / 5 étoiles";
    container.classList.add("flex", "flex-row", "items-center");
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars > 0;
    for (let i = 0; i < fullStars; i++) {
        let star = createRatingStar(100);
        container.appendChild(star);
    }
    if (hasHalfStar) {
        let star2 = createRatingStar((rating - fullStars) * 100);
        container.appendChild(star2);
    }
    for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
        let star2 = createRatingStar(0);
        container.appendChild(star2);
    }
    span = document.createElement("span");
    span.classList.add("bg-blue-100","text-blue-800","text-xs","font-semibold","mr-2","px-2.5","py-0.5","rounded","dark:bg-blue-200","dark:text-blue-800","ml-3");
    span.innerHTML = rating.toFixed(2)+" / 5";
    container.appendChild(span);
    return container;
}

function displayProduct(product){
    const container = document.createElement('div');
    container.classList.add("w-full","max-w-sm","bg-white","border","border-gray-200","rounded-2xl","shadow-2xl","dark:bg-gray-800","dark:border-gray-700");
    const a = document.createElement('a');
    a.href = "product.html?id="+product.id;
    const img = document.createElement('img');
    img.classList.add("h-auto","w-full","rounded-2xl","p-2");
    img.src = product.photo;
    img.alt = product.name;
    a.appendChild(img);
    container.appendChild(a);
    const div = document.createElement('div');
    div.classList.add("px-5","pb-5");
    const a2 = document.createElement('a');
    a2.href = "product.html?id="+product.id;
    const h5 = document.createElement('h5');
    h5.classList.add("text-xl","font-semibold","tracking-tight","text-gray-900","dark:text-white");
    h5.innerHTML = product.name;
    a2.appendChild(h5);
    div.appendChild(a2);
    const a4 = document.createElement('a');
    a4.href = "entreprise.html?id="+product.entreprise.id;
    const h5_2 = document.createElement('h5');
    h5_2.classList.add("text-sm","font-semibold","tracking-tight","text-gray-500","dark:text-gray-400");
    h5_2.innerHTML = product.entreprise.name;
    a4.appendChild(h5_2);
    div.appendChild(a4);
    const div2 = document.createElement('div');
    div2.classList.add("flex","items-center","mt-2.5","mb-5");
    div2.id = "stars";
    div2.appendChild(createStars(product.rating));
    div.appendChild(div2);
    const div3 = document.createElement('div');
    div3.classList.add("flex","items-center","justify-between");
    const span = document.createElement('span');
    span.classList.add("text-3xl","font-bold","text-gray-900","dark:text-white");
    span.innerHTML = product.price+" €";
    div3.appendChild(span);
    const a3 = document.createElement('a');
    a3.href = "product.html?id="+product.id;
    a3.classList.add("text-white","bg-blue-700","hover:bg-blue-800","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","ml-4","text-center","dark:bg-blue-600","dark:hover:bg-blue-700","dark:focus:ring-blue-800");
    a3.innerHTML = "Commander";
    div3.appendChild(a3);
    div.appendChild(div3);
    container.appendChild(div);
    document.querySelector('#products').appendChild(container);
}
const test_products = [
    {
        id: 1,
        name: "Produit 1",
        price: 10,
        photo: "https://picsum.photos/200/200",
        rating: 4.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 2,
        name: "Produit 2",
        price: 20,
        photo: "https://picsum.photos/200/200",
        rating: 3.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 3,
        name: "Produit 3",
        price: 30,
        photo: "https://picsum.photos/200/200",
        rating: 2.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 4,
        name: "Produit 4",
        price: 40,
        photo: "https://picsum.photos/200/200",
        rating: 1.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 5,
        name: "Produit 5",
        price: 50,
        photo: "https://picsum.photos/200/200",
        rating: 0.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 6,
        name: "Produit 6",
        price: 60,
        photo: "https://picsum.photos/200/200",
        rating: 4.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 7,
        name: "Produit 7",
        price: 70,
        photo: "https://picsum.photos/200/200",
        rating: 3.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 8,
        name: "Produit 8",
        price: 80,
        photo: "https://picsum.photos/200/200",
        rating: 2.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 9,
        name: "Produit 9",
        price: 90,
        photo: "https://picsum.photos/200/200",
        rating: 1.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    },
    {
        id: 10,
        name: "Produit 10",
        price: 100,
        photo: "https://picsum.photos/200/200",
        rating: 0.5,
        entreprise: {
            id: 1,
            name: "Entreprise 1",
            siret: "12345678901234"
        }
    }
];

test_products.forEach(product => {
    displayProduct(product);
});

// function getProducts(){
//     apiCall("/product/getAll", "GET", null, (res) => {
//         products = res;
//         products.forEach(product => {
//             displayProduct(product);
//         });
//     });
// }

// getProducts();