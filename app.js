console.log('App is connected');

// Note: for some reason the container at the top is getting cut off as I add more things.  
// I'm not sure why a vertical scroll bar isn't visible even after messing with the overflow-y of the div.

// Couldn't figure out drag and drop... not sure how to assign unique IDs to li elements that are generated by purchasing items for the wardrobe
// It seems to me you need the IDs to be able to target the elements in order to do the sell/buy functions properly

// Protagonist of our application
const barbie = {
    name: 'Barbie',
    wardrobe: [],
    wallet: 0,
    rental: [],
    garage: [],
    assets: []
}

const ken = {
    name: 'Ken',
    wardrobe: [],
    wallet: 100000
}

const garage = {
    name: 'Garage,',
    sharedWardrobe: [],
    sharedWardrobeFlat: []
}

class Career {
    constructor(name, description, outfit, income, id){
        this.name = name;
        this.description = description;
        this.outfit = outfit;
        this.income = income;
        this.id = id;
    }
}

const careerDescriptions = [
    {
        name: 'lawyer',
        description: 'works as an attorney of a high end law firm',
        outfit: 'snazzy red suit'
    },
    {
        name: 'software-engineer',
        description: 'solves software related problems and build application architecture.',
        outfit: 'hoodie and pajama pants'
    },
    {
        name: 'doctor',
        description: 'helps people with their boo boos',
        outfit: 'lab coat complete with stethoscope'
    },
    {
        name: 'influencer',
        description: 'talk about stuff on social media and people say wow and i get paid',
        outfit: 'fashionable blouse with high-waisted jeans'
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
  careers.push(new Career(job.name, job.description, job.outfit, income, `${job.name}-${income}` ))
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

// I'd like to figure out a way to select all objects with the class Clothing and push them into an array

const birkin = new Clothing('Birkin Bag', 'Hermes', 'purple', 'bag', 'lg', 15470 )
const redBottoms = new Clothing('Red Bottoms', 'Christian Loboutin', 'black', 'shoes', '6', 3000)

// Game Screen

barbie.el = document.getElementById('barbie');

function assignId() {
    for (let item of barbie.wardrobe) {
      item.id = barbie.wardrobe.indexOf(item)
    }
    for (let item of barbie.assets) {
      item.id = barbie.assets.indexOf(item)
    }
    for (let item of ken.wardrobe) {
      item.id = ken.wardrobe.indexOf(item)
    }
    for (let item of garage.sharedWardrobeFlat) {
      item.id = garage.sharedWardrobeFlat.indexOf(item)
    }
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

function kenSellClothes(event) {
    event.parentNode.remove()
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = ken.wardrobe[targetIndex].price
    ken.wallet += moneyGained
    ken.wardrobe.splice(targetIndex, 1)
    console.log(moneyGained)
    barbie.render()
}

class Asset {
    constructor(name, purpose, price) {
        this.name = name
        this.purpose = purpose
        this.price = price
    }
}

function sellAsset(event) {
    event.parentNode.remove()
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = barbie.assets[targetIndex].price
    barbie.wallet += moneyGained
    barbie.assets.splice(targetIndex, 1)
    console.log(moneyGained)
    barbie.render()
}

function tradeToBarbie(event) {
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = ken.wardrobe[targetIndex].price
    if (barbie.wallet >= moneyGained) {
      event.parentNode.remove()
      ken.wallet += moneyGained
      barbie.wardrobe.push(ken.wardrobe[targetIndex])
      barbie.wallet -= moneyGained
      ken.wardrobe.splice(targetIndex, 1)
      console.log(moneyGained)
      barbie.render()
    } else {alert(`Don't bite off more than you can chew!`)}
}

function tradeToKen(event) {
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = barbie.wardrobe[targetIndex].price
    if (ken.wallet >= moneyGained) {
      event.parentNode.remove()
      barbie.wallet += moneyGained
      ken.wardrobe.push(barbie.wardrobe[targetIndex])
      ken.wallet -= moneyGained
      barbie.wardrobe.splice(targetIndex, 1)
      console.log(moneyGained)
      barbie.render()
    } else {alert(`Cut it out Ken`)}
}

const iphone = new Asset('iPhone 26', 'can be used to read minds and order coffee simultaneously', 2000)
const discoBall = new Asset('Disco Ball', 'can liven up any party', 15)

barbie.assets.push(iphone)
barbie.assets.push(discoBall)

// function allowDrop(event) {
//     event.preventDefault()
// }

// function drag(event) {
//     event.dataTransfer.setData('text', event.target.id)
// }

// function storeDrop(event) {
//     event.preventDefault()
//     const data = event.dataTransfer.getData('text')
//     console.log(data)
// }

// function drag(event) {
//     event.dataTransfer.setData('text', event.target.id)
// }

// function consumerDrop(event) {
//     event.preventDefault()
//     const data = event.dataTransfer.getData('text')
//     drag.dropEffect = 'copy'
// }

barbie.render = () => {
    assignId()
    barbie.el.innerHTML = `
    <h1>${barbie.name} Status</h1>
    <h3>${barbie.name} works as a ${barbie.career.name} </h3>
    <h3>${barbie.name} wears a ${barbie.career.outfit}</h3>
    <h3> Each week ${barbie.name} takes home $${barbie.career.income}</h3>
    <h3> Currently ${barbie.name} has $${barbie.wallet} in their bank account</h3>
    <h2> Store Items for Sale! </h2>
    <ul id='barbieClothes'>${
        `<li'>
          ${birkin.name} for $${birkin.price}
        </li>
        <li>
          ${redBottoms.name} for $${redBottoms.price}
        </li>`
    }</ul>
    <div> <h2>Wardrobe Contains: </h2> 
    <ul>${
        barbie.wardrobe.map((item => {
          return `<li class='barbie-clothes'>
            ${barbie.name} has a ${item.color} 
            ${item.name} made by ${item.designer}
            that is worth ${item.price} in size 
            ${item.size} <button class="sell-button ${item.id}" onclick="sellClothes(this)">Sell</button>
            <button class="trade-button ${item.id}" onclick="tradeToKen(this)">Trade</button>
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
    <div><h2>Current Assets: </h2>
    <ul>${
        barbie.assets.map((item => {
          return `<li>
            ${barbie.name} owns one ${item.name} worth $${item.price} that ${item.purpose} <button class='sell-asset ${item.id}' onclick="sellAsset(this)">Sell</button>
          </li>`
        })).join('')
    }</ul>
    </div>
    <div class='ken-status'>
    <h1>${ken.name} Status</h1>
    <h3> Currently ${ken.name} has $${ken.wallet} in their bank account</h3>
    <div> <h2>Ken's Wardrobe Contains: </h2> 
    <ul>${
        ken.wardrobe.map((item => {
          return `<li>
            ${ken.name} has a ${item.color} 
            ${item.name} made by ${item.designer}
            that is worth ${item.price} in size 
            ${item.size} <button class="sell-button ${item.id}" onclick="kenSellClothes(this)">Sell</button>
            <button class="trade-button ${item.id}" onclick="tradeToBarbie(this)">Trade</button>
          </li>`
        })).join('')
    }</ul>
    </div>
    </div>
`}

barbie.render()

document.querySelector('.button-container').innerHTML = `
<div class="button-container">
<h2>Barbie's Options</h2>
<button id="birkin">Buy Birkin</button>
<button id="work">Get Paid</button>
<button id="red-bottoms">Buy Red Bottoms</button>
<button id="condo">Buy Condo</button>
<button id="sell">Sell</button>
<button id="tesla">Buy Tesla</button>
</div>`

const dropdown = document.createElement('div')
document.querySelector('.button-container').appendChild(dropdown)
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
   
    } else {
        alert('Stop trippin you know you aint got it like that');
    }

})

const workButton = document.getElementById('work');

workButton.addEventListener('click', ()=>{
    barbie.wallet += barbie.career.income 
    barbie.render()
})

const rbButton = document.getElementById('red-bottoms')

rbButton.addEventListener('click', () => {
    if(barbie.wallet >= redBottoms.price){
        let cloneRedBottoms = Object.assign({}, redBottoms)
        barbie.wardrobe.push(cloneRedBottoms);
        barbie.wallet -= redBottoms.price;
        barbie.render();
      
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

const kenButtons = document.createElement("div")
document.body.appendChild(kenButtons)

kenButtons.innerHTML = `
<h2>Ken's Options</h2>
<button class='ken-button' id='ken-birkin'>Buy Birkin</button>
<button class='ken-button' id='ken-redBottoms'>Buy Red Bottoms</button>
`
const kenBirkinBtn = document.getElementById('ken-birkin')
const kenRedBottomsBtn = document.getElementById('ken-redBottoms')

kenBirkinBtn.addEventListener('click', ()=>{
    if(ken.wallet >= birkin.price){
        let cloneBirkin = Object.assign({}, birkin)
        ken.wardrobe.push(cloneBirkin)
        ken.wallet -= birkin.price
        barbie.render()
    }    
})

kenRedBottomsBtn.addEventListener('click', ()=>{
    if(ken.wallet >= redBottoms.price){
        let cloneRedBottoms = Object.assign({}, redBottoms)
        ken.wardrobe.push(cloneRedBottoms)
        ken.wallet -= redBottoms.price
        barbie.render()
    }
})

const garageSale = document.createElement("div")
document.body.appendChild(garageSale)

garageSale.innerHTML = `
<h2>Garage Sale</h2>
<button class='garage-button'>Pool Items</button>
<h3>Items for Sale</h3>
<ul id='shared-wardrobe'></ul>`

function sellSharedItem(event) {
    event.parentNode.remove()
    let classSplit = event.className.split(" ")
    let classNumber = classSplit[1]
    let targetIndex = parseInt(classNumber, 10)
    let moneyGained = garage.sharedWardrobeFlat[targetIndex].price
    barbie.wallet += moneyGained/2
    ken.wallet += moneyGained/2
    garage.sharedWardrobeFlat.splice(targetIndex, 1)
    console.log(moneyGained)
    barbie.render()
    garage.render()
}

garage.render = () => {
  assignId()
  document.getElementById('shared-wardrobe').innerHTML = `
  ${
    garage.sharedWardrobeFlat.map((item => {
        return `<li>
          ${item.name}
          <button class='garage-sell-button ${item.id}' onclick='sellSharedItem(this)'>Sell</button>
        </li>`
    })).join('')
   }`
}

garage.render()

const garageBtn = document.querySelector('.garage-button')

garageBtn.addEventListener('click', ()=>{
    if (barbie.wardrobe.length > 0 || ken.wardrobe.length > 0) {
      if (barbie.wardrobe.length > 0) {garage.sharedWardrobe.push(barbie.wardrobe)}
      if(ken.wardrobe.length > 0) {garage.sharedWardrobe.push(ken.wardrobe)}
      const newItems = garage.sharedWardrobe.flat(Infinity)
      console.log(newItems)
      for (let item of newItems) {
        garage.sharedWardrobeFlat.push(item)
      }
      barbie.wardrobe.splice(0, barbie.wardrobe.length)
      ken.wardrobe.splice(0, ken.wardrobe.length)
      garage.sharedWardrobe.splice(0, garage.sharedWardrobe.length)
      barbie.render()
      garage.render()
      console.log(garage.sharedWardrobe)
      console.log(garage.sharedWardrobeFlat)
      console.log(barbie.wardrobe)
      console.log(ken.wardrobe)
    } else {alert('Nothing to put on sale')}
})