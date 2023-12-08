let globalemail;





function registration(){

    let name = document.getElementById('name').value.trim();
    let namecapital = name.charAt(0)
    let email = document.getElementById('email').value;
    let phoneno = document.getElementById('phoneno').value;
    let password = document.getElementById('password').value;
    let confirmpassword  = document.getElementById('confirmpassword').value;
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let phonenostart = /[9,8,7]/g
    let specialcharacter = /[!,@,#,$,%,^,&,*,(,)]/g;
    let emailat = /[@]/g
    let getpasswordlength = password.length;
    var phoneNum = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/; 
  


    if(name.length == 0 && email.length == 0 && phoneno.length == 0 && password.length == 0 && confirmpassword.length == 0)
    {
        document.getElementById('name').style.border = '2px solid red'
        document.getElementById('namevalidation').innerHTML = 'Please enter your Name.'

        document.getElementById('email').style.border = '2px solid red'
        document.getElementById('emailvalidation').innerHTML = 'Please enter your Email'
        
        document.getElementById('phoneno').style.border = '2px solid red'
        document.getElementById('phonenovalidation').innerHTML = 'Please enter your Phone no.'
        
        document.getElementById('password').style.border = '2px solid red'
        document.getElementById('passwordvalidation').innerHTML = 'Please enter your Password'
        
        document.getElementById('confirmpassword').style.border = '2px solid red'
        document.getElementById('confirmpasswordvalidation').innerHTML = 'Please enter your Confirm password'
    }

    else if(name.length == 0){
        document.getElementById('name').style.border = '2px solid red'
        document.getElementById('namevalidation').innerHTML = 'Please enter your Name.'
    }
    else if(!namecapital.match(upperCaseLetters)){
        document.getElementById('name').style.border = '2px solid red'
        document.getElementById('namevalidation').innerHTML = 'Your name should start form Capital latter.'
    
    }
    else if(email.length == 0){
        document.getElementById('name').style.border = 'none'
        document.getElementById('namevalidation').innerHTML = ''


        document.getElementById('email').style.border = '2px solid red'
        document.getElementById('emailvalidation').innerHTML = 'Please enter your Email'
    
    }
    else if(!email.match(emailat)){
        document.getElementById('name').style.border = 'none'

        document.getElementById('email').style.border = '2px solid red'
        document.getElementById('emailvalidation').innerHTML = 'Must include @gmail.com'
    
    }
    else if(!phoneno.match(phoneNum)){
        document.getElementById('email').style.border = 'none'
        document.getElementById('phoneno').style.border = '2px solid red'
        document.getElementById('phonenovalidation').innerHTML = 'Please enter 10 digit valid Phone no.'
    
        }

    else if(!phoneno.match(phonenostart)){
        document.getElementById('email').style.border = 'none'
        document.getElementById('phoneno').style.border = '2px solid red'
        document.getElementById('phonenovalidation').innerHTML = 'No. must start from 9,8 or 7'
        }
        else if(password.length == 0){
            document.getElementById('phoneno').style.border = 'none'
        
            document.getElementById('password').style.border = '2px solid red'
            document.getElementById('passwordvalidation').innerHTML = 'Please enter your Password'
        
          }
          else if(password.length < 7){
            console.log(password.length);
            document.getElementById('phoneno').style.border = 'none'
        
            document.getElementById('password').style.border = '2px solid red'
            document.getElementById('passwordvalidation').innerHTML = 'minmum 8 characters required'
        
          }
          else if(!password.match(numbers) || !password.match(upperCaseLetters) || !password.match(lowerCaseLetters) || !password.match(specialcharacter)){
            document.getElementById('phoneno').style.border = 'none'
            
            document.getElementById('password').style.border = '2px solid red'
            document.getElementById('passwordvalidation').innerHTML = 'must contain one special character, uppercase letter, lowercase letter and number'

          }
          else if(password != confirmpassword){
            document.getElementById('password').style.border = 'none'
        
            document.getElementById('confirmpassword').style.border = '3px solid red'
            document.getElementById('confirmpasswordvalidation').innerHTML = 'Password did not match'
          }
          else{
            document.getElementById('confirmpassword').style.border = 'none'
            
            
            localStorage.setItem('globalemail', email);


            let storedata = JSON.parse(localStorage.getItem('formdata')) || [];

            const duplicate = storedata.some(data => data.email === email || data.phoneno === phoneno);

            if(duplicate){
                alert('email allready exist');
                return;
            }

            const formdata = {
                name: name,
                email: email,
                phoneno: phoneno,
                password: password
            };

            storedata.push(formdata);
            localStorage.setItem('formdata',JSON.stringify(storedata));
            window.location.href = "../../assets/pages/home.html"
            alert('user registration sucessful');
          }
}



// login
function loginform(){
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
    localStorage.setItem('userEmail', email);
  
    const storedatar = JSON.parse(localStorage.getItem('formdata')) || [];
    
    const user = storedatar.find(data => data.email == email);
  
    if(user.email == email && user.password === password){
      
      document.getElementById('loginemail').style.border = 'none'
      document.getElementById('loginpassword').style.border = 'none'
      alert('Login successful')
      window.location.href = '../assignment/assets/pages/home.html';
  
    }

    else{
      document.getElementById('loginemail').style.border = '3px solid red'
      document.getElementById('loginpassword').style.border = '3px solid red'
      document.getElementById('validateemail').innerHTML = 'enter valid email.'
  
      document.getElementById('validatelogin').innerHTML = 'enter valid password.'
    }
  }

  function fetchdata(){
    fetch("https://fakestoreapi.com/products").then((data)=>{
// console.log(data)
return data.json();

    }).then((objectdata)=>{
      

      let product = document.getElementById('product');
      let maindiv = document.createElement("div")
      for(let i = 0; i < objectdata.length; i++){
        // console.log(objectdata[i])
        let column = document.createElement('div')
        column.setAttribute("class", "col-lg-3 col-md-4 col-sm-6 mtb-4")
        let box = document.createElement('div')
        box.setAttribute("class", "ProductBox Center")
        let img = document.createElement('img')
        img.setAttribute('src' , objectdata[i].image) 
        maindiv.appendChild(column)
        column.appendChild(box)
        box.appendChild(img)
        let hr = document.createElement('hr')
        box.appendChild(hr)
        let title = document.createElement('h5')
        title.textContent = objectdata[i].title;
        box.appendChild(title);
        let p = document.createElement('p')
        p.textContent = "Price: ₹ " + objectdata[i].price * 80
        // p.textContent = objectdata[i].rating
        // let no = 0
        // console.log(objectdata[i].rating[0])

        box.appendChild(p)
        let button = document.createElement('button')
        button.setAttribute('id', 'id')
        button.setAttribute('class', 'shopnowbutton')
        button.setAttribute('value', objectdata[i].id)
        button.setAttribute('onclick', "detailedproductdata()")
        

        button.textContent = 'Shop Now'
        box.appendChild(button)        



      console.log(objectdata[i])
    }
    product.appendChild(maindiv)
      
    })
  }

function detailedproductdata(){
  let button = document.querySelectorAll('button');

   button.forEach(button =>{
    button.addEventListener('click', ()=>{
     localStorage.setItem('id', (button.value))
     window.location.href = "../../assets/pages/product.html"
      
    })
   })
  }


function productdetails(){
  let id = localStorage.getItem('id')
  console.log(id)

  fetch("https://fakestoreapi.com/products").then((data)=>{
    // console.log(data)
    return data.json();
    
        }).then((objectdata)=>{

          let productdetails = document.getElementById('productdetails')
          let div = document.createElement('div')
          let div2 = document.createElement('div')
          

          for(let i = 0; i < objectdata.length; i++){
          if(objectdata[i].id == id){
            console.log(objectdata[i].title)
            div.setAttribute('class', 'col-lg-6')
            let img = document.createElement('img')
            img.setAttribute('src', objectdata[i].image)
            img.setAttribute('class', 'detailimgstyle mtb-4')

            div.appendChild(img)

            div2.setAttribute('class', 'col-lg-6')
            let title = document.createElement('h2')
            title.textContent = objectdata[i].title
            div2.appendChild(title)
            let category = document.createElement('strong')
            category.setAttribute('class', 'mb-3')
            category.textContent = objectdata[i].category
            div2.appendChild(category)
            let description = document.createElement('p')
            description.setAttribute('class', 'mb-3')
            description.textContent = objectdata[i].description
            div2.appendChild(description)
            let rating = document.createElement('p')
            rating.textContent = objectdata[i].rating.rate + " Star" + " | " + objectdata[i].rating.count.toString() + " Ratings"
            div2.appendChild(rating)
            let price = document.createElement('Strong')
            price.textContent = "₹ " + objectdata[i].price*80
            div2.appendChild(price)
            let brake = document.createElement('br')
            div2.appendChild(brake)

            let button = document.createElement('button')
            button.setAttribute('class', 'shopnowbutton mtb-4')
            button.textContent = "Add To Cart"
            button.setAttribute('onclick', 'addtocart()')
            div2.appendChild(button)
          }     
          productdetails.appendChild(div)  
          productdetails.appendChild(div2)
        }        
        })
}






function addtocart(){            
globalemail = localStorage.getItem('globalemail')
  let storedata = JSON.parse(localStorage.getItem('cartdata')) || [];
let iddata = localStorage.getItem('id')
  const duplicate = storedata.some(data => data.id === iddata);

  if(duplicate){
      return;
  }

  const cartdata = {
    id: iddata
  };

  storedata.push(cartdata);
  localStorage.setItem('cartdata',JSON.stringify(storedata));
}






function loadcartdetails(){
  globalemail = localStorage.getItem('globalemail')
  // console.log(globalemail)

  fetch("https://fakestoreapi.com/products").then((data)=>{
    // console.log(data)
    return data.json();
    
        }).then((objectdata)=>{
          // console.log(objectdata)
          let cartdetail = JSON.parse(localStorage.getItem('cartdata')) || [];
          console.log(cartdetail)
          let productlist = document.getElementById('cartpage')
          for(let i = 0; i < cartdetail.length; i++){
            // console.log(cartdetail[i])
            let productids = cartdetail[i].id
// console.log(productids)
            
            let maindiv = document.createElement('div')
             for(j = 0; j < objectdata.length; j++)
             {
              if(productids == objectdata[j].id){
                // console.log(objectdata[j].id)

                let div = document.createElement('div')
                div.setAttribute('class', 'col-lg-12 cartbox')
                let row = document.createElement('div')
                row.setAttribute('class','row')
                div.appendChild(row)
                let col = document.createElement('div')
                col.setAttribute('class', 'col-lg-4 Center')
                row.appendChild(col)
                let img = document.createElement('img')
                img.setAttribute('src', objectdata[j].image)
                img.setAttribute('class','cartimg')
                col.appendChild(img)

                let col2 = document.createElement('div')
                col2.setAttribute('class', 'col-lg-8')
                let h4 = document.createElement('h4')
                h4.textContent = objectdata[j].title
                col2.appendChild(h4)
                let p = document.createElement('p')
                p.textContent = objectdata[j].category
                col2.appendChild(p)
                let p1 = document.createElement('p')
                p1.textContent = objectdata[j].description
                col2.appendChild(p1)


                let rating = document.createElement('p')
                rating.textContent = objectdata[j].rating.rate + " Star" + " | " + objectdata[i].rating.count.toString() + " Ratings"
                col2.appendChild(rating)
                let price = document.createElement('Strong')
                price.textContent = "₹ " + objectdata[j].price*80
                col2.appendChild(price)
                let brake = document.createElement('br')
                col2.appendChild(brake)


                let table = document.createElement('table')
                table.setAttribute('border', 'solid 1px')
                table.setAttribute('class', 'mt15')

                col2.appendChild(table)
                let tr = document.createElement('tr')
                table.appendChild(tr)
                let td = document.createElement('td')
                let minusbutton = document.createElement('button')
                minusbutton.textContent = "-"
                minusbutton.setAttribute('class', 'quantatybutton minusbutton')
                
                
                td.appendChild(minusbutton)
                tr.appendChild(td)


                let td1 = document.createElement('td')
                
                td1.textContent = "3"
                td1.setAttribute('class', 'quantatybutton quantaty')
                td1.setAttribute('value', '3')

                tr.appendChild(td1)


                let td2 = document.createElement('td')
                let plusbutton = document.createElement('button')
                plusbutton.textContent = "+"
                plusbutton.setAttribute('class', 'quantatybutton plusbutton')
                plusbutton.setAttribute('onclick', 'quantaty()')

                td2.appendChild(plusbutton)
                tr.appendChild(td2)


                
                let remove = document.createElement('button')
                remove.textContent = 'Remove'
                remove.setAttribute('id', objectdata[j].id)
                remove.setAttribute('class', 'shopnowbutton mt15')
                remove.setAttribute('onclick', `removechild(${objectdata[j].id})`)
                

                col2.appendChild(remove)

                row.appendChild(col2)

                maindiv.appendChild(div)

              }
              // console.log(storedid)
              
              
              productlist.appendChild(maindiv)
             



              

              // maindiv.addEventListener('click',function(f){
              //   if(f.target.classList.contains('shopnowbutton')){
              //     f.target.parentElement.parentElement.parentElement.remove()
              //   }
              // })

             }
             

          }
          let buynowbutton = document.createElement('button')
              buynowbutton.textContent = "Buy Now"
              buynowbutton.setAttribute('class', 'shopnowbutton')
              buynowbutton.setAttribute('onclick','addresspage()')

              let removeall = document.createElement('button')
              removeall.textContent = "Remove All"
              removeall.setAttribute('onclick', 'removeall()')
              removeall.setAttribute('class', 'shopnowbutton ml mtb-4 removeall')
             productlist.appendChild(buynowbutton)
             productlist.appendChild(removeall)

            productlist.addEventListener('click', function (f) {
              if (f.target.classList.contains('removeall')) {
                f.target.parentElement.remove()
              }
              localStorage.removeItem('cartdata')
            })
        })
        // let abc = localStorage.getItem('key')
        // console.log(abc)
}





function removechild(remove){
   let buttonid = remove
   console.log(buttonid)
    globalemail = localStorage.getItem('key')
    console.log(globalemail)
   let button = document.querySelectorAll('button');

   button.forEach(button =>{
    button.addEventListener('click', ()=>{
      for(i = 0; i< null.length; i++){
      localStorage.removeItem(globalemail[i])
    }
    })
   })

}



function removeall(){
  
}



function addresspage(){
  globalemail = localStorage.getItem('globalemail')
  if(globalemail == '' || globalemail == null || globalemail == undefined){
  
  alert('regiseter or login first to buy products from shop ')
}
else{
  window.location.href = "../pages/address.html"
}
}




function addressdetail(){
globalemail = localStorage.getItem('globalemail')
let name = document.getElementById('name').value
let namecapital = name.charAt(0)

let email = document.getElementById('email').value
let pincode = document.getElementById('pincode').value
let address = document.getElementById('address').value
let town = document.getElementById('town').value
let city = document.getElementById('city').value
let state = document.getElementById('state').value
let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let phonenostart = /[9,8,7]/g
    let specialcharacter = /[!,@,#,$,%,^,&,*,(,)]/g;
    let emailat = /[@]/g

    var phoneNum = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/; 

if(name.length == 0 && email.length == 0 && pincode.length == 0 && address.length == 0 && town.length == 0 && city.length == 0 && state.length == 0)
    {
        document.getElementById('name').style.border = '2px solid red'
        document.getElementById('namevalidation').innerHTML = 'Please enter your Name.'

        document.getElementById('email').style.border = '2px solid red'
        document.getElementById('emailvalidation').innerHTML = 'Please enter your Email'
        
        document.getElementById('pincode').style.border = '2px solid red'
        document.getElementById('pincodevalidation').innerHTML = 'Please enter your Pincode.'
        
        document.getElementById('address').style.border = '2px solid red'
        document.getElementById('addressvalidation').innerHTML = 'Please enter your Address'
        
        document.getElementById('town').style.border = '2px solid red'
        document.getElementById('townvalidation').innerHTML = 'Please enter your town'

        document.getElementById('city').style.border = '2px solid red'
        document.getElementById('cityvalidation').innerHTML = 'Please enter your city'
        
        document.getElementById('state').style.border = '2px solid red'
        document.getElementById('statevalidation').innerHTML = 'Please enter your state'
    }
    else if(name.length == 0){
      document.getElementById('name').style.border = '2px solid red'
      document.getElementById('namevalidation').innerHTML = 'Please enter your Name.'
  }
  else if(!namecapital.match(upperCaseLetters)){
      document.getElementById('name').style.border = '2px solid red'
      document.getElementById('namevalidation').innerHTML = 'Your name should start form Capital latter.'
  
  }
  else if(email.length == 0){
      document.getElementById('name').style.border = 'none'
      document.getElementById('namevalidation').innerHTML = ''

      document.getElementById('email').style.border = '2px solid red'
      document.getElementById('emailvalidation').innerHTML = 'Please enter your Email'
  
  }
  else if(!email.match(emailat)){
    document.getElementById('name').style.border = 'none'
    document.getElementById('namevalidation').innerHTML = ''

      document.getElementById('email').style.border = '2px solid red'
      document.getElementById('emailvalidation').innerHTML = 'Must include @gmail.com'
  
  }
  else if(pincode.length == 0 || address.length == 0 || town.length == 0 || city.length == 0 || state.length == 0)
  {
    document.getElementById('email').style.border = ''
    document.getElementById('emailvalidation').innerHTML = ''


     
      document.getElementById('pincode').style.border = '2px solid red'
      document.getElementById('pincodevalidation').innerHTML = 'Please enter your Pincode.'
      
      document.getElementById('address').style.border = '2px solid red'
      document.getElementById('addressvalidation').innerHTML = 'Please enter your Address'
      
      document.getElementById('town').style.border = '2px solid red'
      document.getElementById('townvalidation').innerHTML = 'Please enter your town'

      document.getElementById('city').style.border = '2px solid red'
      document.getElementById('cityvalidation').innerHTML = 'Please enter your city'
      
      document.getElementById('state').style.border = '2px solid red'
      document.getElementById('statevalidation').innerHTML = 'Please enter your state'
  }

  else{
    document.getElementById('pincode').style.border = ''
    document.getElementById('pincodevalidation').innerHTML = ''
    
    document.getElementById('address').style.border = ''
    document.getElementById('addressvalidation').innerHTML = ''
    
    document.getElementById('town').style.border = ''
    document.getElementById('townvalidation').innerHTML = ''

    document.getElementById('city').style.border = ''
    document.getElementById('cityvalidation').innerHTML = ''
    
    document.getElementById('state').style.border = ''
    document.getElementById('statevalidation').innerHTML = ''


    let storedata = JSON.parse(localStorage.getItem('addressdetails')) || [];

    const duplicate = storedata.some(data => data.email === email);

    if(duplicate){
        alert('email allready exist');
        return;
    }

    const addressdetails = {
        name: name,
        email: email,
        pincode: pincode,
        address: address,
        town: town,
        city: city,
        state: state
    };

    storedata.push(addressdetails);
    localStorage.setItem('addressdetails',JSON.stringify(storedata));
    localStorage.setItem(globalemail, JSON.stringify(addressdetails))
    window.location.href = "../pages/payment.html"

  }

}



// payment

function confirmation()
{
  globalemail = localStorage.getItem('globalemail')
  // console.log(globalemail)

  fetch("https://fakestoreapi.com/products").then((data)=>{
    // console.log(data)
    return data.json();
    
        }).then((objectdata)=>{
          // console.log(objectdata)
          let paymentdetails = JSON.parse(localStorage.getItem('cartdata')) || [];
          console.log(paymentdetails)


          let confirm = document.getElementById('Confirmation')
          let table = document.createElement('table')
          table.setAttribute('border', '1px')
          table.setAttribute('class','tablestyle')
          confirm.appendChild(table)
          for(i=0; i < objectdata.length; i++){

              for(j=0; j < paymentdetails.length ; j++){
                if(paymentdetails[j].id == objectdata[i].id){
                  console.log('yes')

                  let tr = document.createElement('tr')
                  table.appendChild(tr)
                  let th = document.createElement('th')
                  tr.appendChild(th)
                    th.textContent = j+1;

                  let th1 = document.createElement('th')
                  tr.appendChild(th1)

                  th1.textContent = objectdata[i].title
                  let th2 = document.createElement('th')
                  tr.appendChild(th2)

                  th2.textContent = "₹ " + objectdata[i].price*80
                  


                }
                

              }

 
          }
          let buttondiv = document.createElement('div')
          let button = document.createElement('button')
          buttondiv.setAttribute('class', 'alignright')
          
          button.textContent = 'Confirm Payment'
          button.setAttribute('class', 'confirmpayment ')
          button.setAttribute('onclick','paymentconfirm()')
          buttondiv.appendChild(button)
          confirm.appendChild(buttondiv)




        })
}

function paymentconfirm(){
  window.location.href = "../pages/invoice.html"
}






function invoice(){
let invoicedata = JSON.parse(localStorage.getItem('formdata')) || []
let cartdata = JSON.parse(localStorage.getItem('cartdata')) || []


globalemail = localStorage.getItem('globalemail')



fetch("https://fakestoreapi.com/products").then((data)=>{
    // console.log(data)
    return data.json();
    
        }).then((objectdata)=>{

console.log(objectdata)

 let table = document.getElementById('productdetails')
 
 
for(i=0; i < cartdata.length; i++)
{
  for(j=0; j < objectdata.length; j++){

    if(objectdata[j].id == cartdata[i].id){


      let tr =document.createElement('tr')

      let td = document.createElement('td')
      td.textContent = j
    tr.appendChild(td)

let td1 = document.createElement('td')
td1.textContent = objectdata[j].title
tr.appendChild(td1)

let td2 = document.createElement('td')
td2.textContent = objectdata[j].category
tr.appendChild(td2)

let td3 = document.createElement('td')
td3.textContent = 1
tr.appendChild(td3)

let td4 = document.createElement('td')
td4.textContent = "₹ " + objectdata[j].price * 80
td4.setAttribute('class','alignright')
tr.appendChild(td4)

table.appendChild(tr)
let tr2 = document.createElement('tr')


    }
  }


}


        })





  const randomNumber = Math.floor(Math.random() * 1000);
const paddedNumber = randomNumber.toString().padStart(3, '0');
  const remainingDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const finalNumber = paddedNumber + remainingDigits;
const currentdate = new Date();
const date = currentdate.getDate().toString();
const month = currentdate.getMonth().toString();
const year = currentdate.getFullYear().toString();
let table = document.getElementById('productdetails')
const address = JSON.parse(localStorage.getItem(globalemail))


for( let i = 0; i < invoicedata.length; i++)
if(invoicedata[i].email === globalemail){
  console.log(invoicedata[i])
  document.getElementById('name').innerHTML = invoicedata[i].name
  document.getElementById('email').innerHTML = invoicedata[i].email
  document.getElementById('phoneno').innerHTML = invoicedata[i].phoneno
  document.getElementById('invoiceno').innerHTML = finalNumber;
  document.getElementById('currentdate').innerHTML = date + "/" + month + "/" +  year;
  document.getElementById('orderno').innerHTML = remainingDigits
  document.getElementById('address').innerHTML = address.town + "<br>" + address.state + "<br>" + address.pincode
}





}







function userpage(){
  globalemail = localStorage.getItem('globalemail')
  // console.log(globalemail)

  fetch("https://fakestoreapi.com/products").then((data)=>{
    // console.log(data)
    return data.json();
    
        }).then((objectdata)=>{
          // console.log(objectdata)
          let cartdetail = JSON.parse(localStorage.getItem('cartdata')) || [];
          console.log(cartdetail)
          let productlist = document.getElementById('cartpage')
          for(let i = 0; i < cartdetail.length; i++){
            // console.log(cartdetail[i])
            let productids = cartdetail[i].id
// console.log(productids)
            
            let maindiv = document.createElement('div')
             for(j = 0; j < objectdata.length; j++)
             {
              if(productids == objectdata[j].id){
                // console.log(objectdata[j].id)

                let div = document.createElement('div')
                div.setAttribute('class', 'col-lg-12 cartbox')
                let row = document.createElement('div')
                row.setAttribute('class','row')
                div.appendChild(row)
                let col = document.createElement('div')
                col.setAttribute('class', 'col-lg-4 Center')
                row.appendChild(col)
                let img = document.createElement('img')
                img.setAttribute('src', objectdata[j].image)
                img.setAttribute('class','cartimg')
                col.appendChild(img)

                let col2 = document.createElement('div')
                col2.setAttribute('class', 'col-lg-8')
                let h4 = document.createElement('h4')
                h4.textContent = objectdata[j].title
                col2.appendChild(h4)
                let p = document.createElement('p')
                p.textContent = objectdata[j].category
                col2.appendChild(p)
                let p1 = document.createElement('p')
                p1.textContent = objectdata[j].description
                col2.appendChild(p1)


                let rating = document.createElement('p')
                rating.textContent = objectdata[j].rating.rate + " Star" + " | " + objectdata[i].rating.count.toString() + " Ratings"
                col2.appendChild(rating)
                let price = document.createElement('Strong')
                price.textContent = "₹ " + objectdata[j].price*80
                col2.appendChild(price)
                let brake = document.createElement('br')
                col2.appendChild(brake)


            
             


                
                

                

                row.appendChild(col2)

                maindiv.appendChild(div)

              }
              // console.log(storedid)
              
              
              productlist.appendChild(maindiv)
             



              

              // maindiv.addEventListener('click',function(f){
              //   if(f.target.classList.contains('shopnowbutton')){
              //     f.target.parentElement.parentElement.parentElement.remove()
              //   }
              // })

             }
             

          }
         
        })
        // let abc = localStorage.getItem('key')
        // console.log(abc)
}