export interface Cart{
    cartId ?: Number,
    productId : Number,
    productName : String,
    productDesc: String,
    userId : Number,
    price : Number,
    quantity : Number,
    totalPrice : Number,
    presentInCart: boolean
}
