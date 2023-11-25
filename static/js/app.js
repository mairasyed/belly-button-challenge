let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// No. 1 Defines the function to create the Dashboard activities
function initDashboard() {
    
    var dropdown = d3.select("#selDataset")
    
    d3.json(url).then(data => {

        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        });
        // Calling the function to populate Demographic Info
        populateDemoInfo(patientIDs[0]);
        
        // Call all those functions which build the 'Bar', 'Bubble', & 'Guage' Chart for the Dashboard.
        buildBarChart(patientIDs[0]);
        buildBubbleChart(patientIDs[0]);
        buildGuageChart(patientIDs[0]);

    });
}

// Call the function for Dashboard
initDashboard();



// No. 2 Defines he function to populate Demographic Info
function populateDemoInfo(patientID){
    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json(url).then(data =>{
        var metadata = data.metadata
        var filteredMetadata = metadata.filter( bacteriaInfo => bacteriaInfo.id == patientID)[0]
        console.log(filteredMetadata)
    
    // Clear the previous data
    demographicInfoBox.html("");
     Object.entries(filteredMetadata).forEach(([key, value]) => {
        demographicInfoBox.append("p").text(`${key}: ${value}`)
    })
});
}


// No. 3 Defines the function for OptionChaged 
function optionChanged(patientID) {
    console.log(patientID);
    // Call the function to populate Demographic info 
    populateDemoInfo(patientID);

    // Call the function to pass the 'patientID' for the 'Bar', 'Bubble' and 'Guage' chart.
    buildBarChart(patientID);
    buildBubbleChart(patientID);
    buildGuageChart(patientID);
}


// No. 4 Defines the function to get the data and build the 'Bar' chart.
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


// No. 5 Defines the function to get the data and build the 'Bubbble' chart.
function buildBubbleChart(patientID) {

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
  
  
          // BUBBLE CHART
          // Create the trace
          var bubble_data = [{
              // Use otu_ids for the x values
              x: otu_ids,
              // Use sample_values for the y values
              y: sample_values,
              // Use otu_labels for the text values
              text: otu_labels,
              mode: 'markers',
              marker: {
                  // Use otu_ids for the marker colors
                  color: otu_ids,
                  // Use sample_values for the marker size
                  size: sample_values,
                  colorscale: 'YlOrRd'
              }
          }];
  
  
          // Define plot layout
          var layout = {
              title: "Belly Button Samples",
              xaxis: { title: "OTU IDs" },
              yaxis: { title: "Sample Values" }
          };
  
          // Display plot
          Plotly.newPlot('bubble', bubble_data, layout)
  
          
      }))
  
  
  };


// No. 6 Defines the function to get the data and build the 'Guage' chart.
function buildGuageChart(patientID) {
    // Read in the JSON data
      d3.json(url).then((data => {
  
          // Define samples
          var metadata = data.metadata
          var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
  
         // GAUGE CHART
          // Create variable for washing frequency
          var washFreq = filteredMetadata.wfreq
  
          // Create the trace
          var gauge_data = [
              {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: washFreq,
                  title: { text: "Washing Frequency (Times per Week)" },
                  type: "indicator",
                  mode: "gauge+number",
                  gauge: {
                      bar: {color: 'white'},
                      axis: { range: [null, 9] },
                      steps: [
                          { range: [0, 3], color: 'rgb(253, 162, 73)' },
                          { range: [3, 6], color: 'rgb(242, 113, 102)' },
                          { range: [6, 9], color: 'rgb(166, 77, 104)' },
                      ],
                      // threshold: {
                      //     line: { color: "white" },
                      // }
                  }
              }
          ];
  
          // Define Plot layout
          var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
  
          // Display plot
          Plotly.newPlot('gauge', gauge_data, gauge_layout);
      }))
  
  
  };
  