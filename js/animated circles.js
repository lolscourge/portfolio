const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize circles if window is resized
    initCircles();
});

class Circle {
    constructor(x, y, radius, dx, dy, initialSpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.initialSpeed = Math.sqrt(dx*dx + dy*dy);
    }

    collidesWith(otherCircle) {
        const distance = Math.sqrt((this.x - otherCircle.x) ** 2 + (this.y - otherCircle.y) ** 2);
        return distance <= this.radius + otherCircle.radius;
    }

    handleBounceWith(otherCircle) {
        let dx = this.x - otherCircle.x;
        let dy = this.y - otherCircle.y;
        
        let distance = Math.sqrt(dx*dx + dy*dy);
        let overlap = 0.5 * (distance - this.radius - otherCircle.radius);
        
        // Move current circle out of collision
        this.x -= overlap * (dx / distance);
        this.y -= overlap * (dy / distance);
        
        // Move the other circle out of collision
        otherCircle.x += overlap * (dx / distance);
        otherCircle.y += overlap * (dy / distance);
        
        // Swap velocities (this is a basic way of handling bounce between two circles)
        [this.dx, otherCircle.dx] = [otherCircle.dx, this.dx];
        [this.dy, otherCircle.dy] = [otherCircle.dy, this.dy];
    }

    setSpeed(dx, dy) {
        let speedMagnitude = Math.sqrt(dx*dx + dy*dy);
        if(speedMagnitude > this.initialSpeed) {
            let scale = this.initialSpeed / speedMagnitude;
            this.dx = dx * scale;
            this.dy = dy * scale;
        } else {
            this.dx = dx;
            this.dy = dy;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

let circleArray = [];

for (let i = 0; i < 5; i++) {
    let radius = 100;
    let x = Math.random() * (innerWidth - radius * 1) + radius;
    let y = Math.random() * (innerHeight - radius * 1) + radius;
    let dx = (Math.random() - 0.5) * 1.5; // Speed in x-direction
    let dy = (Math.random() - 0.5) * 1.5; // Speed in y-direction
    circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    // Check for collisions
    for (let i = 0; i < circleArray.length; i++) {
        for (let j = i + 1; j < circleArray.length; j++) {
            if (circleArray[i].collidesWith(circleArray[j])) {
                circleArray[i].handleBounceWith(circleArray[j]);
            }
        }
    }

    // Update circle positions
    for (let circle of circleArray) {
        circle.update();
    }
}

animate();

document.addEventListener('mousemove', (event) => {
    for (let circle of circleArray) {
        if (Math.abs(event.clientX - circle.x) < 50 && Math.abs(event.clientY - circle.y) < 50) {
            let newDx = (circle.x - event.clientX) * 0.05;
            let newDy = (circle.y - event.clientY) * 0.05;
            circle.setSpeed(newDx, newDy);
        }
    }
});