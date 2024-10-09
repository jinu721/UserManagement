const btnLogin = document.querySelector("#btn-login");
const txtLogin = document.querySelector("#txt-login");
const loderLogin = document.querySelector("#loader-login");
const alertMsg = document.querySelector('#txt-alert');
const alertBg = document.querySelector('#alert');
const btnEdit = document.querySelector("#btn-edit");
const btnDelete = document.querySelector("#btn-delete");
const popup = document.querySelector("#popup");
const sectionTable = document.querySelector(".section-table");


btnLogin.addEventListener("click", () => {
  const name = document.querySelector("#inp-LoginName").value;
  const pass = document.querySelector("#inp-LoginPass").value;
  const val = validation(name,pass);
  if (val) {
    const userInfo = {
      name: name,
      pass: pass,
    };
    async function passData(){
      try{
        const data = await fetch('/admin',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userInfo)
        })
        const parsedData = await data.json()
        if(parsedData.val){
          txtLogin.style.display = "none";
          loderLogin.style.display = "block";
          setTimeout(()=>{
            window.location.href = '/dashboard';
          },2000)
        }else{
          showAlert(parsedData.err);
        }
      }catch(err){
        console.log("Data passing error : ",err)
      }
    }
    passData()
  }
});

//  Genarel validation
function validation(name,pass) {
  if(name === ""){
    showAlert("Name can't be empty");
  }else if(pass === "") {
    showAlert("Password can't be empty");
  }else {
    return true;
  }
  return false;
}

function showAlert(message) {
  alertBg.style.display = "flex";
  alertMsg.innerHTML = message;
}

// real-time username length validation

document.querySelector("#inp-LoginName").addEventListener("input", () => {
  const name = document.querySelector("#inp-LoginName").value;
  if (name === "") {
    showAlert("Name can't be empty");
  }else {
    alertBg.style.display = "none";
  }
});

document.querySelector("#inp-LoginPass").addEventListener("input", () => {
  const pass = document.querySelector("#inp-LoginPass").value;
  if (pass === "") {
    showAlert("Password can't be empty");
  }else {
    alertBg.style.display = "none";
  }
});


