function displayEntreprise(entreprise){
    const container = document.createElement('div');
    container.classList.add("w-full","max-w-sm","border","rounded-2xl","shadow-2xl","bg-gray-800","border-gray-700","text-white");
    const div = document.createElement('div');
    div.classList.add("px-5","pb-5","pt-4");
    const h5 = document.createElement('h5');
    h5.classList.add("text-xl","font-semibold","tracking-tight");
    const a = document.createElement('a');
    a.href = "#";
    a.innerHTML = entreprise.name;
    h5.appendChild(a);
    div.appendChild(h5);
    const div2 = document.createElement('div');
    div2.classList.add("flex","items-center","mt-2.5","mb-5");
    div2.id = "siret";
    div2.innerHTML = "Siret : "+entreprise.siret;
    const div2_2 = document.createElement('div');
    div2_2.classList.add("flex","items-center","mt-2.5","mb-5");
    div2_2.id = "creationDate";
    creationDate = new Date(entreprise.creation_date);
    creationDate_str = creationDate.getDate() + " " + creationDate.toLocaleString('default', { month: 'long' }) + " " + creationDate.getFullYear();
    div2_2.innerHTML = "Date de création : "+creationDate_str;
    div.appendChild(div2_2);
    const div2_3 = document.createElement('div');
    div2_3.classList.add("flex","items-center","mt-2.5","mb-5");
    div2_3.id = "owner_name";
    div2_3.innerHTML = "Propriétaire : "+entreprise.owner.firstName + " " + entreprise.owner.lastName;
    const div2_4 = document.createElement('div');
    div2_4.classList.add("flex","items-center","mt-2.5","mb-5");
    div2_4.id = "address";
    div2_4.innerHTML = entreprise.address.address+" "+ entreprise.address.name + ", " + entreprise.address.zipcode + " " + entreprise.address.city+ ", " + entreprise.address.country;
    div.appendChild(div2_4);
    div.appendChild(div2);
    container.appendChild(div);
    document.querySelector('#entreprises').appendChild(container);
}

function getEntreprises(){
    apiCall("/enterprise/getAll", "GET", null, (res) => {
        entreprises = res;
        entreprises.forEach(entreprise => {
            displayEntreprise(entreprise);
        });
    });
}

getEntreprises();