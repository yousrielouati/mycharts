const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("height", `${500}px`);
svg.setAttribute("width", `${600}px`);
svg.setAttribute("viewBox", `0 0 500 500`);
let highestvalue = 0 
let lowestvalue = 0
let step = 0

const year1 = [
  { city: "djerba", population: 150 },
  { city: "sfax", population: 177 },
  { city: "tunis", population: 190 },
  { city: "gabes", population: 133 },
  { city: "jerjis", population: 120 },
  { city: "medenine", population: 150 },
  { city: "tataouine", population: 120 },
  { city: "sousse", population: 160 },
  { city: "monastir", population: 180 },
  { city: "mahdia", population: 105 },
];

const year2 = [
    { city: "djerba", population: 120 },
    { city: "sfax", population: 133 },
    { city: "tunis", population: 140 },
    { city: "gabes", population: 155 },
    { city: "jerjis", population: 180 },
    { city: "medenine", population: 110 },
    { city: "tataouine", population: 140 },
    { city: "sousse", population: 170 },
    { city: "monastir", population: 116 },
    { city: "mahdia", population: 191 },
  ];


const extractBounds=(set1 , set2)=>{
    let arr1 = set1.map(({ population }) => population)
    let arr2 = set2.map(({ population }) => population)
    highestvalue =  Math.max.apply(Math, [...arr1,...arr2])
    lowestvalue=  Math.min.apply(Math, [...arr1,...arr2])
    step= (highestvalue - lowestvalue)/3
    console.log(step)
}
extractBounds(year1,year2)

function generateChart(data , offset , classname) {
  const barChartElems = [];
  const create = (d) => {
    d.forEach((entry, index) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const bar = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("y", 450);
      text.setAttribute("x", index * (500 / data.length) + offset);
      text.setAttribute("dy", ".35em");
      const textNode = document.createTextNode(entry.city);
      text.appendChild(textNode);
      bar.setAttribute("x", index * (500 / data.length) + offset + 30 );
      bar.setAttribute("y", 430 - entry.population);
      bar.setAttribute("height", `${entry.population}px`);
      bar.setAttribute("width", `${200 / data.length}px`);
      bar.setAttribute("class",classname)
      g.appendChild(bar);
      g.appendChild(text);
      svg.appendChild(g);
      barChartElems.push(bar);
    });
  };


  create(data);
  
  
}

  
const drawhlines = () => {
    for (let i = 430; i > 200; i -= step) {
     const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

     const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("y", i);
      text.setAttribute("x", 0);
      text.setAttribute("dy", ".35em");
      const textNode = document.createTextNode(Math.round((i-430) * -1));
      text.appendChild(textNode);


      const hline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      hline.setAttribute("x1", 30 );
      hline.setAttribute("y1", i );
      hline.setAttribute("x2", 530 );
      hline.setAttribute("y2", i);
      hline.setAttribute("style" , "stroke:rgb(0,0,0);stroke-width:1")
      g.appendChild(text)
      g.appendChild(hline)
      svg.appendChild(g) 
    }
  };


document.getElementById("root").appendChild(svg);

generateChart(year1 , 0, "b1");
generateChart(year2 , 20 , "b2");
drawhlines() ;


const input = document.createElement('input');
input.setAttribute("type" , "number") ;
input.setAttribute("id","ScaleInput")
const button = document.createElement('button');
button.innerText = 'change scale';

button.addEventListener('click', (e) => {
    
 step = document.getElementById("ScaleInput").value
 svg.innerHTML= ""
generateChart(year1 , 0, "b1");
generateChart(year2 , 20 , "b2");
drawhlines() ;

});

document.getElementById('root').appendChild(input);
document.getElementById('root').appendChild(button);
