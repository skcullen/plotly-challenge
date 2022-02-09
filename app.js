


function getData(id) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var samples = data.samples;
        var results = samples.filter(object=>object.id == id);
        var result = results[0]

        var otuids = result.otu_ids;
        var otulabels = result.otu_labels;
        var samplevalues = result.sample_values;

        var bardata = [{
            y:otuids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            x:samplevalues.slice(0,10).reverse(),
            text:otulabels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        }];

        var layout1 = {
            margin: { t: 50, l: 75 },
        };

        Plotly.newPlot("bar", bardata, layout1);

        var bubbledata = [{
            x:otuids,
            y:samplevalues,
            
            text:otulabels,
            mode: "markers",
            marker: {
                color: otuids,
                size: samplevalues,
            }
        }];

        var layout2 = {
            margin: {l:50},
            xaxis: { title: "OTU ID"}
        };

        Plotly.newPlot("bubble", bubbledata, layout2);
    });
}


function getMetadata(id) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var metadata = data.metadata;
        var results2 = metadata.filter(object => object.id == id);
        var result2 = results2[0];

        var demoinfo = d3.select("#demo-info");
        demoinfo.html("");
        Object.entries(result2).forEach(([key, value]) => {
            demoinfo.append("h6").text(`${key}: ${value}`);

        var freq = results2[0].wfreq
        console.log(freq)

        var gaugedata = [
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: freq,
                title: { text: "Weekly Washing Frequency", font: { size: 24 } },
                gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
                bar: { color: "black" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 2], color: "white" },
                    { range: [2, 4], color: "lightgreen"},
                    { range: [4, 6], color: "forestgreen"},
                    { range: [6, 8], color: "green"},
                    { range: [8, 10], color: "darkgreen"}
                ]
                }
            }
            ];
            
            var layout3 = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "black", family: "Arial" }
            };
            
            Plotly.newPlot('gauge', gaugedata, layout3);



        
        });
    });
}


function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data)
        var ids1 = data.names
        ids1.forEach((id) => {
            dropdown.append("option").text(id).property("value");

        });

        getData(ids1[0]);
        getMetadata(ids1[0]);
    });

    

}

function optionchange(id) {
    getData(id);
    getMetadata(id);
}

init();













  







