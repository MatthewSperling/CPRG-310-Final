const pics = [
    {
        src: '.assets/gallery/talking.jpg',
        title: 'Guests at International Womans day event 2024',
        date: 'March 8, 2024',
        details: 'Two people talking at Interantional womans day 2024'
    },
    {
        src: '.assets/gallery/talking2.jpg',
        title: 'Guests watching at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Two people at Interantional womans day 2024'
    },
    {
        src: '.assets/gallery/splits2.jpg',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: '.assets/gallery/splits.jpg',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: '.assets/gallery/splits2.jpg',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
    },
    {
        src: '.assets/gallery/speaker2.jpg',
        title: 'Contortionist Dancer at International Womans day 2024',
        date: 'March 8, 2024',
        details: 'Contortionist Dancer at Interantional womans day 2024'
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