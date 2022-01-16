img = "";
status = "";
objectdetector = "";
objects=[];
sound = "";

function preload() {
    img = loadImage("ov.jpg");
    sound = loadsound("sond.mp3")
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting objects";
}
function draw() {
    image(video, 0, 0, 640, 420);
   
    if(status !="") { 
        r = random(255);
        g = random(255);
        b = random(255); 
         objectdetector.detect(video, gotResult);
         
        for(i=0; i < objects.length; i++ ) {
            if(objects.length = 0 && objects[i] != "Person") {
                document.getElementById("status").innerHTML = "status = obj no dect";
                document.getElementById("noo").innerHTML = "bebe not found  ";
                sound.play();
            } else{
         sound.stop();
            document.getElementById("status").innerHTML = "status = obj dect";
            document.getElementById("noo").innerHTML = "bebe found  ";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            }
            
    noFill();
 stroke(r,g,b);

 rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    

}
function modelLoaded() {
    console.log("modaloaded");
    status = true;
    
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}