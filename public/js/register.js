// Get DOM elements
const btnRegister = document.querySelector('.btn-reg');
const alertMsg = document.querySelector('#txt-alert');
const alertBg = document.querySelector('#alert');
const loaderRegister = document.querySelector('#loader-continue');
const txtBtnRegister = document.querySelector('#txt-btn1');

// Register button click
btnRegister.addEventListener('click', () => {
  const username = document.querySelector('#inp-username').value;
  const email = document.querySelector('#inp-email').value;
  const pass = document.querySelector('#inp-pass').value;
  const cpass = document.querySelector('#inp-confirmpass').value;
  
  // Validate the inputs
  let valid = validation(username, email, pass, cpass);
  if (valid) {
    const userInfo = {
      email: email,
      pass: pass,
      username: username,
    };
    async function passData(){
      try{
        const data = await fetch('/register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userInfo)
        })
        const parsedData = await data.json()
        if(parsedData.val){
          txtBtnRegister.style.display = "none";
          loaderRegister.style.display = "block";
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
function validation(username, email, pass, cpass) {
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if (username === "") {
    showAlert("Username can't be empty");
  } else if (username.length < 4 || username.length > 20) {
    showAlert("Username should be between 4 to 20 characters");
  } else if (!usernamePattern.test(username)) {
    showAlert("Username can only contain numbers, lowercase letters, and underscores");
  } else if (email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  } else if (pass === "") {
    showAlert("Password can't be empty");
  } else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  } else if (pass !== cpass) {
    showAlert("The confirm password and password should be the same.");
  } else {
    return true;
  }
  return false;
}

function showAlert(message) {
  alertBg.style.display = 'flex';
  alertMsg.innerHTML = message;
}

// real-time username length validation
document.querySelector('#inp-username').addEventListener('input', () => {
  const username = document.querySelector('#inp-username').value;
  const usernamePattern = /^[a-zA-Z0-9_]+$/;

  if (username === "") {
    showAlert("Username can't be empty");
  } else if (username.length < 4 || username.length > 20) {
    showAlert("Username should be between 4 to 20 characters");
  } else if (!usernamePattern.test(username)) {
    showAlert("Username can only contain letters, numbers, and underscores");
  } else {
    alertBg.style.display = 'none';  
  }
});

document.querySelector('#inp-email').addEventListener('input', () => {
  const email = document.querySelector('#inp-email').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  } else {
    alertBg.style.display = 'none';  
  }
});

document.querySelector('#inp-pass').addEventListener('input', () => {
  const pass = document.querySelector('#inp-pass').value;
  if (pass === "") {
    showAlert("Password can't be empty");
  } else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  } else {
    alertBg.style.display = 'none';  
  }
});

document.querySelector('#inp-confirmpass').addEventListener('input', () => {
  const pass = document.querySelector('#inp-pass').value;
  const cpass = document.querySelector('#inp-confirmpass').value;
  if (cpass === "") {
    showAlert("Confirm password can't be empty");
  } else if (pass !== cpass) {
    showAlert("The confirm password and password should be the same.");
  } else {
    alertBg.style.display = 'none';  
  }
});


document.querySelector('#txt-aleardyHave').addEventListener('click', () => window.location.href = "/login");
