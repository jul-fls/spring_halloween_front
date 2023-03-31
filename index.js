if(sessionStorage.getItem("user")!==null){
    user = JSON.parse(sessionStorage.getItem("user"));
}else{
    user = null;
}
if(user===null){
    a = document.createElement("a");
    a.innerHTML = "Se connecter";
    a.href = "login.html";
    a.classList.add("text-red-500","text-3xl","font-bold","underline");
    document.body.appendChild(a);
}else{
    a = document.createElement("a");
    a.innerHTML = "Dashboard";
    a.href = "dashboard.html";
    a.classList.add("text-green-500","text-3xl","font-bold","underline");
    a2 = document.createElement("a");
    a2.innerHTML = "Déconnexion";
    a2.href = "logout.html";
    a2.classList.add("text-red-500","text-3xl","font-bold","underline");
    document.body.appendChild(a);
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(a2);
}