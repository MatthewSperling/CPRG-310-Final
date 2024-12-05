const pics = [
    {
        src: './assets/gallery/talking.jpg',
        title: 'Guests at WINS International Womans day event 2024',
        date: 'March 8, 2024',
        details: 'Two people talking and laughing'
    },
    {
        src: './assets/gallery/talking2.jpg',
        title: 'Guests watching at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Two people at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/splits2.jpg',
        title: 'Contortionist Dancer at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/splits.jpg',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024' 
    },
    {
        src: './assets/gallery/speaker.jpg',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/speaker2.jpg',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: './assets/gallery/podium.jpg',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Speaker at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/podium2.jpg',
        title: 'Speaker at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Speaker at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/mayor.jpg',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/mayor2.jpg',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/mayor3.jpg',
        title: 'Calgary Mayor Jyoti Gondek at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Calgary Mayor Jyoti Gondek'
    },
    {
        src: './assets/gallery/interview.jpg',
        title: 'Wins CEO Karin Ramchuck at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Wins CEO Karin Ramchuck'
    },
    {
        src: './assets/gallery/elder2.jpg',
        title: 'Elder at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Elder at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/dance.jpg',
        title: 'Dancers at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Dancers at WINS International Womans day 2024'
    },
    {
        src: './assets/gallery/dance2.jpg',
        title: 'Dancers at WINS International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Dancers at WINS International Womans day 2024'
    },
];
 
let gallery = document.getElementById('gallery-section');
let load = function (template) {
    for (let pic of pics) {
        let temp = document.createElement('div');
 
        temp.innerHTML = template;
 
        //Get Picture info
        let img = temp.querySelectorAll('img')[0];
        let hoverText = temp.querySelectorAll('.hover-text')[0];
 
        //Set Picture info
        img.src = pic.src;
        hoverText.textContent = pic.title;
 
        //Add click event
        let cardElement = temp.querySelector('.gallery-card');
        cardElement.addEventListener('click', () => {
            openModal(pic);
 
        });
 
        gallery.appendChild(cardElement)
    }
}
 
// Load Gallery Template
function loadTemplate(templatePath) {
    fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            load(data);
        })
        .catch(error => console.error('Error fetching template:', error));
}
loadTemplate('./templates/gallery-card.html');
 
 
 
//Modal section
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let openModal = function (picData) {
 
    let title = document.querySelector(".modal-content h3");
    let date = document.querySelector(".modal-content h4");
    let details = document.querySelector(".modal-content span");
    let img = document.querySelector(".modal-content img");
 
    title.innerText = picData.title;
    date.innerText = picData.date;
    details.innerText = picData.details;
    img.src = picData.src;
 
    modal.style.display = "flex";
}
 
// Close MOdal
let closeModal = function () {
    modal.style.display = "none";
}
span.addEventListener('click', closeModal);
 
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}