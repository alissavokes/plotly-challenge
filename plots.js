
//read in json data
d3.json("data/samples.json").then(function(data){
    console.log(data)

    function optionChanged(){
        
        

        //filter the demographic info based on the selected test subject id
        //run chart for selected data with d3;
        metadata = mydata.metadata.filter(/*find element with matching id of value*/)
        plotObject = mydata.samples.filter(/*find sample with id === value*/)

        sortableData = plotObject.otu_ids.map((obj, index) => {
            return {
                otu_id:obj,
                sample_value: plotObject.sample_values[index]
            }
        })
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
    }

    init()
})



