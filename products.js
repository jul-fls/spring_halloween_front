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

function showLoadingModal() {
    Swal.fire({
        title: 'Création du PDF en cours...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: false
    });
}


function displayProduct(product){
    const container = document.createElement('div');
    container.classList.add("w-full","max-w-sm","bg-white","border","border-gray-200","rounded-2xl","shadow-2xl","dark:bg-gray-800","dark:border-gray-700");
    const a = document.createElement('a');
    a.href = "#";
    const img = document.createElement('img');
    img.classList.add("h-auto","w-full","rounded-2xl","p-2");
    img.src = product.photo;
    img.alt = product.name;
    a.appendChild(img);
    container.appendChild(a);
    const div = document.createElement('div');
    div.classList.add("px-5","pb-5");
    const a2 = document.createElement('a');
    a2.href = "#";
    const h5 = document.createElement('h5');
    h5.classList.add("text-xl","font-semibold","tracking-tight","text-gray-900","dark:text-white");
    h5.innerHTML = product.name;
    a2.appendChild(h5);
    div.appendChild(a2);
    if(product.enterprise !== null){
        const a4 = document.createElement('a');
        a4.href = "entreprises.html";
        const h5_2 = document.createElement('h5');
        h5_2.classList.add("text-sm","font-semibold","tracking-tight","text-gray-500","dark:text-gray-400");
        h5_2.innerHTML = product.enterprise.name;
        a4.appendChild(h5_2);
        div.appendChild(a4);
    }
    const div2 = document.createElement('div');
    div2.classList.add("flex","items-center","mt-2.5","mb-5");
    div2.id = "stars";
    div2.appendChild(createStars(product.rating));
    div.appendChild(div2);
    const div2_2 = document.createElement('div');
    div2_2.classList.add("flex","items-center","mt-2.5","mb-5");
    div2_2.id = "description";
    const p = document.createElement('p');
    p.classList.add("text-gray-500","dark:text-gray-400");
    p.innerHTML = product.description;
    div2_2.appendChild(p);
    div.appendChild(div2_2);
    const div3 = document.createElement('div');
    div3.classList.add("flex","items-center","justify-between");
    const span = document.createElement('span');
    span.classList.add("text-3xl","font-bold","text-gray-900","dark:text-white");
    span.innerHTML = product.price+" €";
    div3.appendChild(span);
    const a3 = document.createElement('a');
    a3.href = "#";
    a3.classList.add("text-white","bg-blue-700","hover:bg-blue-800","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","ml-4","text-center","dark:bg-blue-600","dark:hover:bg-blue-700","dark:focus:ring-blue-800");
    a3.innerHTML = "Commander";
    a3.addEventListener("click", () => {
        product_id = product.id.toString();
        user_id = user.id.toString();
        address_id = user.address.id.toString();
        const data = {
            product_id: product_id,
            user_id : user_id,
            address_id: address_id
        };
        apiCall("/order/create", "POST", data, (res) => {
            Swal.fire({
                title: 'Commande validée !',
                text: 'Souahitez-vous télécharger votre facture ?',
                icon: 'success',
                showDenyButton: true,
                confirmButtonText: 'Oui',
                denyButtonText: 'Non',
            }).
            then(async (result) => {
                if (result.isConfirmed) {
                    showLoadingModal();
                    const start = Date.now();
                    await createPdf(res, () => {
                        const elapsed = Date.now() - start;
                        const delay = Math.max(0, 1000 - elapsed);
                  
                        setTimeout(() => {
                          Swal.close();
                  
                          // Show the popup informing the user that the PDF has been sent
                          Swal.fire({
                            title: 'Facture téléchargée !',
                            text: 'La facture a été envoyée à votre navigateur.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          });
                        }, delay);
                    });
  
                }
            });
        });
    });
    div3.appendChild(a3);
    div.appendChild(div3);
    container.appendChild(div);
    document.querySelector('#products').appendChild(container);
}

function getProducts(){
    apiCall("/product/getAll", "GET", null, (res) => {
        products = res;
        products.forEach(product => {
            displayProduct(product);
        });
    });
}

getProducts();

function fetchWithTimeout(url, options, timeout = 10000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
}


async function createPdf(orderData,callback) {
    let doc = new jsPDF();
    
    // Set the font
    doc.setFont("helvetica");
  
    // Company name
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.text("Spring Halloween", 20, 35);
  
    // User and address info
    doc.setFontSize(12);
    doc.setFontStyle("normal");
    const userInfo = `${user.firstName} ${user.lastName}\n${user.email}\n${orderData.address.address} ${orderData.address.name}\n${orderData.address.city}, ${orderData.address.zipcode}\n${orderData.address.country}`;
    doc.text(userInfo, 150, 35, { align: "right" });
  
    // Table headers
    doc.setFillColor(230, 230, 230);
    doc.rect(20, 60, 170, 10, 'F');
    doc.setFontSize(14);
    doc.text("Image", 22, 68);
    doc.text("Quantité", 45, 68);
    doc.text("Nom du produit", 70, 68);
    doc.text("Enterprise", 130, 68);
    doc.text("Prix", 170, 68);
  
    // Draw table data
    doc.setFontSize(12);
    doc.text("1", 50, 82);
    doc.text(orderData.product.name, 72, 82);
    doc.text(orderData.product.enterprise.name, 132, 82);
    doc.text(orderData.product.price.toString() + " €", 172, 82, { align: "right" });
  
    // Fetch the image using a CORS proxy
    const imageUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(orderData.product.photo);
    const img = await fetchWithTimeout(imageUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }).then((response) => response.blob());
    
    const imgData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                resolve({
                    dataUrl: reader.result,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                });
            };
        };
        reader.readAsDataURL(img);
    });
  
    // Check the image format and add the image to the PDF
    const format = img.type.split("/")[1].toUpperCase();
    if (["JPEG", "PNG", "GIF"].includes(format)) {
        doc.addImage(imgData.dataUrl, format, 22, 72, 18, (imgData.height * 18) / imgData.width);
    }
  
    // Draw table borders
    doc.setLineWidth(0.5);
    doc.rect(20, 60, 170, 32); //grand rectangle table
    doc.line(20, 70, 190, 70); //ligne sous header
    doc.line(42, 60, 42, 92); //ligne verticale entre image et quantity
    doc.line(68, 60, 68, 92); //ligne verticale entre quantity et product name
    doc.line(128, 60, 128, 92); //ligne verticale ente product name et enterprise
    doc.line(168, 60, 168, 92); //ligne verticale entre enterprise et price
    
    // Bill footer
    doc.setFontSize(15);
    doc.text("Merci d'avoir fait vos achats chez Spring Halloween !", 20, 280);
    
    // Save the PDF
    const now_str = Date.now().toString();
    const bill_name = "bill_spring_halloween_" + orderData.id + "_" + user.firstName + "" + user.lastName + "_" + now_str + ".pdf";
    doc.save(bill_name);
    callback();
}