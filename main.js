const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
let numPoint = 40;
let arrPoint = [];


const beginGame = document.getElementById("Manhinhchinh")
const inGame = document.getElementById("inGame")

const btn_start = document.getElementById("StartGame")
const input = document.getElementById("input")
inGame.style.display = "none";
const btn_Thoat = document.getElementById("btn_Thoat")
const endGame = document.getElementById("endGame")
endGame.style.display = "none"
const btn_restart = document.getElementById("btn_restart")
const xinchao = document.getElementById("xinchao")


class Avatar {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.score = 0;
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    draw(width, color) {
        c.beginPath();
        c.lineWidth = width;
        c.fillStyle = this.color;
        c.strokeStyle = color;

        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.fill();
        c.closePath();

    }

    drawScore() {
        c.beginPath();
        c.font = "30px Arial"
        c.fillStyle = "red";
        c.fillText("Score : " + this.score, 30, canvas.height - 30);
        c.closePath();
    }

    update() {
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x *= -1;
        }

        // Kiểm tra va chạm của bóng với thành dưới và thành trên của canvas
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y *= -1;
        }

    }

    vacham(point) {
        if (Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2) < this.radius + point.radius) {
            return true;
        } else {
            return false;
        }
    }

}


const ball = new Avatar(100, 100, 20, "yellow");
ball.draw(1, "black")
ball.drawScore();


function creatX() {
    return Math.floor(Math.random() * canvas.width)
}

function creatY() {
    return Math.floor(Math.random() * canvas.height)
}


for (let i = 0; i < numPoint; i++) {
    arrPoint.push(new Avatar(creatX(), creatY(), 7, "orange"));
    arrPoint[i].draw(1, "black");
}



function updateGame() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    arrPoint.forEach((ava, index) => {
        ava.draw(3, '#696969')
        if (ava.vacham(ball)) {
            arrPoint.splice(index, 1);
            ball.score++;
        }
    });
    if (ball.score == numPoint) {
        inGame.style.display = "none";
        endGame.style.display = "block"
    }

    ball.update();
    ball.draw(5, '#696969');
    ball.drawScore();
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        ball.velocity.x = -2;
        ball.velocity.y = 0;
    }
    if (event.keyCode == 38) {
        ball.velocity.x = 0;
        ball.velocity.y = -2;
    }
    if (event.keyCode == 39) {
        ball.velocity.x = 2;
        ball.velocity.y = 0;
    }
    if (event.keyCode == 40) {
        ball.velocity.x = 0;
        ball.velocity.y = 2;
    }

    if (event.keyCode == 13) {
        ball.velocity.x = 0;
        ball.velocity.y = 0;
    }
})

function animate() {
    requestAnimationFrame(animate);
    updateGame();
}
animate();

let inputValue;
btn_start.addEventListener("click", function() {
    inputValue = input.value;
    if (inputValue == "") {
        alert("Tên người chơi không được để trống");
        return;
    }
    xinchao.innerHTML += ` ${inputValue}`

    beginGame.style.display = "none";
    endGame.style.display = "none";
    inGame.style.display = "block";
})

btn_Thoat.addEventListener('click', function() {
    location.reload();
})


btn_restart.addEventListener('click', function() {
    for (let i = 0; i < numPoint; i++) {
        arrPoint.push(new Avatar(creatX(), creatY(), 7, "orange"));
        arrPoint[i].draw(1, "black");
    }
    ball.score = 0;
    beginGame.style.display = "none";
    endGame.style.display = "none";
    inGame.style.display = "block";
})

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        inputValue = input.value;
        if (inputValue == "") {
            alert("Tên người chơi không được để trống");
            return;
        }
        xinchao.innerHTML += ` ${inputValue}`

        beginGame.style.display = "none";
        endGame.style.display = "none";
        inGame.style.display = "block";
    }
})