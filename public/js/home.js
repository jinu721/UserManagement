const username = document.getElementById("txt-username");
const uid = document.getElementById("txt-uid");
const email = document.getElementById("txt-email");
const btnLogout = document.getElementById("btn-logout");
const userInfo = document.getElementById("userInfo");
const adminImg = document.querySelector(".admin-img");

btnLogout.addEventListener('click',()=>{
  async function logoutRequest(){
    try{
       const resData = await fetch('/logout',{
        method:'POST'
      })
      const parsedData = await resData.json();
      if(parsedData.val){
        window.location.href = '/'
      }
    }catch(err){
      console.log("Logout request error"+err)
    }
  }
  logoutRequest();
})


adminImg.addEventListener('click',()=>{
  window.location.href = '/admin';
})

