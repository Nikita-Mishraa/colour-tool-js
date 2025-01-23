const hexInput = document.getElementById('hexInput');
const inputColour = document.getElementById('inputColour');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const alteredColour = document.getElementById('alteredColour');
const alteredColourText = document.getElementById('alteredColourText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', ()=>{
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else{
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
})



hexInput.addEventListener('keyup', () =>{
    const hex = hexInput.value;
    if(! isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');

    inputColour.style.background = "#" + strippedHex;
})


const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) =>{
    if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#','');
  
  if(strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
    + strippedHex[1] + strippedHex[1]
    + strippedHex[2] + strippedHex[2];
  }

  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b}
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

const alterColour = (hex, percentage) => {
  const {r,g,b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage/100) * 255);
  
  const newR = increaseRange(r, amount);
  const newG = increaseRange(g, amount);
  const newB = increaseRange(b, amount);
  return convertRGBToHex(newR, newG, newB);
}

const increaseRange = (hex, amount)=>{
  return Math.min(255, Math.max(0, hex + amount));
}

slider.addEventListener('input', ()=>{
  if(!isValidHex(hexInput.value)) return;
  sliderText.textContent = `${slider.value}%`
  const alteredHex = alterColour(hexInput.value, slider.value);
  alteredColour.style.backgroundColor = alteredHex;
  alteredColourText.innerText = `Altered Colour ${alteredHex}`;
})

