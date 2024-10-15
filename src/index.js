import createItem from "./services/item.js"
import * as cartService from "./services/cart.js"
import readline from 'readline';

// Criação da interface readline para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const myCart = [];
    const myWishList = [];
    console.log("Welcome to your Shopee Cart!");

    const item1 = await createItem("fone com fio", 20.99, 1);
    const item2 = await createItem("mouse", 39.99, 3);

    await cartService.addItem(myCart, item1);
    await cartService.addItem(myCart, item2);

    await cartService.removeItem(myCart, 1);


    await cartService.displaycart(myCart);
    await cartService.calculateTotal(myCart);

    // Fechar a interface readline após as operações
    rl.close();
}
main();
