
const form = document.querySelector('form')
const search = document.querySelector('input')
const paraOne = document.querySelector('#paraOne')
const paraTwo = document.querySelector('#paraTwo')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                paraOne.textContent = data.error
            }else {
                paraOne.textContent = `${data.data.temperature} Celsius. ${data.data.forecast}`
                paraTwo.textContent = `Wind speed is ${data.data.wind} kmph`
            }
        //    console.log(data.location.name)
        //    console.log(data.current.weather_descriptions[0])
        })
    })
})