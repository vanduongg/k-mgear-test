const express = require("express");
const Cart = require("../models/cartModel");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Create a new cart
app.post('/create', async (req, res)  => {
    const { idUser, idProduct, amount, status } = req.body;
    const existingCart = await Cart.findOne({ idProduct, idUser, status: "cart" });  
    if (existingCart) {
        return res.status(200).json({ message: 'Đã có trong giỏ hàng!' });
    }
    const newCart = new Cart({ idUser, idProduct, amount, status });
    newCart
        .save()
        .then(() => {
            res.status(200).json({ message: 'Thêm vào giỏ hàng thành công!' });
        })
        .catch(err => {
            res.status(404).json({ message: 'Lỗi giỏ hàng',err });
        });
});
app.put('/updateByIdUserStatus', async (req, res) => {
    try {
        const data = req.body; 
        const updatedCart = await Cart.findOneAndUpdate(
            {
            idUser: data.idUser,
            idProduct: data.idProduct,
            status: data.oldStatus},
            {
            status: data.newStatus,
            amount: data.amount})
        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart updated successfully!', 
                                status: 200, 
                                product: updatedCart,});
    } catch (error) {
        console.error('Error updating Cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/getAll', async (req, res) => {
    try {
        const carts = await Cart.find(); 
        res.status(200).json(carts);
    } catch (error) {
        console.log('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/getByIdUserStatus/:idUser/:status', async (req, res) => {
    try {
        
        const { idUser, status } = req.params;
        const carts = await Cart.find({ idUser: idUser, status: status });     
        if (!carts || carts.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(carts);
    } catch (error) {
        console.log('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Cart.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully!', status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = app;