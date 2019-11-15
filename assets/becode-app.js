/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name : Lissens Loïc
Date : 12/11/2019
Contact information : 
What does this script do ? 
...
*/

// Your scripting goes here...

/*console.log(lol1); METHODE RECUP NODE
lol1 = [...lol1];
console.log(lol1);
let mdr = lol1[3].querySelectorAll("td");
console.log(mdr); */
//////////////////////////////////////////////////////////////////////////////
/*RECUPERATION DES DONNES TU TABLEAU DU HAUT*/
let countryNameTop = []; // tab ou sont stocké les noms des pays du tab top
let dataCountryTop = []; // tab ou sont stockés les data par pays
let dataYearsTop = []; // tab ou sont stockés les  années
const getTableTop = document.querySelector("#table1");
let getDataCountryTop = getTableTop.querySelectorAll("tr");
getDataCountryTop = [...getDataCountryTop];
// Recuperation des données des pays
for (let i=2; i<getDataCountryTop.length;i++){
    dataCountryTop.push(getDataCountryTop[i].textContent);
}

for(let i=0; i<dataCountryTop.length;i++){
    dataCountryTop[i] = dataCountryTop[i].replace(/\s+/g, ' ').trim();
    dataCountryTop[i] = dataCountryTop[i].split(" ");
    dataCountryTop[i].shift();
    for(let l = 1; l<dataCountryTop[i].length;l++ ){
        dataCountryTop[i][l] = dataCountryTop[i][l].replace(",",".");
        dataCountryTop[i][l] = dataCountryTop[i][l].replace(":","0");
        dataCountryTop[i][l] =  parseFloat(dataCountryTop[i][l]);
       }
}
for (let i = 0; i<dataCountryTop.length; i++){
    countryNameTop.push(dataCountryTop[i][0]);
    dataCountryTop[i].shift();
}

// Récupération des dates
dataYearsTop.push(getDataCountryTop[1].textContent);
dataYearsTop[0] = dataYearsTop[0].replace(/\s+/g, ' ').trim();
dataYearsTop = dataYearsTop[0].split(" ");


//////////////////////////////////////////////////////////////////////////////
// CREATION DU CANVAS ET GRAPHIQUES 

let dataCountryOne = dataCountryTop[4];
const min = d3.min(dataCountryOne, d => d);
const max = d3.max(dataCountryOne, d => d);

const w = 800 ;
const h = 500;
const y = d3.scaleLinear()
            .domain([0, max])
            .range([0,400]);
const x = d3.scaleBand()
            .domain(dataYearsTop)
            .range([0, 700]);


const svgTop = d3.select("caption")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("background-color","red");

    svgTop.selectAll("rect")
        .data(dataCountryOne)
        .enter()
        .append("rect")
        .attr("fill","aqua")
        .attr("width",50)
        .attr("height", (d) => y(d))
        .attr("x", function (d,i){return x(dataYearsTop[i])})
        .attr("y", (d, i) => h - y(d))
















