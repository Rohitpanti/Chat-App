const socket = io('http://localhost:8000');

//Get Dom elements in respective Js  Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");

//Audio that will play  on receiving messages
var audio= new Audio('ting.mp3');

//Functions which will append eventinfo to the conatiner
const append=(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}

//If the form gets submitted,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

//Ask new Users for their name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//If a new user joins , Receive the event from server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

//If server sends a message receive it
socket.on('recieve',data =>{
    append(`${data.name}:${data.message}`,'left')
})

//If a user left the chat ,appends the info to the container
socket.on('left',name =>{
    append(`${name} left the chat`,'right')
})

