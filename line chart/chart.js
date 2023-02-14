const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "800");
svg.setAttribute("height", "800");
svg.setAttribute("viewBox", `0 0 900 800`);
document.getElementById("root").appendChild(svg);

const data1 = [
  20, 15, 32, 22, 55, 20, 70, 80, 10, 25, 40, 45, 70, 60, 55, 55, 40, 40,
];

const data2 = [
  10, 10, 30, 20, 50, 14, 60, 70, 0, 15, 35, 40, 66, 75, 50, 55, 10, 30,
];

highestvalue = Math.max.apply(Math, data1);

function drawpath(data, color) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const d = data
    .map((value, index) => {
      const x = index * 50 + 10;
      const y = 800 - value * 5;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", "2");
  svg.appendChild(path);
}


function drawaxis(){ 
//x axis labels
for (let i = 0; i < data1.length; i++) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", i * 50 + 10);
  label.setAttribute("y", 820);
  label.setAttribute("text-anchor", "middle");
  label.textContent = ` ${i * 50}`;
  svg.appendChild(label);
}
//y axis labels
for (let i = 0; i <= highestvalue / 10; i++) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", 10);
  label.setAttribute("y", 800 - i * 50);
  label.setAttribute("text-anchor", "middle");
  label.textContent = ` ${i * 10}`;

  const hline = document.createElementNS("http://www.w3.org/2000/svg", "line");
  hline.setAttribute("x1", 10);
  hline.setAttribute("y1", 800 - i * 50);
  hline.setAttribute("x2", data1.length * 50);
  hline.setAttribute("y2", 800 - i * 50);
  hline.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1");

  svg.appendChild(hline);
  svg.appendChild(label);
}
}

let greenline = true;
let blueline = true;




function addbuttons() {
  

  const bluebutton = document.createElement("button");
  bluebutton.innerText = "blue";
  bluebutton.style.backgroundColor = "blue";
  bluebutton.style.color = "white";

  bluebutton.addEventListener('click', (e) => {
    blueline = !blueline ;
    drawpaths()
   });

  document.getElementById("root").appendChild(bluebutton);




  const greenbutton = document.createElement("button");
  greenbutton.innerText = "green";
  greenbutton.style.backgroundColor = "green";
  greenbutton.style.color = "white";
  greenbutton.addEventListener('click', (e) => {
    greenline = !greenline ;
    drawpaths()
   });
  document.getElementById("root").appendChild(greenbutton);
}

function drawpaths() {
  svg.innerHTML= ""
  drawaxis()
  if(blueline){ drawpath(data1, "blue"); }
  
  if(greenline){ drawpath(data2, "green"); }
 
}

drawpaths();
addbuttons();