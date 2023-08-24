document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', sendmail);
  document.querySelector('#archive').addEventListener('click', archive);

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
      
        
        
         const butt=document.createElement('button');
         butt.setAttribute('data-email_id', `${id}`);
         butt.setAttribute('id', 'button');
         const div=document.createElement('div');
         div.setAttribute("id", 'email_lines');
        
         butt.appendChild(document.createTextNode(send));
         butt.appendChild(document.createTextNode(subject));
         butt.appendChild(document.createTextNode(time))
        div.appendChild(butt);
        
        document.querySelector('#emails-view').appendChild (butt)
       
      };
   
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
        
        fetch(`/emails/${button.dataset.email_id}`,
        {method: 'PUT',
         body:JSON.stringify({read:true})}
         )
        // DON'T FORGET THE COLOR OF THE BLOCK
        document.querySelector('#button').style.background='grey'
     

    document.querySelector('#archive').onclick = function() {    
    fetch(`/emails/${button.dataset.email_id}`,
   {method: 'PUT',
   body: JSON.stringify({
    archived: true}
    )})
    .then(response => response)
    .then(response =>{ alert('archived'); console.log(response)
    })}
        

       }})  })
   
    
       
    document.querySelector('#replay').onclick = function() {


      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'block';
      // document.querySelector('#ls').style.display = 'block';
      document.querySelector('#email-detail').style.display = 'none';


      document.querySelector('#compose-recipients').value = sender;
      if (subject){
      document.querySelector('#compose-subject').value =`Re${subject}`};
      document.querySelector('#compose-body').innerHTML =body }
   
    
  
  // Show the mailbox name
   document.querySelector('#mailbox_name').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

// document.querySelectorAll('#button').forEach(function(button){button.onclick=function(){
//   fetch(`/emails/${button.dataset.email_id}`)
// function archive(email_id) {

//   fetch(`/emails/${email_id}`,
//    {method: 'PUT',
//    body: JSON.stringify({
//     archived: true}
//     )})
//     .then(response => response.json())
//     .then(response =>{ alert(response)} )
//   }



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


