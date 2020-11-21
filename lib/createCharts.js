var fs = require('fs');
var plotly = require('plotly')('davidmarco12', 'vgo4NSgrjjfKREiQ33o3');


//dato1 = numeros
//dato2 = texto
function generate_plot(dato1, dato2, idvisita, tipoChart) {
    return new Promise((resolve, reject) =>{
        var trace = {
            type: 'pie',
            values: dato1,
            labels: dato2,
            textposition: "inside",
          };
        
          var layout = {
            plot_bgcolor: 'rgb(255, 255, 255)',
            paper_bgcolor: 'rgb(255, 255, 255)',
          };
        
          var chart = {data: [trace], layout: layout};
        
          var pngOptions = {format: 'png', width: 400, height: 400};
        
          
        
        plotly.getImage(chart, pngOptions, function (err, imageData) {
            if (err) console.log(err);
            var pngStream = fs.createWriteStream('./public/chart-' +tipoChart+ idvisita + '.png');
            imageData.pipe(pngStream);
            pngStream.on('error', reject);
            pngStream.on('finish', resolve);
        });

    });
}

module.exports = {
    generate_plot
}

