function startCountdown(endTime) {
    function updateTimer() {
        let now = new Date().getTime();
        let timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            document.getElementById("timer").innerHTML = "Actie verlopen!";
            clearInterval(interval);
            return;
        }
        
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById("timer").innerHTML = `${days}d ${hours}u ${minutes}m ${seconds}s`;
    }

    updateTimer();
    let interval = setInterval(updateTimer, 1000);
}

let countdownDate = new Date().getTime() + (5 * 24 * 60 * 60 * 1000); 
startCountdown(countdownDate);
let scrollTopBtn = document.getElementById("scrollTopBtn");

        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        document.addEventListener("DOMContentLoaded", function () {
            const scrollToTopBtn = document.createElement("button");
            scrollToTopBtn.id = "scrollToTop";
            scrollToTopBtn.innerText = "⬆";
            document.body.appendChild(scrollToTopBtn);
        
            window.addEventListener("scroll", function () {
                if (window.scrollY > 300) {
                    scrollToTopBtn.style.display = "block";
                } else {
                    scrollToTopBtn.style.display = "none";
                }
            });
        
            scrollToTopBtn.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });
        
        document.addEventListener("DOMContentLoaded", function() {
            const popup = document.getElementById("popup");
            const closePopup = document.getElementById("closePopup");
            const spinButton = document.getElementById("spinButton");
            const canvas = document.getElementById("wheelCanvas");
            const ctx = canvas.getContext("2d");
        
            // Korting opties
            const options = [5, 10, 15, 20, 25, 30];
            let angle = 0;
            let spinning = false;
        
            // Teken het wiel
            function drawWheel() {
                const numOptions = options.length;
                const sliceAngle = (2 * Math.PI) / numOptions;
        
                for (let i = 0; i < numOptions; i++) {
                    ctx.beginPath();
                    ctx.moveTo(150, 150);
                    ctx.arc(150, 150, 150, sliceAngle * i, sliceAngle * (i + 1));
                    ctx.closePath();
                    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6600";
                    ctx.fill();
                    ctx.stroke();
        
                    // Tekst
                    ctx.fillStyle = "black";
                    ctx.font = "16px Arial";
                    ctx.fillText(options[i] + "%", 130 + Math.cos(sliceAngle * (i + 0.5)) * 100, 
                                 150 + Math.sin(sliceAngle * (i + 0.5)) * 100);
                }
            }
        
            drawWheel(); 
        
            
            spinButton.addEventListener("click", function() {
                if (spinning) return;
        
                spinning = true;
                let spins = Math.floor(Math.random() * 6) + 6;
                let targetAngle = (spins * 360) + (Math.random() * 360);
                
                let start = Date.now();
                let duration = 3000;
        
                function animate() {
                    let elapsed = Date.now() - start;
                    let progress = elapsed / duration;
                    let easing = progress < 1 ? progress * (2 - progress) : 1; 
        
                    angle = easing * targetAngle;
                    ctx.clearRect(0, 0, 300, 300);
                    ctx.save();
                    ctx.translate(150, 150);
                    ctx.rotate(angle * Math.PI / 180);
                    ctx.translate(-150, -150);
                    drawWheel();
                    ctx.restore();
        
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        spinning = false;
                        let wonIndex = Math.floor(((360 - (angle % 360)) / (360 / options.length)) % options.length);
                        let wonDiscount = options[wonIndex];
                        alert(" Gefeliciteerd! Je hebt " + wonDiscount + "% korting gewonnen!");
                    }
                }
        
                animate();
            });
        
           
            setTimeout(function() {
                popup.style.display = "block";
            }, 5000);
        
          
            closePopup.addEventListener("click", function() {
                popup.style.display = "none";
            });
        });
        
        document.getElementById("toonVakantiesBtn").addEventListener("click", function() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
        document.addEventListener("DOMContentLoaded", function() {
            const pollOptions = document.getElementById("poll-options");
        
          
            let randomNumbers = [
                Math.floor(Math.random() * 10) * 10 + 10000000, // Tussen 10M en 19M
                Math.floor(Math.random() * 10) * 10 + 20000000, // Tussen 20M en 29M
                Math.floor(Math.random() * 10) * 10 + 30000000, // Tussen 30M en 39M
                32000000 
            ];
        
           
            randomNumbers.sort(() => Math.random() - 0.5);
        
         
            randomNumbers.forEach(number => {
                let btn = document.createElement("button");
                btn.textContent = number.toLocaleString() + " toeristen";
                btn.classList.add("poll-btn");
                btn.onclick = function() {
                    if (number === 32000000) {
                        alert("✅ Correct! Ongeveer 32 miljoen toeristen bezoeken Tokyo per jaar.");
                    } else {
                        alert("❌ Fout! Het juiste antwoord is ongeveer 32 miljoen.");
                    }
                };
                pollOptions.appendChild(btn);
            });
        });

        window.onscroll = function() { updateProgressBar(); };

        function updateProgressBar() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let progress = (scrollTop / scrollHeight) * 100;
            
            document.getElementById("progress-bar").style.width = progress + "%";
        }
        document.addEventListener("DOMContentLoaded", function () {
            const toggleButton = document.getElementById("darkModeToggle");
            const body = document.body;
        
            
            if (localStorage.getItem("darkMode") === "enabled") {
                body.classList.add("dark-mode");
                toggleButton.textContent = "☀️ Light Mode";
            }
        
            toggleButton.addEventListener("click", function () {
                body.classList.toggle("dark-mode");
        
                if (body.classList.contains("dark-mode")) {
                    localStorage.setItem("darkMode", "enabled");
                    toggleButton.textContent = "☀️ Light Mode";
                } else {
                    localStorage.setItem("darkMode", "disabled");
                    toggleButton.textContent = "🌙 Dark Mode";
                }
            });
        });
        document.addEventListener("mousemove", function (e) {
            let follower = document.getElementById("follower");
            if (!follower) {
                follower = document.createElement("div");
                follower.id = "follower";
                follower.style.position = "absolute";
                follower.style.fontSize = "24px";
                follower.style.pointerEvents = "none"; 
                follower.style.userSelect = "none"; 
                follower.textContent = "✈️"; 
                document.body.appendChild(follower);
            }
            follower.style.left = e.pageX + "px";
            follower.style.top = e.pageY + "px";
        });
        const quotes = [
            "Reizen is het enige dat je koopt dat je rijker maakt. ",
            "De wereld is een boek en wie niet reist, leest slechts één pagina. ",
            "Pak je koffers, avontuur wacht! ",
            "Ga waar je je levend voelt. ",
            "Niet alle reizigers zijn verdwaald. "
        ];
        
        document.getElementById("quoteButton").addEventListener("click", function() {
            document.getElementById("quoteText").textContent = quotes[Math.floor(Math.random() * quotes.length)];
        });
        function createStar() {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = Math.random() * 100 + "vw";
            star.style.animationDuration = Math.random() * 2 + 2 + "s"; 
            document.body.appendChild(star);
        
            setTimeout(() => {
                star.remove(); 
            }, 4000);
        }
        setInterval(createStar, 300);
        
                
        
                