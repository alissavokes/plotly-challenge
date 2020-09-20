
//function to update plots when id changes
function buildPlots(id){
    //read in json data
    d3.json("data/samples.json").then(function(data){

        //console.log(data)
        //filter samples for individual
        let samples = data.samples
        let filterResult = samples.filter(data=> data.id.toString()===id)[0]
        console.log(filterResult)
        
        //get sample values
        let sampleValues = filterResult.sample_values
        console.log(sampleValues)
        
        //get otu ids
        let otuIDs = filterResult.otu_ids
        console.log(otuIDs)
        //get otu labels
        let otuLabels = filterResult.otu_labels
        console.log(otuLabels)

        //only need top 10 otu values for individual
        //reverse so that they are in descending order
        let otuTopValues = sampleValues.slice(0, 10).reverse()
        let otuTopIDs = otuIDs.slice(0,10).reverse()
        let otuTopLabels = otuLabels.slice(0,10).reverse()
        //rename otu ids
        otuTopIDs = otuTopIDs.map(d=> "OTU " + d)


        console.log(otuTopValues, otuTopIDs, otuTopLabels)

        //create trace for horizontal plot
        let barTrace = {
            x: otuTopValues,
            y: otuTopIDs,
            text: otuTopLabels,
            marker:{
                color: "rgb(14, 78, 123)"
            },
            type: "bar",
            orientation: "h"
        }

        //create data from trace
        let horizontalBarData = [barTrace]

        //create layout
        let barLayout = {
            title: "Top 10 OTUs Found in Individual"
        }

        //plot horizontal bar chart
        Plotly.newPlot("bar", horizontalBarData, barLayout)

        //create trace for bubble chart
        let bubbleTrace = {
            x: otuIDs,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs
            },
            text: otuLabels
        }

        //create data from trace
        let bubbleData = [bubbleTrace]

        //layout for bubble chart
        let bubbleLayout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000,
            title: "OTU Density for Individual"
        }

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    })
}

//function to create demographic metadata
function buildDemoInfo(id){
    //read in json data
    d3.json("data/samples.json").then(function(data){
    
        let metadata = data.metadata
        console.log(metadata)
        
        //filter metadata info for individual
        let filterResult = metadata.filter(data=> data.id.toString()===id)[0]
        //select demo panel
        let demoInfo = d3.select("#sample-metadata")

        //clear demographic info panel before getting new info
        demoInfo.html(" ")
        
        Object.entries(filterResult).forEach(key=> {
            demoInfo.append("h5").text(key[0] + ": " + key[1])
        })
    })

}

function optionChanged(id){
    //update plot
    buildPlots(id)
    //update demographic info
    buildDemoInfo(id)
}

//create initial function for default page load
function init(){
    //build select dropdown based on contents of data.names
    let dropdownMenu = d3.select("#selDataset")

    //read in json data
    d3.json("data/samples.json").then(function(data){
    
        data.names.forEach(name => {
            dropdownMenu.append("option")
                .text(name)
                .property("value")
        })

        //call functions to display data/plots (default first name (940))
        buildPlots(data.names[0])
        buildDemoInfo(data.names[0])
    })
}

init()


