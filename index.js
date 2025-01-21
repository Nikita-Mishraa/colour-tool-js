const hexInput = document.getElementById('hexInput');
const inputColour = document.getElementById('inputColour');

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
}
