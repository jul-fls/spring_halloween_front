BACKEND_API_URL = "http://89.156.51.241:8080/api";

//create a method that takes a path, a method, a body and a callback
function apiCall(path, method, body, callback) {
    if(method === "GET"){
        fetch(BACKEND_API_URL + path, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            try {
                // console.log("res : ", res);
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("api call failed.");
                    throw new Error("api call failed.");
                }
            } catch (error) {
                console.error(error);
            }
        })
        .then((data) => {
            callback(data);
        });
    }else{
        fetch(BACKEND_API_URL + path, {
            method: method,
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((res) => {
            try {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("api call failed.");
                    throw new Error("api call failed.");
                }
            } catch (error) {
                console.error(error);
            }
        })
        .then((data) => {
            callback(data);
        });
    }
}