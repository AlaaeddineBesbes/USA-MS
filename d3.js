let req = new XMLHttpRequest();
        // A function that create / update the plot for a given variable:
        var width = 450
        height = 450
        margin = 40
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    
    // append the svg object to the div called 'my_dataviz'
    
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var data1 = {a: 9, b: 20, c:30, d:8, e:12}
        var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
        
        // set the color scale
        var color = d3.scaleOrdinal()
          .range(["#5E4FA2", "#9E0142"]);
          
        function update(data) {
    
        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.value; })
          .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
        var data_ready = pie(d3.entries(data))
      
        // map to data
        var u = svg.selectAll("path")
          .data(data_ready)
      
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        u
          .enter()
          .append('path')
          .merge(u)
          .transition()
          .duration(1000)
          .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
          )
          .attr('fill', function(d){ return(color(d.data.key)) })
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 1)
      
        // remove the group that is not present anymore
        u
          .exit()
          .remove()
      
      }
        //getting the JSON file from a remote server with th ehelp of jsonbin.io API's
		req.open("GET", "https://api.jsonbin.io/v3/b/61e81973a785682f9718c66a", true);
		req.setRequestHeader("X-Master-Key", "$2b$10$pFE5tc4QryY7WrUyTNi90ulwoNLXU.S9bQEclmpSWUvSduW9gr2kC");
		req.send();	
		req.onreadystatechange = () => {

            // turing the data into json format
			let data = JSON.parse(req.responseText);
            data = data.record;
            //gender distribution
            let genderData={"Male":0,"Female":0,"Undefined":0};
            for (let i = 0 ;i<data.length;i++) {
                if (data[i]["fields"]["shooter_sex"] == "Male"){
                    genderData["Male"]+=1;
                }
                if (data[i]["fields"]["shooter_sex"] == "Female"){
                    genderData["Female"]+=1;
                }
                else{
                    genderData["Undefined"]+=1;
                }
                
            }
            //ethnicity distribution
            
            let raceData={"Black":0,"White":0,"Asian":0,"Native American":0,"Unknown":0};
            
            for (let i = 0 ;i<data.length;i++) {
               
               if (data[i]["fields"]["shooter_race"] == "Black American or African American"){
                raceData["Black"]+=1;
            }
            else if (data[i]["fields"]["shooter_race"] == "White American or European American"){
                raceData["White"]+=1;
            }
            else if (data[i]["fields"]["shooter_race"] == "Asian American"){
                raceData["Asian"]+=1;
            }
            else if (data[i]["fields"]["shooter_race"] == "Native American or Alaska Native"){
                raceData["Native American"]+=1;
                
            }
            else{
                raceData["Unknown"]+=1;
              
            }
            }
            

           
            //Shooters age
            let shootersAges=[];
            
            for (let i = 0 ;i<data.length;i++) {
                shootersAges.push(data[i]["fields"]["shooter_age_s"])
                
            }

            //Date distribution
            let shootingsDate=[];
            for (let i = 0 ;i<data.length;i++) {
                shootingsDate.push(data[i]["fields"]["date"]); 
                
            }
            //Number of Mass shooting per state 
            let msPerState={};
            for (let i = 0 ;i<data.length;i++) {
                msPerState[data[i]["fields"]["state"]] = (msPerState[data[i]["fields"]["state"]] || 0) + 1;
            }
            
            //Number of injuries
            let injuriePerState = {};
            for (let i = 0 ;i<data.length;i++) {
                injuriePerState[data[i]["fields"]["state"]] = (injuriePerState[data[i]["fields"]["state"]] || 0) + data[i]["fields"]["number_of_victims_injured"];
            }
            

            //death per state
 
            let deathPerState = {};
            for (let i = 0 ;i<data.length;i++) {
                deathPerState[data[i]["fields"]["state"]] = (deathPerState[data[i]["fields"]["state"]] || 0) + data[i]["fields"]["number_of_victim_fatalities"];
            }

            console.log(deathPerState);
            update(raceData);

           // console.log(deathPerState);
			// d3.select("body").selectAll("p")
			// 	.data(req.responseText)
			// 	.enter(data)
			// 	.append("p")
			// 	.text("New paragraph!");
			

  
    
    
    
    // Initialize the plot with the first dataset
 
			
		
		};
        