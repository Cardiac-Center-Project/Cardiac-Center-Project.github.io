const genderButtons = document.querySelectorAll('.portal .body .form .multiple-choice.gender .options .circle');
const gender = document.querySelectorAll('.portal .body .form .multiple-choice.gender .options .option');
const membershipButtons = document.querySelectorAll('.portal .body .form .multiple-choice.membership-type .options .circle');
const membership = document.querySelectorAll('.portal .body .form .multiple-choice.membership-type .options .option');
const paymentButtons = document.querySelectorAll('.portal .body .form .multiple-choice.payment .options .circle');
const payment = document.querySelectorAll('.portal .body .form .multiple-choice.payment .options .option');
const sections = document.querySelectorAll('.portal .body .form-section');
const nextButton = document.querySelector('.portal .body .navigation .next.button');
const previousButton = document.querySelector('.portal .body .navigation .previous.button');
let currentSectionIndex = 0;


function singleSelect(selected, allOptions) {
    for(let i = 0; i < allOptions.length; i++){
        allOptions[i].classList.remove('selected');
    }
    selected.classList.add('selected')
}

function navigateSection(direction, sections, currentSectionIndex){
    sections[currentSectionIndex].classList.add('hidden');
    sections[currentSectionIndex + direction].classList.remove('hidden');
    document.getElementById('top').scrollIntoView({behavior: "smooth", alignToTop: true})
}

nextButton.addEventListener('click', () => {
    navigateSection(1, sections, currentSectionIndex);
    currentSectionIndex = currentSectionIndex + 1;
    if(currentSectionIndex == sections.length - 1){
        nextButton.classList.add('hidden')
    }
    previousButton.classList.remove('hidden')
})
previousButton.addEventListener('click', () => {
    navigateSection(-1, sections, currentSectionIndex);
    currentSectionIndex = currentSectionIndex - 1;
    if(currentSectionIndex == 0){
        previousButton.classList.add('hidden')
    }
    if(currentSectionIndex == sections.length - 2){
        nextButton.classList.remove('hidden')
    }
})


genderButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(gender[index], gender);
    })
})
membershipButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(membership[index], membership);
    })
})
paymentButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(payment[index], payment);
    })
})
