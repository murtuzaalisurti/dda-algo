const terminals = {
    start: [0, 0],
    end: [400, 200]
}
let coordinates = [];
let coor = 0;
let p5instance;

function run() {

    function dda(terminals) {
        coor = 0;
        let dx = terminals.end[0] - terminals.start[0]
        let dy = terminals.end[1] - terminals.start[1]
        let len = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    
        let xIncrement = dx / len
        let yIncrement = dy / len
    
        let X = terminals.start[0]
        let Y = terminals.start[1]
        coordinates = [];
        for (let i = 0; i <= len; i++) {
            coordinates.push([Math.round(X), Math.round(Y)])
            X += xIncrement
            Y += yIncrement
        }
    }

    dda(terminals)

    const instance = (p) => {
        p.setup = function() {
            let canvas = p.createCanvas(400, 400);
            // canvas.position(10, 10);
            p.frameRate(60)
        }
    
        p.draw = function() {
            p.noStroke();
            p.background(220, 180, 200);
            p.fill(180, 200, 40);
            p.strokeWeight(3);
            p.stroke(180, 100, 240);
        
            if (coor < coordinates.length - 1) {
                p.line(coordinates[0][0], coordinates[0][1], coordinates[coor + 1][0], coordinates[coor + 1][1]);
                coor++
            } else {
                p.line(coordinates[0][0], coordinates[0][1], coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]);
            }
        }
    }
    
    p5instance = new p5(instance)
}

run()


document.querySelector("#start").value = `${terminals.start[0]}, ${terminals.start[1]}`;
document.querySelector("#end").value = `${terminals.end[0]}, ${terminals.end[1]}`;

function p5RunAgain() {
    p5instance.remove()
    run()
}

document.querySelector("#start").addEventListener("change", (e) => {
    let coordinateStr = e.target.value.split(",")
    let coordinate = coordinateStr.map((ele) => {
        return Number(ele.trim())
    })
    terminals.start = coordinate
    p5RunAgain()
})

document.querySelector("#end").addEventListener("change", (e) => {
    let coordinateStr = e.target.value.split(",")
    let coordinate = coordinateStr.map((ele) => {
        return Number(ele.trim())
    })
    terminals.end = coordinate
    p5RunAgain()
})