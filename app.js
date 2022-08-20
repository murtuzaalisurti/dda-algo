const terminals = {
    start: [0, 0],
    end: [90, 120]
}
const coordinates = [];

function dda(terminals) {
    let dx = terminals.end[0] - terminals.start[0]
    let dy = terminals.end[1] - terminals.start[1]
    let len = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let xIncrement = dx/len
    let yIncrement = dy/len
    yIncrement

    let X = terminals.start[0]
    let Y = terminals.start[1]
    for(let i = 0; i <= len; i++) {
        // console.log(Math.round(X), Math.round(Y))
        coordinates.push([Math.round(X), Math.round(Y), 0])
        X += xIncrement
        Y += yIncrement
    }
}

dda(terminals)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 1)
document.body.appendChild( renderer.domElement );

const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const points = [];
for(let j = 0; j < coordinates.length; j++) {
    points.push(new THREE.Vector3(coordinates[j][0], coordinates[j][1], coordinates[j][2]))
}
console.log(points)
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(terminals.start[0], terminals.start[1], 0), (new THREE.Vector3(terminals.end[0], terminals.end[1], 0))]);
const line = new THREE.Line(geometry, material);

scene.add( line );
renderer.render( scene, camera );