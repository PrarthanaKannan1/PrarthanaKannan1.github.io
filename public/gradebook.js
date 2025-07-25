function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    
    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    
    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";
    
    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
        // Check if we're done (readyState 4 means the request is complete)
        if(xhr.readyState === XMLHttpRequest.DONE){
            // Check if we're successful (status 200 means OK)
            if(xhr.status === 200){
                console.log("Successfully fetched grade data");
                // Parse the JSON response and call the function to update the HTML
                populateGradebook(JSON.parse(xhr.responseText));
            } else {
                // Log error if request failed
                console.error(`Could not get grades. Status: ${xhr.status}`);
            }
        }
    }.bind(this);
    
    // Open the GET request to the API endpoint
    xhr.open("GET", apiRoute, true);
    // Send the request
    xhr.send();
}

function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    
    // Get the gradebook table element
    let tableElm = document.getElementById("gradebook");
    
    // Clear any existing rows (except header if present)
    // This ensures we don't duplicate data on multiple calls
    while (tableElm.rows.length > 1) {
        tableElm.deleteRow(1);
    }
    
    // For each row of data we're passed in
    data.forEach(function(assignment){ 
        // Create a table row element
        let row = document.createElement("tr"); 
        
        // Object to hold our column elements
        let columns = {}; 
        
        // The first column's table data will be the name
        columns.name = document.createElement('td'); 
        columns.name.appendChild(
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );
        
        // Second column will be the grade
        columns.grade = document.createElement('td'); 
        columns.grade.appendChild(
            // Just put the grade as text - you could be fancy and figure out the letter grade here
            // with either a bunch of conditions, or a Javascript "switch" statement
            document.createTextNode(assignment.total_grade)
        );
        
        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        
        // Add the row to the table itself to make the data visible
        tableElm.appendChild(row);
    });
    
    console.log(`Successfully populated gradebook with ${data.length} records`);
}

// Call the function to fetch and populate data when the script loads
fetchGradeData();
