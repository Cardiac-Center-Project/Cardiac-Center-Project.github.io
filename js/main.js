const genderButtons = document.querySelectorAll('.portal .body .form .multiple-choice.gender .options .circle');
const gender = document.querySelectorAll('.portal .body .form .multiple-choice.gender .options .option');
const genderInput = document.querySelector('.portal .body .form .multiple-choice.gender .options input');
const membershipButtons = document.querySelectorAll('.portal .body .form .multiple-choice.membership-type .options .circle');
const membershipDescriptions = document.querySelectorAll('.portal .body .form .prompt .membership-descriptions > div');
const membershipInput = document.querySelector('.portal .body .form .multiple-choice.membership-type .options input');
const membership = document.querySelectorAll('.portal .body .form .multiple-choice.membership-type .options .option');
const paymentButtons = document.querySelectorAll('.portal .body .form .multiple-choice.payment .options .circle');
const paymentInput = document.querySelector('.portal .body .form .multiple-choice.payment .options input');
const payment = document.querySelectorAll('.portal .body .form .multiple-choice.payment .options .option');
const sections = document.querySelectorAll('.portal .body .form-section');
const nextButton = document.querySelector('.portal .body .navigation .next.button');
const submitButton = document.querySelector('.portal .body .navigation button.button')
const previousButton = document.querySelector('.portal .body .navigation .previous.button');
const regionList =  document.querySelector('.portal .body .form .region-list:not(:hover)');
const regionListHovered =  document.querySelector('.portal .body .form .region-list');
const regionListItems =  document.querySelectorAll('.portal .body .form .region-list .list-item');
const regionInput = document.querySelector('.portal .body .form .region');
const capitalLetters = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
const smallLetters = capitalLetters.join('').toLowerCase().split('');
const amharicLetters = "ሀሁሂሃሄህሆለሉሊላሌልሎሏሐሑሒሓሔሕሖሗመሙሚማሜምሞሟሠሡሢሣሤሥሦሧረሩሪራሬርሮሯሰሱሲሳሴስሶሷሸሹሺሻሼሽሾሿቀቁቂቃቄቅቆቋበቡቢባቤብቦቧቨቩቪቫቬቭቮቯተቱቲታቴትቶቷቸቹቺቻቼችቾቿኀኁኂኃኄኅኆኋነኑኒናኔንኖኗኘኙኚኛኜኝኞኟአኡኢኣኤእኦከኩኪካኬክኮኳኸኹኺኻኼኽኾዃወዉዊዋዌውዎዐዑዒዓዔዕዖዘዙዚዛዜዝዞዟዠዡዢዣዤዥዦዧየዩዪያዬይዮደዱዲዳዴድዶዷጀጁጂጃጄጅጆጇገጉጊጋጌግጎጓጠጡጢጣጤጥጦጧጨጩጪጫጬጭጮጯጰጱጲጳጴጵጶጷጸጹጺጻጼጽጾጿፀፁፂፃፄፅፆፈፉፊፋፌፍፎፏፐፑፒፓፔፕፖፗ".split('');
let currentSectionIndex = 0;
const membershipKey = {
    0: 'Regular',
    1: 'Bronze',
    2: 'Silver',
    3: 'Gold'
}

function singleSelect(selected, allOptions) {
    for(let i = 0; i < allOptions.length; i++){
        allOptions[i].classList.remove('selected');
    }
    selected.classList.add('selected')
}

function navigateSection(direction, sections, currentSectionIndex, isValid){
    if(isValid){
        sections[currentSectionIndex].classList.add('hidden');
        try {
            sections[currentSectionIndex + direction].classList.remove('hidden');
        } catch (error) {
            '';
        }
        document.getElementById('top').scrollIntoView({behavior: "smooth", alignToTop: true})
        return true;
    }else{
        return false;
    }
}

function validateWords(input) {
    input = input.value.trim().split(' ').join('').split('');
    let valid = input.every((letter) => {
        return (smallLetters.includes(letter) || 
                capitalLetters.includes(letter) || 
                amharicLetters.includes(letter)); 
    })
    return (valid && input.length > 0);
}

function showError(isValid, err){
    if(!isValid){
        console.log('error here');
        err.classList.remove('hidden');
    }
    return isValid
}

function clearErrors(){
    [...document.querySelectorAll('.required-message')].forEach(message => {
        message.classList.add('hidden');
    })
}

function validatePhoneNums(input) {
    return input.value.length == 10 ? true : false;
}

function validateEmail(input) {
    input = input.value;
    let validEmail =    (input.length == 0) ||
                        input.includes('@') && 
                        input.includes('.') && 
                        (input.lastIndexOf('.') > input.indexOf('@')) &&
                        (input.lastIndexOf('.') != (input.length - 1)) &&
                        (input.indexOf('@') == input.lastIndexOf('@'));
    return validEmail;
}

function validateMoney(moneyInput, typeInput){
    let lowerEnd, upperEnd;
    switch (typeInput.value.toLowerCase()) {
        case 'regular':
            lowerEnd = 100;
            upperEnd = 1000;
            break;
        case 'bronze':
            lowerEnd = 1001;
            upperEnd = 10000;
            break;
        case 'silver':
            lowerEnd = 10001;
            upperEnd = 50000;
            break;
        case 'gold':
            lowerEnd = 50001;
            upperEnd = 100000;
            break;
        default:
            lowerEnd = 100;
            upperEnd = 100000;
            break;
    }
    let valid = (moneyInput.value >= lowerEnd) && (moneyInput.value <= upperEnd);
    return valid;
}

function validateSection(number){
    let inputs;
    let msg;
    let result;
    clearErrors();
    inputs = [...sections[number].querySelectorAll('input')];
    msg = [...sections[number].querySelectorAll('.required-message')];
    switch (number) {
        case 0:
            result = true;
            inputs.forEach((input, index) => {
                result = showError(validateWords(input), msg[index]) ? result : false ;
            });
            return result;
        case 1:
            result = true
            result = showError(validateWords(inputs[0]), msg[0]) ? result : false;
            result = showError(validateWords(inputs[1]), msg[1]) ? result : false;
            result = showError(validatePhoneNums(inputs[2]), msg[2]) ? result : false;
            result = showError(validateEmail(inputs[3]), msg[3]) ? result : false;
            return result;
        case 2:
            result = true;
            result = showError(validateWords(inputs[0]), msg[0]) ? result : false;
            result = showError(validateMoney(inputs[1], membershipInput), msg[1]) ? result : false;
            result = showError(validateWords(inputs[2]), msg[2]) ? result : false;
            return result;
        default:
            break;
    }
}

function hide(element){
    element.classList.add('hidden');
}
function show(element){
    element.classList.remove('hidden');
}
function changeDescription(descriptions, newChoice){
    descriptions.forEach(desc => {
        hide(desc);
    })
    show(descriptions[0].parentElement.querySelector(`.${newChoice.toLowerCase()}`))
}
function sendMail(name, profession, sex, region, city, phoneNum, email, membership, amount, schedule) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "Serukyastt@gmail.com",
        Password : "F809C2D8C76F74783633F45B8032021AC630",
        To : 'serukyas.tafesse@gmail.com',
        From : "serukyastt@gmail.com",
        Subject : `New Membership application from ${gender == 'Male' ? "Mr." : "Ms/Mrs."} ${name}`,
        Body : `Name: ${name}.\n
                Profession: ${profession}.\n
                Gender: ${sex}.\n
                Region: ${region}.\n
                City: ${city}.\n
                Phone number: ${phoneNum}.\n
                Email: ${email || 'Not available'}.\n
                Membership Type: ${membership}.\n
                Amount in ETB: ${amount}.\n
                Payment Schedule: ${schedule}`
    }).then(
        message => alert(message)
    )
}

nextButton.addEventListener('click', () => {
    if (navigateSection(1, sections, currentSectionIndex, validateSection(currentSectionIndex))){
        currentSectionIndex = currentSectionIndex + 1;
        if(currentSectionIndex == sections.length - 1){
            hide(previousButton);
            hide(nextButton);
            submitButton.click();
        }else{
            previousButton.classList.remove('hidden');
        }
    }
})
previousButton.addEventListener('click', () => {
    navigateSection(-1, sections, currentSectionIndex, true);
    currentSectionIndex = currentSectionIndex - 1;
    if(currentSectionIndex == 0){
        hide(previousButton);
    }
    if(currentSectionIndex == sections.length - 2){
        show(nextButton);
    }
})


genderButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(gender[index], gender);
        genderInput.value = !index ? 'Male' : 'Female';
    })
})
membershipButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(membership[index], membership);
        let newSelection = membershipKey[index];
        membershipInput.value = newSelection;
        changeDescription(membershipDescriptions, newSelection);
    })
})
paymentButtons.forEach((option, index) => {
    option.addEventListener('click', () => {
        singleSelect(payment[index], payment);
        switch (index) {
            case 0:
                paymentInput.value = 'Monthly'
                break;
            case 1:
                paymentInput.value = 'Trimonthly'
                break;
            case 2:
                paymentInput.value = 'Silver'
                break;
            case 3:
                paymentInput.value = 'Gold'
                break;
            default:
                break;
        }
    })
});
regionInput.addEventListener('focus', () => {
    show(regionList);
})
regionListItems.forEach(item => {
    item.addEventListener('click', () => {
        regionInput.value = item.innerText;
        hide(regionListHovered)
    })
})
submitButton.addEventListener('click', () => {
    let name = document.querySelector('#name').value; 
    let profession = document.querySelector('#profession').value;
    let gender = document.querySelector('#gender').value;
    let region = document.querySelector('#region').value;
    let city = document.querySelector('#city').value;
    let phoneNum = document.querySelector('#number').value;
    let email = document.querySelector('#email').value || null;
    let membership = document.querySelector('#membership').value;
    let amount = document.querySelector('#amount').value;
    let schedule = document.querySelector('#payment').value;
    sendMail(name, profession, gender, region, city, phoneNum, email, membership, amount, schedule);
    
})

