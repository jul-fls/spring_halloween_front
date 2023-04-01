if(sessionStorage.getItem("user")!==null){
    user = JSON.parse(sessionStorage.getItem("user"));
    user_name_label = document.getElementById("user_name_label");
    user_name_label.innerHTML = user.firstName + " " + user.lastName;
    user_email_label = document.getElementById("user_email_label");
    user_email_label.innerHTML = user.email;
}else{
    user = null;
    window.location.href = "login.html";
}