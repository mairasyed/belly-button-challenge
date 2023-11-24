let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Function #1 - To define the dashboard activities
function initDashboard() {
    var dropdown =  d3.select("#selDataset")
    d3.json(url).then(data=> {
    var patientIDs = data.names;
    patientIDs.forEach(patientID => {
    dropdown.append("option").text(patientID).property("value", patientID)
    } )

    // Calling the function to populate demographicInfo
    populateDemoInfo(patientIDs[0]);
    buildBarChart(patientIDs[0]);
} )
};

initDashboard();

// FUNCTION #2 - To define a function to populate DemographicInfo table
function populateDemoInfo(patientID) {
var demographicInfoBox = d3.select("#sample-metadata");

d3.json(url).then(data => {
    var metadata = data.metadata
    var filteredMetadata = metadata.filter(bacteriaInfo=> bacteriaInfo.id == patientID) [0]
    console.log(filteredMetadata)

    // Clear previous data
    demographicInfoBox.html("");
    Object.entries(filteredMetadata).forEach(([key,value])=> {
        demographicInfoBox.append("p").text(`${key}:${value}`)
    })
})
}

// Function #3- To define Optionchanged
function optionChanged(patientID) {
    console.log(patientID);
    buildBarChart(patientID);
    // buildBubbleChart(patientID);
    // buildGuageChart(patientID);

    populateDemoInfo(patientID);
 
}

// No.1  Definition of function to build 'Bar' chart 
function buildBarChart(patientID) {

    // Read in the JSON data
      d3.json(url).then((data => {
  
          // Define samples
          var samples = data.samples
  
          // Filter by patient ID
          var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
  
          // Create variables for chart
          // Grab sample_values for the bar chart
          var sample_values = filteredSample.sample_values
  
          // Use otu_ids as the labels for bar chart
          var otu_ids = filteredSample.otu_ids
  
          // use otu_labels as the hovertext for bar chart
          var otu_labels = filteredSample.otu_labels
  
          // BAR CHART
          // Create the trace
           var bar_data =[{
              // Use otu_ids for the x values
              x: sample_values.slice(0, 10).reverse(),
              // Use sample_values for the y values
              y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
              // Use otu_labels for the text values
              text: otu_labels.slice(0, 10).reverse(),
              type: 'bar',
              orientation: 'h',
              marker: {
                  color: 'rgb(242, 113, 102)'
              },
          }]
  
  
  
  
          // Define plot layout
          var bar_layout = {
              title: "Top 10 Microbial Species in Belly Buttons",
              xaxis: { title: "Bacteria Sample Values" },
              yaxis: { title: "OTU IDs" }
          };
  
          // Display plot
          Plotly.newPlot('bar', bar_data, bar_layout)
  
          
      }))
  
  
  };





    
  






