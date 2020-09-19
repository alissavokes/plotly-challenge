
//read in json data
d3.json("data/samples.json").then(function(data){
    console.log(data)

    //function to update plots when id changes
    function buildPlots(id){
        //get sample values
        let sampleValues = data.samples[0].sample_values
        console.log(sampleValues)
        //get otu ids
        let otuIDs = data.samples[0].otu_ids
        console.log(otuIDs)
        //get otu labels
        let otuLabels = data.samples[0].otu_labels
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

        //layout for bubble chart
        let 



    }

    function optionChanged(id){
        //update plot
        buildPlots(id)
    }
    //create initial function for default page load
    function init(){
        //build select dropdown based on contents of data.names
        let dropdownMenu = d3.select("#selDataset")

        data.names.forEach(name => {
            dropdownMenu.append("option")
                .text(name)
                .property("value")
        })

        //call functions to display data/plots (default first name (940))
        buildPlots(data.names[0])
    }

    init()
})



