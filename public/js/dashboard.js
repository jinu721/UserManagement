// Get dom elements
const btnCreate = document.querySelector(".btnCreate");
const alertMsg = document.querySelector('#txt-alert');
const alertBg = document.querySelector('#alert');
const sectionTable = document.querySelector('.section-table');
const searcInp = document.querySelector('#searchInp');
const searchBtn = document.querySelector('#searchBtn');
// Add new button click
btnCreate.addEventListener("click", () => {
  const email = document.querySelector("#emailInpAdmin").value;
  const username = document.querySelector("#usernameInpAdmin").value;
  const pass = document.querySelector("#passInpAdmin").value;
  const role = document.querySelector("#roleInpAdmin").value;
  // Validate the inputs
  let valid = validation(email,username,pass,role);
  if (valid) {
      const userInfo = {
        email: email,
        username: username,
        pass: pass,
        role:role
      };
    async function passData() {
      try {
        const data = await fetch("/adminCreate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        const parsedData = await data.json();
        if (parsedData.val) {
          window.location.href = "/dashboard";
        } else {
          showAlert(parsedData.err);
        }
      } catch (err) {
        console.log("Data passing error : ", err);
      }
    }
    passData();
  }
});

//  Genarel validation
function validation(email,username,pass,role) {
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  }else if (username === "") {
    showAlert("Username can't be empty");
  } else if (username.length < 4 || username.length > 20) {
    showAlert("Username should be between 4 to 20 characters");
  } else if (!usernamePattern.test(username)) {
    showAlert(
      "Username can only contain numbers, lowercase letters, and underscores"
    );
  }else if (pass === "") {
    showAlert("Password can't be empty");
  }else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  }else if (role==="") {
    showAlert("The confirm password and password should be the same.");
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
document.querySelector("#emailInpAdmin").addEventListener("input", () => {
  const email = document.querySelector("#emailInpAdmin").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showAlert("Email can't be empty");
  } else if (!emailPattern.test(email)) {
    showAlert("Enter a valid email address");
  } else {
    alertBg.style.display = "none";
  }
});
document.querySelector("#usernameInpAdmin").addEventListener("input", () => {
  const username = document.querySelector("#usernameInpAdmin").value;
  const usernamePattern = /^[a-zA-Z0-9_]+$/;

  if (username === "") {
    showAlert("Username can't be empty");
  } else if (username.length < 4 || username.length > 20) {
    showAlert("Username should be between 4 to 20 characters");
  } else if (!usernamePattern.test(username)) {
    showAlert("Username can only contain letters, numbers, and underscores");
  } else {
    alertBg.style.display = "none";
  }
});


document.querySelector("#passInpAdmin").addEventListener("input", () => {
  const pass = document.querySelector("#passInpAdmin").value;
  if (pass === "") {
    showAlert("Password can't be empty");
  } else if (pass.length < 6) {
    showAlert("Password should be at least 6 characters");
  } else {
    alertBg.style.display = "none";
  }
});

document.querySelector("#roleInpAdmin").addEventListener("input", () => {
  const role = document.querySelector("#roleInpAdmin").value;
  if(role === "") {
    showAlert("Confirm password can't be empty");
  }else {
    alertBg.style.display = "none";
  }
});

function editClick(userId,username,email,role) {
  console.log(userId,username,email,role)
  document.querySelector('#userId-store').value = userId;
  document.querySelector('#inp-username').value = username;
  document.querySelector('#inp-role').value = email;
  document.querySelector('#inp-email').value = role;
  popup.style.display = "block";
  sectionTable.style.display = "none";
}
async function deleteClick(userId) {
    try {
        const data = await fetch(`/delete/${userId}`, {
            method: "DELETE",
            // credentials:'include'
        });
        const parsedData = await data.json();
        if (parsedData.val) {
            window.location.href = "/dashboard";
        } else {
            alert(parsedData.err);
        }
    } catch (err) {
        console.log("Data passing error : ", err);
    }
}
async function updateClick() {
    const updateUsername = document.querySelector('#inp-username').value;
    const updateRole = document.querySelector('#inp-role').value;
    const updateEmail = document.querySelector('#inp-email').value;
    const updateInfo = {
        username:updateUsername,
        role:updateRole,
        email:updateEmail
    }
    const userId = document.querySelector('#userId-store').value;
    try{
        const resData = await fetch(`/updateUser/${userId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateInfo)
        });
        const parsedData = await resData.json();
        if(parsedData.val){
            console.log('succes')
            window.location.href = '/dashboard';
        }
    }catch(err){
        console.log(err);
    }
}
function cancelClick(userId) {
  popup.style.display = "none";
  sectionTable.style.display = "block";
}
