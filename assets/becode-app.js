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
function startgraph () {
let chosenCountry = d3.select("#selectmenu")
                        .property("value");

let find = countryNameTop.findIndex(x => x == chosenCountry);

let indice = find;
let dataCountryOne = dataCountryTop[indice];

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
                        .attr("fill","coral")
                        .attr("width",50)
                        .attr("height", (d) => 450 - y(d)) // 450 pour qu'il commence sur l'axis X
                        .attr("x", function (d,i){return x(dataYearsTop[i])})
                        .attr("y", (d) => y(d))
                        .on("mouseover", function(d,i){
                            d3.select(this).attr("fill", "orange")
                                            .attr("stroke","coral")
                                            .attr("stroke-width","3");
                            })
                        .on("mouseout", function(d,i){
                            d3.select(this).attr("fill", "coral")
                                            .attr("stroke","coral")
                            .               attr("stroke-width","0");
                        });
                        
const axeX = d3.axisBottom(x); // création de l'axe pour les dates
const axeY = d3.axisLeft(y)  // création de l'axe pour les valeurs de crimes
               .ticks(20)
               .tickFormat(d => d + " (en milliers)");
                        
groupeX.call(axeX) // appel de l'axe des dates dans le grp X
       .style("font-size", "14px");
groupeY.call(axeY) //appel de l'axe des valeurs dans le grp Y
        .style("font-size", "11px");

 d3.select("#selectmenu").on("change", () => {
    svgTop.remove();
    startgraph();
 })
 
}

//////////////////////////////////////////////////////////////////////////////
// Menu dérouant 
const selectmenu = d3.select("caption")
                .insert("select","svg")
                .attr("id", "selectmenu")
                .style("margin-left","50px");
                        
        selectmenu.selectAll("option")
                    .data(countryNameTop)
                    .enter()
                    .append("option")
                    .text(function(d){return d}) 
                    .attr("valeur", function(d){return d});

 startgraph();
///////////////////////////////////////////////////////////////////////////
// TABLEAU DU BAS 
// Récupération des données
let countryNameBottom = []; // tab ou sont stocké les noms des pays du tab  bottom
let dataCountryBottom = []; // tab ou sont stockés les data par pays du bottom
let dataYearsBottom = []; // tab ou sont stockés les  années bottom

const getTableBottom = document.querySelector("#table2");
let getDataCountryBottom = getTableBottom.querySelectorAll("tr");
getDataCountryBottom = [...getDataCountryBottom];

// Recuperation des données des pays du tab du bas
for (let i=1; i<getDataCountryBottom.length;i++){
    dataCountryBottom.push(getDataCountryBottom[i].textContent);
}

for(let i=0; i<dataCountryBottom.length;i++){
    dataCountryBottom[i] = dataCountryBottom[i].replace(/\s+/g, ' ').trim();
    dataCountryBottom[i] = dataCountryBottom[i].split(" ");
    dataCountryBottom[i].shift();
    for(let l = 1; l<dataCountryBottom[i].length;l++ ){
       
        dataCountryBottom[i][l] =  parseFloat(dataCountryBottom[i][l]);
       }
}
for (let i = 0; i<dataCountryBottom.length; i++){
    countryNameBottom.push(dataCountryBottom[i][0]);
    dataCountryBottom[i].shift();
}

// Récupération des dates du tableau du bas
dataYearsBottom.push(getDataCountryBottom[0].textContent);
dataYearsBottom[0] = dataYearsBottom[0].replace(/\s+/g, ' ').trim();
dataYearsBottom = dataYearsBottom[0].split(" ");
dataYearsBottom.shift();
dataYearsBottom.shift();
dataCountryBottom[7].shift();

///////////////////////////////////////////////////////////////////////////
// GRAPHIQUE DU BAS

function startgraphbottom () {

let chosenCountryBottom = d3.select("#selectmenuBottom")
    .property("value");

let findBottom = countryNameBottom.findIndex(v => v == chosenCountryBottom);

let indiceBottom = findBottom;

let dataCountryTwo = dataCountryBottom[indiceBottom];

const minB = d3.min(dataCountryTwo, d => d);
const maxB = d3.max(dataCountryTwo, d => d);

const marginB = {top: 20, right: 20, bottom : 100, left : 100};
const graphWB = 800 - marginB.left - marginB.right;
const graphHB = 500 - marginB.top - marginB.bottom;
const yB = d3.scaleLinear()
            .domain([0, maxB])
            .range([450,0]);

const xB = d3.scaleBand()
            .domain(dataYearsBottom)
            .range([0, 650])
            .paddingInner(0.2)
            .paddingOuter(0.3);

const svgBottom = d3.select("#Homicides")
                .append("svg")
                .attr("width", 800)
                .attr("height", 500)
                .style("background-color","white");

const graphBottom = svgBottom.append("g") // groupe avec tout les battonet dedans
                .attr("widht", graphWB)
                .attr("height",graphHB)
                .attr("transform",`translate(${marginB.left},${marginB.top})`); 

const groupeXB = graphBottom.append("g")
                .attr("transform", `translate(0,450)`); // translate de 450, la ou doit etre l'axis x

const groupeYB = graphBottom.append("g");

const rectanglesBottom  = graphBottom.selectAll("rect")
                        .data(dataCountryTwo)
                        .enter()
                        .append("rect")
                        .attr("fill","coral")
                        .attr("width",200)
                        .attr("height", (d) => 450 - yB(d)) // 450 pour qu'il commence sur l'axis X
                        .attr("x", function (d,i){return xB(dataYearsBottom[i])})
                        .attr("y", (d) => yB(d))
                        .on("mouseover", function(d,i){
                            d3.select(this).attr("fill", "orange")
                                            .attr("stroke","coral")
                                            .attr("stroke-width","3");
                            })
                        .on("mouseout", function(d,i){
                            d3.select(this).attr("fill", "coral")
                                            .attr("stroke","coral")
                            .               attr("stroke-width","0");
                        });
                        
const axeXB = d3.axisBottom(xB); // création de l'axe pour les dates
const axeYB = d3.axisLeft(yB)  // création de l'axe pour les valeurs de crimes
               .ticks(20)
               .tickFormat(d => d + " (en milliers)");
                        
groupeXB.call(axeXB) // appel de l'axe des dates dans le grp X
       .style("font-size", "14px");
groupeYB.call(axeYB) //appel de l'axe des valeurs dans le grp Y
        .style("font-size", "11px");
d3.select("#selectmenuBottom").on("change", () => {
            svgBottom.remove();
            startgraphbottom();
         })

}

const selectmenuBottom = d3.select("#Homicides")
                .insert("select","svg")
                .attr("id", "selectmenuBottom")
                .style("margin-left","50px");
                        
        selectmenuBottom.selectAll("option")
                    .data(countryNameBottom)
                    .enter()
                    .append("option")
                    .text(function(d){return d}) 
                    .attr("valeur", function(d){return d});

 startgraphbottom();

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  GRAPHIQUE LIVE  TOUT SAUF TERMINER 
 

   
/*window.addEventListener("load", async() =>{

   
    
    try {
        const requete = await fetch("https://inside.becode.org/api/v1/data/random.json");
        const data = await requete.json();
        console.log(data);

        const getHOne =  d3.select("#firstHeading")
        .append("svg")
        .attr("width", 800)
        .attr("height", 500)
        .style("background-color","red");

        const minLive = d3.min(data, d => d);
        const maxLive = d3.max(data, d => d);

        const marginLive = {top: 20, right: 20, bottom : 100, left : 100};
        const graphWLive = 800 - marginLive.left - marginLive.right;
        const graphHLive = 500 - marginLive.top - marginLive.bottom;
        const yLive = d3.scaleLinear()
            .domain([minLive, maxLive])
            .range([450,0]);

        const xLive = d3.scaleBand()
            .domain(data[1])
            .range([0, 650])
            .paddingInner(0.2)
            .paddingOuter(0.3);

        

const graphLive = getHOne.append("g") // groupe avec tout les battonet dedans
                .attr("widht", graphWLive)
                .attr("height",graphHLive)
                .attr("transform",`translate(${marginLive.left},${marginLive.top})`); 

const groupeXLive = getHOne.append("g")
                .attr("transform", `translate(0,450)`); // translate de 450, la ou doit etre l'axis x

const groupeYLive = getHOne.append("g");

const rectanglesLive  = graphLive.selectAll("rect")
                        .data(data[0])
                        .enter()
                        .append("rect")
                        .attr("fill","coral")
                        .attr("width",50)
                        .attr("height", (d) => 450 - yLive(d)) // 450 pour qu'il commence sur l'axis X
                        .attr("x", function (d,i){return d })
                        .attr("y", (d) => yLive(d))
                        .on("mouseover", function(d,i){
                            d3.select(this).attr("fill", "orange")
                                            .attr("stroke","coral")
                                            .attr("stroke-width","3");
                            })
                        .on("mouseout", function(d,i){
                            d3.select(this).attr("fill", "coral")
                                            .attr("stroke","coral")
                            .               attr("stroke-width","0");
                        });
                        
const axeXLive = d3.axisBottom(axeXLive); // création de l'axe pour les dates
const axeYLive = d3.axisLeft(yLive)  // création de l'axe pour les valeurs de crimes
               .ticks(20);
               
                        
groupeXLive.call(axeX) // appel de l'axe des dates dans le grp X
       .style("font-size", "14px");
groupeYLive.call(axeYLive) //appel de l'axe des valeurs dans le grp Y
        .style("font-size", "11px");
        
    } catch(error) {
        console.error(error);
    }
   


});*/

    
