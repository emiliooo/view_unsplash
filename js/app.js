var username = document.getElementById("input_search")
username.addEventListener("blur", nameVerify,true);

function nameVerify(){
    if(username.value === ""){
            document.getElementById("hidden").style.display = 'block'
    }else{
        document.getElementById("hidden").style.display = 'none'
    }
}

var selected_value = 'photos';
function getSelected(){
    selected_value = document.getElementById('select_value').value;
}

function sendRequest(){
    console.log(selected_value  )
    var value_search = document.getElementById("input_search").value;
    var url = "https://api.unsplash.com/search/" + selected_value + "/?per_page=30&query=" + value_search; 
    console.log(url)
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleRequest;
    request.open('GET' , url , true);
    request.setRequestHeader('Authorization','Client-ID 4166fc3e28e40a517d62292de445e93a8717387520e090b408e3510d774293f5'); // Unique client ID.
    request.send();

    function handleRequest(){
        if(this.readyState === 4 && this.status === 200){
            var response = JSON.parse(request.responseText)
            if(selected_value === 'users'){
                for(i = 0 ;i < 3 ; i++){
                    var img = document.createElement("img");
                    img.src = response.results[0].photos[i].urls.full
                    var foo = document.getElementById('container_pictures');
                    foo.appendChild(img)
                  }
            }
            if(selected_value === 'photos'){
                for(i = 0 ;i < response.results.length ; i++){
                  var img = document.createElement("img");
                  img.src = response.results[i].urls.full;
                  var foo = document.getElementById('container_pictures');
                  foo.appendChild(img)
                }
            }
            if(selected_value === 'collections'){
                for(i = 0 ;i < response.results.length ; i++){
                  var img = document.createElement("img");
                  img.src = response.results[i].preview_photos[0].urls.full;
                  var foo = document.getElementById('container_pictures');
                  foo.appendChild(img)
                }
            }
        }
    }
}
function enterfunc(e) {
    if (13 == e.keyCode) {
        sendRequest();
    }
  }

var btn = document.querySelector('button');
btn.addEventListener('click',sendRequest)
document.addEventListener('keydown', enterfunc )



 