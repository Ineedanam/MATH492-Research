//Author:Yixuan Chen
import Graph from './RandomGraph_version4.js'
console.log("Imported objects: ", Graph);
console.log("-------Distribution------------------");
var button = document.getElementById("clickMe");
button.addEventListener("click", distribFunc);

function distribFunc(){
let n = 100;
// let p = 0;
// let g = new Graph(n,p);

// let randGraph = g.randomizeEdges();
// let Hist = new Array(n+1).fill(0);
//---------------------------------------------------
let Hist50 = [];
for(let p=0; p<=0.05; p+=0.001){
    let Hist = new Array(n+1).fill(0);
    let g = new Graph(n,p);
    for(let turn = 0; turn<1000; turn++){
        g.countCompoundSizes(g.randomizeEdges(), Hist);
        //console.log(Hist);
       // Hist = new Array(n+1).fill(0);
        g.clearEdges();//before generate new graph, we need to clear        
    }
    Hist50.push(Hist);
    // p=p+0.1
    // g = new Graph(n,p);
    //console.log(g)  
    console.log("end one")
}

console.log(Hist50)
//-------------Bugs here-------------------------
// for(let i=0; i<= Hist50.length; i++){
//   for(let j=0; j<=Hist50[i].length; j++){
//     Hist50[i][j] = Hist50[i][j]/10000
//   }
// }
//----------------------------------------------------------

// console.log(Hist50)

//---------------------------------------------------


//-----------------Divide each value by turns---------------------
//elimate first 0
for (let i = 0; i < Hist50.length; i++) {
  Hist50[i].shift();
}

for (let i = 0; i < Hist50.length; i++) {
  for (let j = 0; j < Hist50[i].length; j++) {
      Hist50[i][j] /= 100000;
  }
}

console.log(Hist50);

// -----------------Convert Hist50 to CSV---------------
// let csv = '';
// for (let i = 0; i < Hist50.length; i++) {
//   csv += Hist50[i].join(',') + '\n';
// }

// // Download CSV file
// let filename = 'Hist50.csv';
// let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
// if (navigator.msSaveBlob) { // For IE 10+
//   navigator.msSaveBlob(blob, filename);
// } else {
//   let link = document.createElement('a');
//   if (link.download !== undefined) { // For modern browsers
//     let url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', filename);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// }





//-----------------------------------------

const svg = d3.select("body")
  .append("svg")
  .attr("width", 800)
  .attr("height", 500);

  
  const xScale = d3.scaleLinear()
    .domain([0, Hist50[0].length - 1])
    .range([50, 750]);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(Hist50.flat())])
    .range([450, 50]);
  
  const plot = svg.append("g")
    .attr("id", "plot");
  
  const duration = 1000;
  const ease = d3.easeLinear;
  
  const line = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d));
  
  let i = 0;
  let intervalId = null;
  
  // Create the Start button
  d3.select("body").append("button")
    .text("Start")
    .on("click", function() {
      if (intervalId === null) {
        intervalId = setInterval(function() {
          plot.select("path")
            .datum(Hist50[i])
            .transition()
            .duration(duration)
            .ease(ease)
            .attr("d", line);
          i = (i + 1) % Hist50.length;
        }, duration);
      }
    });
  
  // Create the Stop button
  d3.select("body").append("button")
    .text("Stop")
    .on("click", function() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  
  // Create the path element for the line chart
  plot.append("path")
    .datum(Hist50[0])
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", line);
}



//----------Covert to SVG file---------------









