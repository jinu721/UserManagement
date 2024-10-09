const btnLogin = document.querySelector("#btn-login");
const txtLogin = document.querySelector("#txt-login");
const loderLogin = document.querySelector("#loader-login");
const alertMsg = document.querySelector('#txt-alert');
const alertBg = document.querySelector('#alert');


btnLogin.addEventListener("click", () => {
  const email = document.querySelector("#inp-LoginEmail").value;
  const pass = document.querySelector("#inp-LoginPass").value;
  const val = validation(email,pass);
  if (val) {
    const userInfo = {
      email: email,
      pass: pass,
    };
    async function passData(){
      try{
        const data = await fetch('/login',{
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
            window.location.href = '/home';
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
function validation(email,pass) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  } else if (pass === "") {
    showAlert("Password can't be empty");
  } else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  } else {
    return true;
  }
  return false;
}

function showAlert(message) {
  alertBg.style.display = "flex";
  alertMsg.innerHTML = message;
}

// real-time username length validation

document.querySelector("#inp-LoginEmail").addEventListener("input", () => {
  const email = document.querySelector("#inp-LoginEmail").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  } else {
    alertBg.style.display = "none";
  }
});

document.querySelector("#inp-LoginPass").addEventListener("input", () => {
  const pass = document.querySelector("#inp-LoginPass").value;
  if (pass === "") {
    showAlert("Password can't be empty");
  } else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  } else {
    alertBg.style.display = "none";
  }
});

document
  .querySelector("#txt-RegisterNewAccount")
  .addEventListener("click", () => (window.location.href = "/register"));
