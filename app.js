console.log('App is connected');

// Protagonist of our application
const barbie = {
    name: 'Barbie',
    wardrobe: [],
    wallet: 0,
    rental: [],
    garage: []
}

class Career {
    constructor(name, description, income, id){
        this.name = name;
        this.description = description;
        this.income = income;
        this.id = id;
    }
}

const careerDescriptions = [
    {
        name: 'lawyer',
        description: 'works as an attorney of a high end law firm'
    },
    {
        name: 'software-engineer',
        description: 'solves software related problems and build application architecture.'
    },
    {
        name: 'doctor',
        description: 'helps people with their boo boos'
    },
    {
        name: 'influencer',
        description: 'talk about stuff on social media and people say wow and i get paid'
    }
]
const careerIncomes = [
 8501,
 18501,
 2850,
 3850,
 4850,
 5850,
 6850
];
const careers = [];


const randomization = (limit) => {
 return Math.floor(Math.random() * limit)
}


for (let i = 0; i < careerDescriptions.length ; i++){
 const job = careerDescriptions[i]
 const income = careerIncomes[randomization(careerIncomes.length)];
 careers.push(new Career(job.name, job.description, income, `${job.name}-${income}` ))
}

barbie.career = careers[randomization(careers.length)]
  

class Clothing {
    constructor(name, designer, color, type, size, price){
        this.name = name;
        this.designer = designer;
        this.color = color;
        this.type = type;
        this.size = size;
        this.price = price;
    }
}

const birkin = new Clothing('Birkin Bag', 'Hermes', 'purple', 'bag', 'lg', 15470 )
const redBottoms = new Clothing('Red Bottoms', 'Christian Loboutin', 'black', 'shoes', '6', 3000)

// Game Screen

barbie.el = document.getElementById('barbie');

// I need to somehow push object out of wardrobe... I have no idea how to do this.. maybe use splice

function assignId() {
    for (let item of barbie.wardrobe)
    item.id = barbie.wardrobe.indexOf(item)
}

function sellClothes(event) {
    // There must be an easier way to do this!
    event.parentNode.remove()
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = barbie.wardrobe[targetIndex].price
    barbie.wallet += moneyGained
    barbie.wardrobe.splice(targetIndex, 1)
    console.log(moneyGained)
    barbie.render()
}





barbie.render = () => {
    assignId()
    barbie.el.innerHTML = `
    <h1>${barbie.name} Status</h1>
    <h3>${barbie.name} works as a ${barbie.career.name} </h3>
    <h3> Each week ${barbie.name} takes home $${barbie.career.income}</h3>
    <h3> Currently ${barbie.name} has $${barbie.wallet} in their bank account</h3>
    <div> <h2>Wardrobe Contains: </h2> 
    <ul>${
        barbie.wardrobe.map((item => {
            return `<li>
            ${barbie.name} has a ${item.color} 
            ${item.name} made by ${item.designer}
            that is worth ${item.price} in size 
            ${item.size} <button class="sell-button ${item.id}" onclick="sellClothes(this)">Sell</button>
            </li>`
        })).join('')
    }</ul>
    </div>
    <div><h2>Rental Contains: </h2>
    <ul>${
        barbie.rental.map((item => {
            return `<li>
            ${barbie.name} has bought a ${item.type} 
            ${item.name} locateed in ${item.location}
            that costs ${item.price} and adds ${item.income} to ${barbie.name}'s income  
            </li>`
        })).join('')
        
    }</ul>
    </div>
    <div><h2>Garage Contains: </h2>
    <ul>${
        barbie.garage.map((item => {
            return `<li>
            ${barbie.name} has bought a ${item.color} ${item.type} 
            ${item.name} 
            that costs ${item.price} and deducts ${item.income} from ${barbie.name}'s income  
            </li>`
        })).join('')
    }</ul>
    </div>
`;
}

barbie.render()

const dropdown = document.createElement('div')
document.body.appendChild(dropdown)
dropdown.classList.add('dropdown')

dropdown.innerHTML = `<label for="careers">Choose a career:</label>
<select name="careers" id="careerSelect">
  <option value="default">Pick One!</option>
  <option value="lawyer" id="lawyerChoice">Lawyer</option>
  <option value="software-engineer" id="softwareChoice">Software Engineer</option>
  <option value="doctor" id="doctorChoice">Doctor</option>
  <option value="influencer" id="influencerChoice">Influencer</option>
</select>`

document.getElementById("careerSelect").addEventListener("change", (e)=>{
  let newCareer = careers.find((career) => career.name === `${e.target.value}`)
  barbie.career = newCareer
  barbie.render()
  })

const birkinButton = document.getElementById('birkin');

birkinButton.addEventListener('click', ()=>{
    if(barbie.wallet >= birkin.price){
        let cloneBirkin = Object.assign({}, birkin)
        barbie.wardrobe.push(cloneBirkin);
        barbie.wallet -= birkin.price;
        barbie.render();
        // WE updated the wardrobe that belongs to barbie so the object was changed
    // the object control the information that is visible to us on the screen
    // I want to re-render the content so that i can see the updated information in the browser
    } else {
        alert('Stop trippin you know you aint got it like that');
    }

})

const workButton = document.getElementById('work');

workButton.addEventListener('click', ()=>{
    barbie.wallet += barbie.career.income; // WE updated the wllet that belongs to barbie so the object was changed
    // the object control the information that is visible to us on the screen
    // I want to re-render the content so that i can see the updated information in the browser
    barbie.render();
})

const rbButton = document.getElementById('red-bottoms')

rbButton.addEventListener('click', () => {
    if(barbie.wallet >= redBottoms.price){
        let cloneRedBottoms = Object.assign({}, redBottoms)
        barbie.wardrobe.push(cloneRedBottoms);
        barbie.wallet -= redBottoms.price;
        barbie.render();
        // WE updated the wardrobe that belongs to barbie so the object was changed
    // the object control the information that is visible to us on the screen
    // I want to re-render the content so that i can see the updated information in the browser
    } else {
        alert('Stop trippin you know you aint got it like that');
    }
})

class RentalProperty {
    constructor(name, type, price, location, income) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.location = location;
        this.income = income;
    }
}

const condo = new RentalProperty('Condo', 'Rental', 50000, 'Miami', 500)

const condoBtn = document.getElementById('condo')

condoBtn.addEventListener('click', () => {
    if(barbie.wallet >= condo.price){
        barbie.rental.push(condo);
        barbie.wallet -= condo.price;
        barbie.career.income += condo.income
        barbie.render();
        // WE updated the wardrobe that belongs to barbie so the object was changed
    // the object control the information that is visible to us on the screen
    // I want to re-render the content so that i can see the updated information in the browser
    } else {
        alert('Stop trippin you know you aint got it like that');
    }
})

const sellBtn = document.getElementById('sell')



sellBtn.addEventListener('click', () => {
    if(barbie.wardrobe.length > 0) {
    const randomIndex = randomization(barbie.wardrobe.length)
    const itemToSell = barbie.wardrobe[randomIndex]
    barbie.wardrobe.splice(randomIndex, 1)
    const sellingPrice = (Math.floor(Math.random()* ((200 - 70) + 1) + 70)) * 0.01
    barbie.wallet += Math.floor(sellingPrice * itemToSell.price)
    barbie.render();

    } else {
        alert('You have NOTHING to sell bro')
    }
})

class Car {
    constructor(name, type, price, color, income){
        this.name = name
        this.type = type
        this.price = price
        this.color = color
        this.income = income
    }
}

const tesla = new Car('Tesla', 'Electric', 50000, 'red', -150)

const teslaBtn = document.getElementById('tesla')

teslaBtn.addEventListener('click', () => {
    if(barbie.wallet >= tesla.price) {
        barbie.garage.push(tesla);
        barbie.wallet -= tesla.price;
        barbie.career.income += tesla.income
        barbie.render()
    } else {
        alert('Stop trippin you know you aint got it like that')
    }
})