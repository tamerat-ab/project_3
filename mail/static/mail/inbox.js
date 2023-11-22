document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  
 
  document.querySelector('#archive').addEventListener('click', archive);
  // By default, load the inbox
load_mailbox('inbox');
 
});


function load_mailbox(mailbox) {
  
  var inbox_view=document.querySelector('#inbox-view')
  var send_view=document.querySelector('#send-view')
  var archive_view=document.querySelector('#archive-view')

  if (mailbox=='inbox') {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  send_view.style.display = 'none';
  inbox_view.style.display='block'
  archive_view.style.display = 'none';
  document.querySelector('#email-detail').style.display = 'none';}

  else if(mailbox=='sent'){
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    inbox_view.style.display = 'none';
    archive_view.style.display = 'none'
    send_view.style.display='block'
    document.querySelector('#email-detail').style.display = 'none';
  }
  else{
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    inbox_view.style.display = 'none';
    archive_view.style.display = 'block'
    send_view.style.display='none'
    document.querySelector('#email-detail').style.display = 'none';
  }

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    for (let i=0; i < data.length; i++) {
     
      let send=data[i]['sender']
      let id=data[i]['id']
      let time=data[i]['timestamp']
      let subject=data[i]['subject']
      let body=data[i]['body']
      
      // create email div for every single email 
      const email_div=document.createElement('div')
      email_div.setAttribute('data-email_id' ,`${id}`)
      email_div.setAttribute('class', 'email-div')

      if (data[i]['read']==true){
      email_div.setAttribute('id', 'email-grey') 
      }
      else{
        email_div.setAttribute('id','email-white')
      }
      const sender_div=document.createElement('div')
      sender_div.setAttribute('id','sender-div')
      sender_div.append(document.createTextNode(send))

      const subject_div=document.createElement('div')
      subject_div.setAttribute('id','subject-div')
      subject_div.append(document.createTextNode(subject))

      const time_div=document.createElement('div')
      time_div.setAttribute('id','time-div')
      time_div.append(document.createTextNode(time))

      // const inbox_view=document.querySelector('#inbox-view')
      // const send_view=document.querySelector('#send-view')
      // const archive_view=document.querySelector('#archive-view')
    
      email_div.append(sender_div,subject_div,time_div)  
      email_div.onclick=function(){email_div.innerHTML=''} //prevent redendency 
 
   
//  checks if mailbox is either inbox, sent or archive
     if(mailbox=='inbox'){
     
       inbox_view.append(email_div)
      console.log(inbox_view)
      document.querySelector('#inbox').onclick=()=>{inbox_view.innerHTML=''} //prevetnt redendency
     }
     else if(mailbox=='sent'){
         send_view.append(email_div)
        document.querySelector('#sent').onclick=()=>{send_view.innerHTML='' } //prevent redendency
     }
     else{archive_view.append(email_div)
     document.querySelector('#archived').onclick=()=>{archive_view.innerHTML=''}} //prevent redendency
      };

      // end of boxs
    
      console.log(document.querySelectorAll('.email-div'))
      document.querySelectorAll('.email-div').forEach(function(button){button.onclick=function(){
                fetch(`/emails/${button.dataset.email_id}`)
                .then(response=>response.json())
                .then(email=>{ console.log(email)
           
                 send=email.sender
                 console.log(send)
                 recipient=email.recipients
                 subject= email.subject
                 timestamp=email.timestamp
                 body=email.body
                 if(mailbox=='sent'){
                 document.querySelector('#archive').style.display='none'
                 document.querySelector('#unarchive').style.display='none'
                 }
                 else if(mailbox=='inbox'){
                  document.querySelector('#archive').style.display='block'
                  document.querySelector('#unarchive').style.display='none'
                 }
                 else if(mailbox=='archive') {
                  document.querySelector('#archive').style.display='none'
                  document.querySelector('#unarchive').style.display='block'
                 }
                 document.querySelector('#emails-view').style.display = 'none';
                //  document.querySelector('#compose-view').style.display = 'none';
                 document.querySelector('#email-detail').style.display = 'block';
                 console.log(send)
                 document.querySelector('#sender-sender').innerHTML=`From: ${send}`;
                 document.querySelector('#recipient-recipient').innerHTML=`To: ${recipient}`;
                 document.querySelector('#subject-subject').innerHTML=`Subject: ${subject}`;
                 document.querySelector('#timestamp-timestamp').innerHTML=`Timestamp: ${timestamp}`;
                 document.querySelector('#body-body').innerHTML=body})
               

                 fetch(`/emails/${button.dataset.email_id}`,
                         {method: 'PUT',
                          body:JSON.stringify({read:true})}
                          );

                 
              document.querySelector('#archive').onclick = function() {    
              fetch(`emails/${button.dataset.email_id}`,
                      {method: 'PUT',
                      body: JSON.stringify({
                        archived: true}
                        )})
                        .then(response => response)
                        .then(response =>{ alert('archived');
                        })}
              document.querySelector('#unarchive').onclick = function() {    
              fetch(`emails/${button.dataset.email_id}`,
                      {method: 'PUT',
                      body: JSON.stringify({
                        archived: false}
                        )})
                        .then(response => response)
                        .then(response =>{ alert('unarchived');
                        })}


}})
                // DON'T FORGET THE COLOR OF THE BLOCK
               



    })}
      


document.addEventListener('DOMContentLoaded', function(e) {
  document.querySelector('#replay').onclick = function() {


          document.querySelector('#emails-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'block';
          // document.querySelector('#ls').style.display = 'block';
          document.querySelector('#email-detail').style.display = 'none';
     
    
          document.querySelector('#compose-recipients').value = sender;
          if (subject){
          document.querySelector('#compose-subject').value =`Re${subject}`};
          document.querySelector('#compose-body').innerHTML =body }

});

document.addEventListener('DOMContentLoaded',() => {

  document.querySelector('#compose').onclick = function() {

    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#emails-view').style.display = 'none';
    
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#send-view').style.display = 'none';
    document.querySelector('#archive-view').style.display = 'none';


          document.querySelector('#compose-form').onsubmit=function(e){
          recipients=document.getElementById('compose-recipients').value;
          subject=document.getElementById('compose-subject').value;
          body=document.getElementById('compose-body').value;
          e.stopPropagation();
          e.preventDefault();
          console.log(recipients,subject,body);
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
            
          }

            })

