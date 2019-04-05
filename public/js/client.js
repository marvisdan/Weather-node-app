console.log('This is a JS file loaded');
const weatherForm = document.getElementById('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

const fetchWeater = (location) => {
  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            console.log('error', data.error);
            return messageOne.textContent = data.error;
          }
          messageOne.textContent = data.location;
          messageTwo.textContent = data.message;
        });
    })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = ''
  fetchWeater(search.value);
  console.log('Testing');

})