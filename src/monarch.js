  map = d3.select('#map')
  width = map.attr('width')
  height = map.attr('height')

  var projection = d3.geoMercator()
  	.scale(440)
  	.translate([width*1.45, height*1.2]);

  var path = d3.geoPath()
  	.projection(projection);

  map.append('path')
  .attr('d', path)
  .style('fill','black')

  d3.json("./src/northamerica.json", function(states){
    return states
  }).then(function(data){
      map.selectAll('.states')
        .data(data.features)
        .enter().append('path')
        .attr('d', path)
        .attr('data-r', function(d){ return d.properties.name })
        .attr('class', 'states')
        .style('fill', 'lightgray')
        .style('stroke', 'white');
  })


  d3.csv("./src/monarch.csv", function(row){
        return row
      }).then(function(data){
        data = data.filter(function(d){ return d.lat != null & d.lon != null & d.year > 1950})

        var day = 1
        var progressInterval
        var date = d3.select('#date')
        var startDate = new Date(2020,0)
        var newDate = new Date(2020,0)
        var cx = 0

        var margin = {top:0, right:30, bottom:10, left:30}
        var width = 710 - margin.left - margin.right
        var height = 70 - margin.top - margin.bottom

        var xScale = d3.scaleLinear()
          .domain([1, 366])
          .range([0, width])

        var dateSVG = d3.select("#date")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .call(d3.drag()
                .on("start.interrup", function(){ clearInterval(progressInterval) })
                .on("start drag", function(d){
                $('#pause').hide()
                $('#play').show()
                update(d3.event.x-margin.left)
              }));


        var scroll = dateSVG.append('g')
        .attr("transform", "translate(" + margin.left + "," + -margin.bottom + ")")

        $(document).keydown(function(e){
          if(e.keyCode == 37 | e.keyCode == 39){
            event.preventDefault();
            clearInterval(progressInterval)
            if(e.keyCode == 39){
              if(day != 366){
                day = day + 1
              }else{
                day = 1
              }
            }
            if(e.keyCode == 37){
              if(day > 1){
                day = day - 1
              }else{
                day = 366
              }
            }
            console.log(day)
            cx = xScale(day)
            dateCirc.attr('cx', cx)
            dateText.attr('x', cx)
            dateText.text(d3.timeFormat("%b-%d")(new Date(2020,0).setDate(startDate.getDate()+day-1)))
            plot(data.filter(function(d){ return d.day == day}))
          }

          if(e.keyCode == 32){
            event.preventDefault();
              if($('#pause').css('display') == 'none'){
                $('#pause').show()
                $('#play').hide()
                progressInterval = setInterval(progress, 100)
              }else{
                $('#play').show()
                $('#pause').hide()
                clearInterval(progressInterval)
              }
          }
        })


        scroll.append('line')
        .attr('x1', '0').attr('x2', width)
        .attr('y1', '65').attr('y2', '65')
        .style('stroke', 'gray')
        .style('stroke-width', '10')
        .style('fill', 'gray')


        scroll.append('circle')
        .attr('cx', '0').attr('cy', '65')
        .attr('r', '13')
        .style('fill', 'rgb(121, 210, 121)')
        .style('stroke', 'black')


        scroll.append('circle')
        .attr('cx', width).attr('cy', '65')
        .attr('r', '13')
        .style('fill', 'rgb(255, 64, 0)')
        .style('stroke', 'black')

        var dateText = scroll.append('text')
        .attr('x', 0).attr('y', 35)
        .attr('text-anchor','middle')
        .text('Jan-01')
        .style('font-size', '21px')


        var dateCirc = scroll.append('circle')
        .attr('cx', '0').attr('cy', '65')
        .attr('r', '13')
        .style('fill', 'lightblue')
        .style('stroke', 'black')


        function progress(){
          if(day < 366){
            day = day+1
            cx = xScale(day)
            dateCirc.attr('cx', cx)
            dateText.attr('x', cx)
            dateText.text(d3.timeFormat("%b-%d")(new Date(2020,0).setDate(startDate.getDate()+day-1)))
            plot(data.filter(function(d){ return d.day == day}))
          }else{
            day = 0
            cx = xScale(day)
            $('#pause').hide()
            $('#play').show()
            clearInterval(progressInterval)
          }
        }

        $('.button').click(function(){
          if(day <= 366){
            $(this).hide()
            if($(this).attr('id') == 'play'){
              $('#pause').show()
              progressInterval = setInterval(progress, 100)
            }else{
              $('#play').show()
              clearInterval(progressInterval)
            }
          }
        })

        function update(loc){
            if(loc < 0){
              loc = 0
            }else if(loc > width){
              loc = width
            }
            day = parseInt(xScale.invert(loc))
            cx = xScale(day)
            dateCirc.attr('cx', cx)
            dateText.attr('x', cx)
            dateText.text(d3.timeFormat("%b-%d")(new Date(2020,0).setDate(startDate.getDate()+day-1)))
            plot(data.filter(function(d){ return d.day == day}))
          }
          plot(data.filter(function(d){ return d.day == 1}))


          function plot(points){
            d3.selectAll('.sightings').remove()
            d3.selectAll('.contour').remove()
            sights = []
            for(point of points){
              proj = projection([point.lon, point.lat])
              if(proj != null){
                sights.push(proj)
              }
            }

            map.selectAll(".sightings")
              .data(sights)
              .enter()
              .append("circle")
              .attr('class', 'sightings')
              .attr("cx", function(d){ return d[0];})
              .attr("cy", function(d){ return d[1];})
              .attr("r", 4)
              .style("fill", "red")
              .attr("stroke", "black")
              .attr("stroke-width", 1)
              .attr('opacity', '1')

          var color = d3.scaleLinear()
           .domain([0, .001]) // Points per square pixel.
           .range(["white", "red"])

          var densityData = d3.contourDensity()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .size([map.attr('width'), map.attr('height')])
            .bandwidth(20)
            (sights)

            // map.append("g")
            //   .selectAll("path")
            //   .data(densityData)
            //   .enter().append("path")
            //   .attr('class', 'contour')
            //   .attr("d", d3.geoPath())
            //   .attr("stroke", function(d) { return color(d.value); })
            //   .attr('fill', 'none')
          }
    })
