const { Category, Product, User, Favorite, Cart, Order, OrderItem, Review } = require('../model')


module.exports = () => {

    //categroy vs product
    Category.hasMany(Product, { foreignKey: 'categoryId' });
    Product.belongsTo(Category, { foreignKey: 'categoryId' });

    //user vs favorite
    User.hasMany(Favorite, { foreignKey: 'userId' })
    Favorite.belongsTo(User, { foreignKey: 'userId' })

    //product vs favorite
    Favorite.belongsTo(Product, { foreignKey: 'productId' })
    Product.hasMany(Favorite, { foreignKey: 'productId' })

    //user vs cart
    User.hasMany(Cart, { foreignKey: 'userId' })
    Cart.belongsTo(User, { foreignKey: 'userId' })

    //product vs cart
    Product.hasMany(Cart, { foreignKey: 'productId' })
    Cart.belongsTo(Product, { foreignKey: 'productId' })

    //user vs order
    User.hasMany(Order, { foreignKey: 'userId' })
    Order.belongsTo(User, { foreignKey: 'userId' })

    //order vs product
    Order.belongsToMany(Product, { through: OrderItem })
    Product.belongsToMany(Order, { through: OrderItem })

    //product vs review
    Product.hasMany(Review, { foreignKey: 'productId' })
    Review.belongsTo(Product, { foreignKey: 'productId' })

    //review vs user
    Review.belongsTo(User, { foreignKey: 'userId' })
    User.hasMany(Review, { foreignKey: 'userId' })
}

