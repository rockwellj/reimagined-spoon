let watts = 0;
let wattsPerClick = 1;
let wattsPerSecond = 0;

// Define some upgrades
let upgrades = [
    { id: 'upgrade1', name: 'Upgrade 1', cost: 10, effect: 1 },
    { id: 'upgrade2', name: 'Upgrade 2', cost: 50, effect: 5 }
];

// Define some automations
let automations = [
    { id: 'auto1', name: 'Automation 1', cost: 100, effect: 1 }
];

window.onload = () => {
    document.getElementById('generate-btn').addEventListener('click', generateWatt);

    // Display upgrades
    let upgradeDiv = document.getElementById('upgrades');
    for(let upgrade of upgrades) {
        let button = document.createElement('button');
        button.id = upgrade.id;
        button.innerText = `${upgrade.name} (Cost: ${upgrade.cost}, Effect: +${upgrade.effect}/click)`;
        button.addEventListener('click', () => purchaseUpgrade(upgrade));
        upgradeDiv.appendChild(button);
    }

    // Display automations
    let autoDiv = document.getElementById('automations');
    for(let automation of automations) {
        let button = document.createElement('button');
        button.id = automation.id;
        button.innerText = `${automation.name} (Cost: ${automation.cost}, Effect: +${automation.effect}/second)`;
        button.addEventListener('click', () => purchaseAutomation(automation));
        autoDiv.appendChild(button);
    }
}

function generateWatt() {
    watts += wattsPerClick;
    updateWattDisplay();
}

function purchaseUpgrade(upgrade) {
    if(watts >= upgrade.cost) {
        watts -= upgrade.cost;
        wattsPerClick += upgrade.effect;
        updateWattDisplay();
    }
}

function purchaseAutomation(automation) {
    if(watts >= automation.cost) {
        watts -= automation.cost;
        wattsPerSecond += automation.effect;
        updateWattDisplay();
    }
}

function updateWattDisplay() {
    document.getElementById("watts").innerHTML = "Watts: " + watts;
}

// Every second, generate watts automatically
setInterval(function(){
    watts += wattsPerSecond;
    updateWattDisplay();
}, 1000);
