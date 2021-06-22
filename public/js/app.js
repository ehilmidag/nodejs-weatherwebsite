


console.log('its a webconsole app.js')
fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const searchinForm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =searchinForm.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent=''
    
    fetch('/weather?adress='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent='Cannot Find Location weather report'
           
        }
        else
        messageOne.textContent =data.location
        messageTwo.textContent=data.forecastpre
        console.log(data.location)
        console.log(data.forecastpre)
    })
})
    
})