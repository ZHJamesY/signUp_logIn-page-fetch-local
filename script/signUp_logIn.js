
let promise = new Promise(function(resolve, reject){
    fetch("../accountData/accounts.csv")
    .then((response) => response.text())
    .then((CSVdata) =>
    {
        let accounts = CSVdata.split(/\r?\n/);
        let keys = accounts[0].split(",");
        let dict = {};
  
        for (let i = 1; i < accounts.length; i++) 
        {
            let account = accounts[i].split(",");
            console.log(account)
            for(let j = 0; j < keys.length; j++)
            {
                let key = keys[j];
                let value = account[j];
                
                if(!dict[key])
                {
                    dict[key] = [value];
                }
                else
                {
                    dict[key].push(value);
                }
            }
        }
        
        resolve(dict);
    })
    .catch(function(error)
    {
        reject("Fail to read file, something went wrong!");
        console.log(error);
    });
})

$(function(){
    promise.then(function(accounts){
        SignUp(accounts);
        LogIn(accounts);

    });
})

function LogIn(accounts)
{
    $("#log_in_button").on("click", function(){
        let username = $('#Lusername').val();
        let password = $('#Lpassword').val();
        console.log(accounts)
        if((!accounts.username.includes(username) && username != "" && password != ""))
        {
            alert("Username/Password incorrect")
            $('#Lusername').val("");
            $('#Lpassword').val("");
        }
        else if((!accounts.password.includes(password) && password != "" && username != ""))
        {
            alert("Username/Password incorrect")
            $('#Lusername').val("");
            $('#Lpassword').val("");
        }
        else if(username != "" && password != "")
        {
            window.open("../index.html");
        }
    });
}

function SignUp(accounts)
{
    $("#sign_up_button").on("click", function(){
        let email = $('#Semail').val();
        let username = $('#Susername').val();
        let password = $('#Spassword').val();
        let repeatPassword = $('#Srepeat_password').val();
        alert(email)
        if(!email.includes("@") && email != "")
        {
            alert("Invalid email")
            $('#Semail').val("");
        }
        else if(accounts.email.includes(email))
        {
            alert("Email exist");
            $('#Semail').val("");
        }
        else if(accounts.username.includes(username))
        {
            alert("Username exist");
            $('#Susername').val("");
        }
        else if(password != repeatPassword)
        {
            alert("Password incorrect");
            $('#Srepeat_password').val("");
        }
        else if(email != "" && username != "" && password == repeatPassword)
        {
            window.open("../index.html");
        }
    });
}




