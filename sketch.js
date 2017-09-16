var mapimg, earthquakes, clat=0, clon=0, zoom=1;


// Vancouver Latitude:49° 15' 48.9168" 'Longitude:-123° 8' 18.834"
var lt=49.2827, 
    ln=-123.1207;

function preload() {
    mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoicHJjOTUiLCJhIjoiY2o1ZHZncHAwMGRzOTMybnU0Yjh6dDFvciJ9.KQJUo-SJCI93GEsO6TwNRA");
    
    earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
}
function setup() {
    createCanvas(1024, 512);
    translate(width/2, height/2);
    imageMode(CENTER);
    image(mapimg, 0, 0);
    
    var cx = mercX(clon);
    var cy = mercY(clat);    
 
    for(var i = 0; i < earthquakes.length; i++){
        var data = earthquakes[i].split(/,/);
        var lt = data[1];
        var ln = data[2];
        var mag = data[4];
            
        mag = pow(10,mag);
        mag = sqrt(mag);
        
        var magmax = sqrt(pow(10,10));
        
        var d = map(mag, 0, magmax, 0, 180);
        
        var x = mercX(ln) - cx;
        var y = mercY(lt) - cy;

        stroke(255, 0, 255);
        fill(255,0,255,200);
        ellipse(x,y,d,d);
    }
}

function mercX(lon) {
    lon = radians(lon);
    var a = (256/PI)*pow(2,zoom)
    var b = lon + PI;
    return a * b;
}
function mercY(lat) {
    lat = radians(lat);
    var a = (256/PI)*pow(2,zoom)
    var b = tan(PI/4 + lat/2);
    var c = PI - log(b);
    return a * c;
}