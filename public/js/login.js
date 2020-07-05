const login =async (email,password) =>{
    try{   
  const result = await axios({
        method:'POST',
        url:'http://localhost:3000/users/login',
        data:{
            email,
            password
        }
    });
    if(result.data.status === 'Success'){
        alert('logged in Successfully!!');
        window.setTimeout(()=>{
            location.assign('/');
        },1500);
    }
console.log(result);
    }catch(err){
        alert('Incorrect email or Password!!');
    }
};











document.querySelector('.form').addEventListener('submit',e =>{
e.preventDefault();
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
login(email,password);
});