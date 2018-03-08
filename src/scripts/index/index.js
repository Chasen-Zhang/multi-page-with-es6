import '../../styles/common.less';
import '../../styles/index.less';
/*import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';*/
import * as d3 from "d3";
class Index{
    saySomething(){
       // $('[data-toggle="popover"]').popover();

        // d3.select('.dtest')
        //     .selectAll('p')
        //     .text('yyyy')
        //     .style('color','red')
        //     .style('font-size','34px')
        // var str="China";
        // d3.select('.dtest')
        //     .selectAll('p')
        //     .datum(str)
        //     .text(function (d,i) {
        //         return "第"+ i +" 个元素绑定的数据是"+ d;
        //     })
        var dataset = [1,2,3];
       /* d3.select('.dtest')
            .append('p')
            .text('last append')*/
        d3.select('.dtest')
            .selectAll('p')
            .data(dataset)
            .text(function (d,i) {
                return d;
            })
       /* d3.select('.dtest')
            .insert('p','#hahh')
            .text('insert')*/

       /* d3.select('body').select('#hahh')
            .remove();*/
    }
    drawBar(){
        let dataset = [250,210,170,130,90];
        let height = 300;
        let width = 300;
        let svg = d3.select("body")
            .append("svg")
            .attr('width',width)
            .attr('height',height)
        let reactHeight = 25;

        let linear = d3.scaleLinear()
            .domain([0,d3.max(dataset)])
            .range([0,250]);

        let axis = d3.axisBottom()
            .scale(linear)
            .ticks(7)

        svg.append('g')
            .attr("class","axis")
            .attr("transform","translate(20,130)")
            .call(axis);
       /* svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr('x',20)
            .attr('y',function (d,i) {
                return i*reactHeight;
            })
            .attr("width",function (d) {
                return d;
            })
            .attr("height",reactHeight-2)
            .attr('fill',"red")*/
       svg.selectAll('rect')
           .data(dataset)
           .enter()
           .append('rect')
           .attr('x',20)
           .attr('y',function (d,i) {
               return i*reactHeight;
           })
           .attr('width',function (d) {
               return linear(d);
           })
           .attr("height",reactHeight-2)
           .attr('fill',"red");

    }
    testScaleLiner(){
        let dataset = [1.2,2.4,0.9,1.5,3.3];
        let max = d3.max(dataset);
        let min = d3.min(dataset);

        console.log(d3)

        var linear = d3.scaleLinear()
            .domain([min, max])
            .range([0, 300]);
        console.log(linear(2.5))
    }

    testOridinal(){
        let index= [0,1,2,3,4]
        let color = ['red','blue','green','yellow','black'];

        let oridinal = d3.scaleOrdinal()
            .domain(index)
            .range(color);

        console.log(oridinal(2))
    }

    testHoldBars() {
        let width = 400;
        let height = 400;
        let svg = d3.select('body')
            .append('svg')
            .attr("width", width)
            .attr("height", height);

        let padding = {
            left: 30,
            right: 30,
            top: 30,
            bottom: 20
        }

        let dataset = [10, 20, 30, 40, 33, 24, 12, 5];
        let temprange = d3.range(dataset.length);

        let xScale = d3.scaleLinear()
            .domain([0, temprange.length-1])
            .range([0, width - padding.left - padding.right]);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([height - padding.top - padding.bottom, 0]);

        let xAxis = d3.axisBottom()
            .scale(xScale);

        let yAxis = d3.axisLeft()
            .scale(yScale);

        let rectPadding = 4;
        let rects = svg.selectAll('.MyRect')
            .data(dataset)
            .enter()
            .append("rect")
            .attr('class','MyRect')
            .attr('transform','translate('+padding.left+','+padding.top+')')
            .attr('x',function (d,i) {
                return xScale(i) + rectPadding/2;
                ///return xScale(i);
               // return scaleBand(i);
            })
            .attr('y',function (d) {
                //return yScale(d);
                var min = yScale.domain()[0];
                return yScale(min);

            })
            .attr('fill','steelblue')
            .attr('width',20)
            .attr("height", function(d){
                return 0;
            })
            .transition()
            .delay(function(d,i){
                return i * 200;
            })
            .duration(2000)
            .ease(d3.easeCubicInOut)
            .attr("y",function(d){
                return yScale(d);
            })
            .attr("height", function(d){
                return height - padding.top - padding.bottom - yScale(d);
            });

        var texts = svg.selectAll(".MyText")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class","MyText")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function(d,i){
                return xScale(i) + rectPadding/2;
            } )
           .attr("dx",function(d,i){
                return 0;
            })
            .attr("dy",function(d){
                return 20;
            })
            .text(function(d){
                return d;
            })
           .attr("y",function(d){
               var min = yScale.domain()[0];
               return yScale(min);
           })
           .transition()
           /*.ease('bounce')*/
           .delay(function(d,i){
               return i * 200;
           })
           .duration([2000])
            .ease(d3.easeLinear)
           .attr("y",function(d){
               return yScale(d);
           });

        //添加x轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis);

        //添加y轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis);

        let svgDom=svg.node();

        d3.select('svg')
            .selectAll('.MyRect')
            /*.on('mouseover',function(d,i){
                let x = d3.mouse(svgDom)[0]+20;
                let y = d3.mouse(svgDom)[1];
                d3.select('.popup')
                    .style('left',x+'px')
                    .style('top',y+'px')
                    .style('display','block')
                    .select('.no')
                    .text(d)
            })
           .on('mouseout',function (d,i) {
               d3.select('.popup')
                   .style('display','none')
           })*/
            .on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill","steelblue");
            });
    }

    drawPie(){
        let width = 400;
        let height = 400;
       let svg =d3.select('body')
            .append('svg')
            .attr('width',width)
            .attr('height',height);
        /*提供数据*/
        let dataset = [10,20,30];

        /*提供布局，数据转换*/
        let pie = d3.pie();
        let piedata = pie(dataset);

        console.log(piedata);

        let color = ['green','red','black'];
        let outRadius = 150;
        let innerRadius = 80;
        /*弧生成器*/
        let arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outRadius)

        /* arc 可以当做一个函数使用，把 piedata 作为参数传入，即可得到路径值。*/

        /* svg中添加相应的足够数量的组元素 g*/
        let arcs = svg.selectAll('g')
            .data(piedata)
            .enter()
            .append('g')
            .style('cursor','pointer')
            .attr("transform","translate("+ (width/2) +","+ (width/2) +")");

        /*在g中生成path*/
        arcs.append('path')
            .attr('fill',function (d,i) {
                return color[i];
            })
            .attr('d',function (d) {
                return arc(d);
            });
        /*在g中生成tex*/
        arcs.append('text')
            .attr('transform',function (d) {
                return 'translate('+arc.centroid(d) + ')';
            })
            .attr('text-anchor','middle')
            .attr('fill','#fff')
            .text(function (d) {
                return ''+d.data+','+((d.data/60).toFixed(2))*100+'%';
            })
    }



}
let index = new Index();
//index.saySomething();
index.drawPie();