let coins = 0; // Player's current coin count
let goods = {
    bread: 0,
    cake: 0,
    cookie: 0,
}; // Object to track produced goods

let bakers = 0; // Number of bakers hired
let cashiers = 0; // Number of cashiers hired
let customers = 0; // Number of customers served

// Production rates and selling prices for baked goods
const bakedGoods = {
    bread: { productionRate: 1, sellingPrice: 2 },
    cake: { productionRate: 0.5, sellingPrice: 5 },
    cookie: { productionRate: 1.5, sellingPrice: 1.5 },
};

// Recipe management
const totalRecipes = 50;
const availableRecipes = generateRandomRecipeNames(); // Function to generate random recipe names
let unlockedRecipes = []; // Array to hold unlocked recipes

// Get display elements
const coinsDisplay = document.getElementById('coins');
const goodsStatDisplay = document.getElementById('goods-stat'); // Single goods stat display
const customersDisplay = document.getElementById('customers');

// Function to update total goods count
const updateTotalGoods = () => {
    const totalGoods = goods.bread + goods.cake + goods.cookie;
    goodsStatDisplay.textContent = `Goods: ${totalGoods}`; // Update single goods display
};

// Produce baked goods functions
const produceBread = () => {
    if (bakers > 0) {
        const productionAmount = Math.floor(bakedGoods.bread.productionRate * bakers);
        goods.bread += productionAmount; // Increase bread count based on bakers
        updateTotalGoods(); // Update the total goods display
    } else {
        showAlert("You need to hire at least one baker to produce bread!");
    }
};

const produceCake = () => {
    if (bakers > 0) {
        const productionAmount = Math.floor(bakedGoods.cake.productionRate * bakers);
        goods.cake += productionAmount; // Increase cake count based on bakers
        updateTotalGoods(); // Update the total goods display
    } else {
        showAlert("You need to hire at least one baker to produce cake!");
    }
};

const produceCookie = () => {
    if (bakers > 0) {
        const productionAmount = Math.floor(bakedGoods.cookie.productionRate * bakers);
        goods.cookie += productionAmount; // Increase cookie count based on bakers
        updateTotalGoods(); // Update the total goods display
    } else {
        showAlert("You need to hire at least one baker to produce cookies!");
    }
};

// Sell goods function
const sellGoods = () => {
    const totalGoods = goods.bread + goods.cake + goods.cookie; // Total goods available
    const sellableGoods = Math.min(totalGoods, customers); // Maximum goods that can be sold

    if (sellableGoods > 0) {
        // Calculate total earnings from selling the goods
        const totalEarnings = (goods.bread * bakedGoods.bread.sellingPrice) +
                              (goods.cake * bakedGoods.cake.sellingPrice) +
                              (goods.cookie * bakedGoods.cookie.sellingPrice);
        
        coins += totalEarnings; // Update coins with total earnings
        // Reset goods sold to zero after selling
        goods.bread = Math.max(0, goods.bread - sellableGoods);
        goods.cake = Math.max(0, goods.cake - sellableGoods);
        goods.cookie = Math.max(0, goods.cookie - sellableGoods);

        updateDisplays(); // Refresh the display
    } else {
        showAlert("No goods available to sell!");
    }
};

// Hire Baker
const hireBaker = () => {
    if (coins >= 10) {
        coins -= 10; // Deduct cost from coins
        bakers++; // Increase the baker count
        showAlert(`Hired a baker! Total bakers: ${bakers}`);
        updateDisplays();
    } else {
        showAlert("Not enough coins to hire a baker!");
    }
};

// Hire Cashier
const hireCashier = () => {
    if (coins >= 15) {
        coins -= 15; // Deduct cost from coins
        cashiers++; // Increase the cashier count
        customers += 5; // Increase customers by 5 with each cashier hired
        showAlert(`Hired a cashier! Total cashiers: ${cashiers}`);
        updateDisplays();
    } else {
        showAlert("Not enough coins to hire a cashier!");
    }
};

// Upgrade Bakery
const upgradeBakery = () => {
    if (coins >= 10) {
        coins -= 10; // Deduct cost from coins
        showAlert("Bakery upgraded!");
        updateDisplays();
    } else {
        showAlert("Not enough coins to upgrade!");
    }
};

// Research New Recipes
const researchRecipes = () => {
    if (coins >= 15) {
        coins -= 15; // Deduct cost from coins
        const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
        
        if (!unlockedRecipes.includes(randomRecipe)) {
            unlockedRecipes.push(randomRecipe); // Add new recipe to unlocked recipes
            showAlert(`New recipe unlocked: ${randomRecipe}`);
        } else {
            showAlert("You already unlocked that recipe!");
        }

        updateDisplays();
    } else {
        showAlert("Not enough coins for research!");
    }
};

// Update display elements
const updateDisplays = () => {
    coinsDisplay.textContent = `Coins: ${Math.floor(coins)}`;
    updateTotalGoods(); // Update single goods display
    customersDisplay.textContent = `Customers: ${Math.floor(customers)}`;
};

// Custom alert function
const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    // Automatically remove the alert after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 3000);
};

// Event Listeners
document.getElementById('hire-baker').addEventListener('click', hireBaker);
document.getElementById('hire-cashier').addEventListener('click', hireCashier);
document.getElementById('upgrade').addEventListener('click', upgradeBakery);
document.getElementById('research').addEventListener('click', researchRecipes);
document.getElementById('produce-bread').addEventListener('click', produceBread);
document.getElementById('produce-cake').addEventListener('click', produceCake);
document.getElementById('produce-cookie').addEventListener('click', produceCookie);
document.getElementById('sell-goods').addEventListener('click', sellGoods);

// Game loop for auto production and selling
setInterval(() => {
    if (bakers > 0) { // Only produce if there are bakers
        produceBread();
        produceCake();
        produceCookie();
    }
    sellGoods(); // Automatically sell goods
}, 2000); // Adjust the interval as needed

// Initialize display
updateDisplays();

// Function to generate random recipe names
function generateRandomRecipeNames() {
    const randomNames = [];
    const baseNames = ["Chocolate", "Vanilla", "Strawberry", "Blueberry", "Red Velvet", "Lemon", "Carrot", "Pumpkin", "Peanut Butter", "Coconut", "Almond", "Raspberry", "Mango", "Hazelnut", "Mint", "Cinnamon", "Nutmeg", "Ginger", "Pistachio", "Cherry"];
    
    while (randomNames.length < totalRecipes) {
        const randomName = baseNames[Math.floor(Math.random() * baseNames.length)];
        if (!randomNames.includes(randomName)) {
            randomNames.push(randomName);
        }
    }
    return randomNames;
}
