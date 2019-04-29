function confirmPostCode(){
  let input = document.getElementById("input").value;
  let res = input.split("");
  if(res[1] == "0" || res[1] == "1" || res[1] == "2" || res[1] == "3" || res[1] == "4" || res[1] == "5" || res[1] == "6" || res[1] == "7" || res[1] == "8" || res[1] == "9" ){
    hideForm();
  }
  else{
    showError();
  }
};

function showError(){
  let error = document.getElementById("error");
  error.style.display = "flex"
}

function hideForm(){
  let form = document.getElementById("form");
  form.style.display = "none"
}
