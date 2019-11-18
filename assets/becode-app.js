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

let dataCountryOne = dataCountryTop[0];
const min = d3.min(dataCountryOne, d => d);
const max = d3.max(dataCountryOne, d => d);

const margin = {top: 20, right: 20, bottom : 100, left : 100};
const graphW = 800 - margin.left - margin.right;
const graphH = 500 - margin.top - margin.bottom;
const y = d3.scaleLinear()
            .domain([0, max])
            .range([450,0]);

const x = d3.scaleBand()
            .domain(dataYearsTop)
            .range([0, 650])
            .paddingInner(0.2)
            .paddingOuter(0.3);

const svgTop = d3.select("caption")
                .append("svg")
                .attr("width", 800)
                .attr("height", 500)
                .style("background-color","white");

const graphTop = svgTop.append("g") // groupe avec tout les battonet dedans
                .attr("widht", graphW)
                .attr("height",graphH)
                .attr("transform",`translate(${margin.left},${margin.top})`); 

const groupeX = graphTop.append("g")
                .attr("transform", `translate(0,450)`); // translate de 450, la ou doit etre l'axis x

const groupeY = graphTop.append("g");

const rectanglesTop  = graphTop.selectAll("rect")
                        .data(dataCountryOne)
                        .enter()
                        .append("rect")
                        .attr("fill","orange")
                        .attr("width",50)
                        .attr("height", (d) => 450 - y(d)) // 450 pour qu'il commence sur l'axis X
                        .attr("x", function (d,i){return x(dataYearsTop[i])})
                        .attr("y", (d) => y(d));
                        
const axeX = d3.axisBottom(x); // création de l'axe pour les dates
const axeY = d3.axisLeft(y)  // création de l'axe pour les valeurs de crimes
               .ticks(20)
               .tickFormat(d => d + " (en milliers)");
                        
groupeX.call(axeX) // appel de l'axe des dates dans le grp X
       .style("font-size", "14px");
groupeY.call(axeY) //appel de l'axe des valeurs dans le grp Y
        .style("font-size", "11px");





