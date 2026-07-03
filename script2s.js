// 🌟 YAHAN APNA SEQUENCE SET KAREIN 🌟
let cardSequence = [4, 2, 1, 3]; 

let cardNames = {
    1: "Camera Card 📸",
    2: "Letter Card 💌",
    3: "Gift Card 🎁",
    4: "Buke Card 💐"
};

// 🌟 AUTOMATIC 3D POPUP MAKER 🌟
function create3DAlert() {
    if(document.getElementById('customAlert')) return; 
    
    let style = document.createElement('style');
    style.innerHTML = `
        #customAlert { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 9999; opacity: 0; visibility: hidden; transition: 0.4s; }
        #customAlert.show { opacity: 1; visibility: visible; }
        .alert-box { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); padding: 35px 25px; border-radius: 30px; border: 2px solid rgba(255, 105, 180, 0.5); box-shadow: 0 15px 35px rgba(255, 105, 180, 0.4); text-align: center; color: white; font-family: 'Poppins', sans-serif; width: 80%; max-width: 320px; transition: 0.4s; }
        .alert-btn { background: transparent; border: 2px solid #ff69b4; padding: 10px 30px; color: #ff69b4; border-radius: 30px; cursor: pointer; transition: 0.3s; }
        .alert-btn:hover { background: #ff69b4; color: white; }
    `;
    document.head.appendChild(style);

    let modal = document.createElement('div');
    modal.id = 'customAlert';
    modal.innerHTML = `
        <div class="alert-box">
            <h2>Oops Beautiful! 🙈</h2>
            <p id="alertMessage"></p>
            <button class="alert-btn" onclick="document.getElementById('customAlert').classList.remove('show')">Okay 💖</button>
        </div>
    `;
    document.body.appendChild(modal);
}
create3DAlert();

// 🌟 AUTOMATIC PERMANENT REPLAY BUTTON 🌟
function showReplayButtonIfCompleted() {
    // Agar button pehle se hai toh dobara nahi banayega
    if (document.getElementById('replayMomentsBtn')) return;

    let isCompleted = localStorage.getItem('sequenceCompleted') === 'true';
    
    // Agar sequence pura ho chuka hai, toh floating button dikhao
    if (isCompleted) {
        let replayBtn = document.createElement('button');
        replayBtn.id = 'replayMomentsBtn';
        replayBtn.innerHTML = 'Replay All Moments 🔄';
        
        // Button ki sundar CSS styling (Screen ke bottom me fixed rahega)
        replayBtn.style.cssText = `
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(255, 105, 180, 0.5);
            cursor: pointer;
            z-index: 10000;
        `;
        
        // Button click hone par sab reset karega aur main detector page (index.html) par bhej dega
        replayBtn.onclick = function() {
            localStorage.removeItem('stepCounter');
            localStorage.removeItem('sequenceCompleted');
            window.location.href = "index.html"; 
        };
        
        document.body.appendChild(replayBtn);
    }
}
// Page load hote hi check karega ki button dikhana hai ya nahi
showReplayButtonIfCompleted();

// 🌟 MAIN SURPRISE FUNCTION 🌟
function openSurprise(cardNumber) {
    // 1. Storage check 
    let currentStep = parseInt(localStorage.getItem('stepCounter')) || 0;
    let isCompleted = localStorage.getItem('sequenceCompleted') === 'true';

    // 2. Logic: Agar sequence pura nahi hua, toh hi check karo
    if (!isCompleted) {
        if (cardNumber !== cardSequence[currentStep]) {
            let correctCard = cardNames[cardSequence[currentStep]]; 
            document.getElementById('alertMessage').innerHTML = "Pehle <b>" + correctCard + "</b> open karo! ✨";
            document.getElementById('customAlert').classList.add('show');
            return; 
        }

        currentStep++;
        localStorage.setItem('stepCounter', currentStep);

        // Sequence pura hone par flag true kar do
        if (currentStep >= cardSequence.length) {
            localStorage.setItem('sequenceCompleted', 'true');
            showReplayButtonIfCompleted(); // Turant button dikhane ke liye call kar diya
        }
    }

    // 3. UI Animation (Glow)
    let cards = document.querySelectorAll('.card');
    let clickedCard = cards[cardNumber - 1];
    if(clickedCard) {
        cards.forEach(c => c.classList.remove('glow-1', 'glow-2', 'glow-3', 'glow-4'));
        clickedCard.classList.add(`glow-${cardNumber}`);
    }

    // 4. Bulletproof Device Detection (Isme touch screen bhi check ho rha hai)
    let isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let isSmallScreen = window.innerWidth <= 768;
    let isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    let isMobile = isMobileUA || isSmallScreen || (isTouchDevice && window.innerWidth <= 1024);

    // 5. Redirection (Yahan se saare galat paths `../harshlove/` hata diye hain)
    setTimeout(() => {
        let paths = {
            1: { mobile: "mobile7.html", desktop: "pic.html" },
            2: { mobile: "mobile4.html", desktop: "hd.html" },
            3: { mobile: "music.html", desktop: "music.html" },
            4: { mobile: "mobile5.html", desktop: "buke.html" }
        };
        
        let target = paths[cardNumber];
        window.location.href = isMobile ? target.mobile : target.desktop;
    }, 600); 
}
