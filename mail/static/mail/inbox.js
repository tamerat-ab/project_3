document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', sendmail);

  // By default, load the inbox
 load_mailbox('inbox');

 
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';


  // Clear out composition fields
 
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  // document.querySelector('#ls').style.display = 'block';
  document.querySelector('#email-detail').style.display = 'none';

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data => {

   
    console.log(data);

    for (let i=0; i < data.length; i++) {
      let send=data[i]['sender']
      let id=data[i]['id']
      let time=data[i]['timestamp']
      let subject=data[i]['subject']
      let body=data[i]['body']
      
        
        
         const li=document.createElement('button');
         li.setAttribute('data-email_id', `${id}`);
         li.setAttribute('id', 'button');
         const div=document.createElement('div');
         div.setAttribute("id", 'color');
         li.appendChild(document.createTextNode(id));
         div.appendChild(li);
        document.querySelector('#emails-view').appendChild (div)}

        document.querySelectorAll('#button').forEach(function(button){button.onclick=function(){
        fetch(`/emails/${button.dataset.email_id}`)
        .then(response=>response.json())
        .then(email=>{

         sender=email.sender
         subject= email.subject
         body=email.body
         document.querySelector('#emails-view').style.display = 'none';
         document.querySelector('#compose-view').style.display = 'none';
         document.querySelector('#email-detail').style.display = 'block';

         document.querySelector('#div1').innerHTML=sender;
         document.querySelector('#div2').innerHTML=subject;
         document.querySelector('#div3').innerHTML=body})
        
        
       }})  })

  
    // console.log(send)
    
  
  // Show the mailbox name
   document.querySelector('#mailbox_name').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}



//submit the mail message

// document.addEventListener('DOMcontentLoaded', function() {

 function sendmail(){
  // document.querySelector('#compose-form').onsubmit=function(){
   
     recipients=document.getElementById('compose-recipients').value;
      subject=document.getElementById('compose-subject').value;
      body=document.getElementById('compose-body').value;
   
      fetch('/emails',
            {method: 'POST',
             body: JSON.stringify({
                  recipients:`${recipients}`,
                  subject:`${subject}`,
                  body:`${body}`
             })})
             .then(response=>response.json())
             .then(data=>{
             
              console.log(data)

             })
             }
            
//  }
      
     
//  return false;
// })


