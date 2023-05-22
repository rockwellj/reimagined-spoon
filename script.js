let watts = 0;
let wattsPerClick = 1;
let wattsPerSecond = 0;

let clickTools = [
    {
        id: 'abacus',
        name: 'Abacus',
        wattsPerClick: 1,
        upgrades: [
            {
                id: 'abacus-beads',
                name: 'Abacus Beads',
                effect: 1, // Increase to 2 pW
                cost: 10
            },
            {
                id: 'material-upgrade',
                name: 'Material Upgrade',
                effect: 0.25, // Increase efficiency by 25%
                cost: 50
            },
            {
                id: 'abacus-design',
                name: 'Abacus Design',
                effect: 0.15, // Increase efficiency by 15%
                cost: 100
            }
        ]
    },
    {
        id: 'astrolabe',
        name: 'Astrolabe',
        wattsPerClick: 1,
        upgrades: [
            {
                id: 'astrolabe-graduations',
                name: 'Astrolabe Graduations',
                effect: 0.50, // Increase efficiency by 50%
                cost: 10
            },
            {
                id: 'star-chart-upgrade',
                name: 'Star Chart Upgrade',
                effect: 0.30, // Increase efficiency by 30%
                cost: 50
            },
            {
                id: 'astrolabe-materials',
                name: 'Astrolabe Materials',
                effect: 0.20, // Increase efficiency by 20%
                cost: 100
            }
        ]
    }
];

let automatedTools = [
    {
        id: 'quipu',
        name: 'Quipu',
        wattsPerSecond: 1,
        cost: 100,
        upgrades: [
            {
                id: 'quipu-knots',
                name: 'Quipu Knots',
                effect: 1, // Double the watt generation
                cost: 200
            },
            {
                id: 'color-coding',
                name: 'Color Coding',
                effect: 0.30, // Increase efficiency by 30%
                cost: 400
            },
            {
                id: 'advanced-knot-techniques',
                name: 'Advanced Knot Techniques',
                effect: 0.40, // Increase watt generation by 40%
                cost: 600
            }
        ]
    },
    {
        id: 'sundial',
        name: 'Sundial',
        wattsPerSecond: 1,
        cost: 100,
        upgrades: [
            // Add sundial upgrades here...
        ]
    },
    {
        id: 'water-clock',
        name: 'Water Clock',
        wattsPerSecond: 1,
        cost: 100,
        upgrades: [
            // Add water clock upgrades here...
        ]
    },
    {
        id: 'antikythera-mechanism',
        name: 'Antikythera Mechanism',
        wattsPerSecond: 1,
        cost: 100,
        upgrades: [
            // Add Antikythera Mechanism upgrades here...
        ]
    }
];


function displayTools(tool, container, isAutomated) {
    let button = document.createElement('button');
    button.id = tool.id;
    button.innerText = `${tool.name} (Cost: ${tool.cost}, Effect: +${tool.effect}/click)`;
    button.addEventListener('click', () => purchaseTool(tool, isAutomated));
    container.appendChild(button);

    for(let upgrade of tool.upgrades) {
        displayUpgrades(upgrade, container);
    }
}

function displayUpgrades(upgrade, container) {
    let button = document.createElement('button');
    button.id = upgrade.id;
    button.innerText = `${upgrade.name} (Cost: ${upgrade.cost}, Effect: +${upgrade.effect})`;
    button.addEventListener('click', () => purchaseUpgrade(upgrade));
    container.appendChild(button);
}

window.onload = () => {
    document.getElementById('generate-btn').addEventListener('click', generateWatt);

    let upgradeDiv = document.getElementById('upgrades');
    for(let tool of clickTools) {
        displayTools(tool, upgradeDiv, false);
    }

    let autoDiv = document.getElementById('automations');
    for(let tool of automatedTools) {
        displayTools(tool, autoDiv, true);
    }
};

function generateWatt() {
    watts += wattsPerClick;
    updateWattDisplay();
}

function purchaseTool(tool, isAutomated) {
    if(watts >= tool.cost) {
        watts -= tool.cost;
        if(isAutomated) {
            wattsPerSecond += tool.effect;
        } else {
            wattsPerClick += tool.effect;
        }
        updateWattDisplay();
    }
}

function purchaseUpgrade(upgrade) {
    if(watts >= upgrade.cost) {
        watts -= upgrade.cost;
        wattsPerClick += upgrade.effect;
        updateWattDisplay();
    }
}

function updateWattDisplay() {
    document.getElementById("watts").innerHTML = "Watts: " + watts;
}

setInterval(function() {
    watts += wattsPerSecond;
    updateWattDisplay();
}, 1000);
