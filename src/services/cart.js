import readline from 'readline';

async function addItem(userCart, item) {
    userCart.push(item)
}

async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item) => item.name === name)

    if (index !== -1) {
        userCart.splice(index, 1)
    }
}

// Criação de uma interface readline para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function removeItem(userCart, index) {
    const deleteIndex = index - 1; // Se o usuário selecionar para excluir o 2, vai excluir o 1
    if (index >= 0 && index < userCart.length) {
        const item = userCart[deleteIndex];

        // Reduzir a quantidade do item
        item.quantity -= 1;

        // Verificar se a quantidade chega a zero
        if (item.quantity <= 0) {
            const confirmRemoval = await new Promise((resolve) => {
                rl.question(`O item "${item.name}" chegou a zero. Deseja removê-lo do carrinho? (s/sim) `, (answer) => {
                    resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim');
                });
            });

            if (confirmRemoval) {
                // Se o usuário confirmar, chama deleteItem
                await deleteItem(userCart, item.name);
                console.log(`O item "${item.name}" foi removido do carrinho.`);
            } else {
                console.log(`O item "${item.name}" foi mantido no carrinho.`);
            }
        }
    }
}

// Não se esqueça de fechar a interface readline ao final
function closeReadline() {
    rl.close();
}

async function displaycart(userCart) {
    console.log("\nShopee cart list: ")
    userCart.forEach((item, index) => {
        console.log(
            `${index + 1}.${item.name} - R$ ${item.price} 
            | ${item.quantity} item(ns) 
            | Subtotal: R$ ${item.subtotal()}\n`
        )
    })
}

async function calculateTotal(userCart) {
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
    console.log("Shopee Cart TOTAL IS: ")
    console.log(`🛒${result}`);
}

export {
    addItem,
    calculateTotal,
    deleteItem,
    removeItem,
    displaycart,
    closeReadline
}