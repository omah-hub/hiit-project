const uri = 'https://travel-pulse-server.onrender.com'
const details = document.querySelectorAll('input, textarea');

const msg = document.querySelector('.message');
// const btn = document.querySelector('.submitbutton')
const btn = document.querySelector('.but')

console.log(btn)

// btn.setAttribute('onclick', () => {console.log('CLicked')})



btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Button clicked")
    msg.innerText = ''

    if (!details[0].value || !details[1].value || !details[2].value || !details[3].value) {
        msg.innerText = 'All fields must be filled'
    }
    else {
        let property = {
            title: details[0].value,
            review: details[1].value,
            location: details[2].value,
            date: details[3].value
        }
        createReview(review)
        // console.log(property)
    }
})
async function createReview(data) {
    try {
        console.log("sending data:", data);
        const response = await fetch(`${uri}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.error) msg.innerText = result.error

        if (response.status === 200) window.location.href = 'destination.html'

        console.log(result);
    } catch (error) {
        msg.innerText = error.error
        console.error(error);
    }
}