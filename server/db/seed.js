const {
  Item,
  User,
  Order,
  OrderDetails,
  Review,
  Category
} = require('./models/index.js')
const db = require('./db.js')
var faker = require('faker')

let itemSeed = []
let userSeed = []
let orderSeed = []
let orderDetailSeed = []
let reviewSeed = []
let categorySeed = []
// const userSeed = new Array(10)
// const orderSeed = new Array(10)
// const reviewSeed = new Array(10)

for (let i = 0; i < 10; i++) {
  itemSeed.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    inventory: 10,
    //photo: faker.image.technics(70, 70, true),
    description: faker.lorem.sentence(),
    categoryId: Math.floor(Math.random() * 4) + 1
  })
}

for (let i = 0; i < 4; i++) {
  categorySeed.push({
    name: faker.commerce.department()
  })
}

for (let i = 0; i < 10; i++) {
  userSeed.push({
    email: faker.internet.email(),
    password: '123'
  })
}

const statusArray = ['inCart', 'Processing', 'Shipped', 'Delivered']

for (let i = 0; i < 6; i++) {
  orderSeed.push({
    submissionDate: faker.date.past(),
    status: statusArray[Math.floor(Math.random() * statusArray.length)],
    userId: Math.floor(i / 2) + 1
  })
}

for (let i = 0; i < 6; i++) {
  orderDetailSeed.push({
    priceAtPurchase: faker.commerce.price(),
    orderId: i + 1,
    itemId: i + 1
  })
}

for (let i = 0; i < 6; i++) {
  orderDetailSeed.push({
    priceAtPurchase: faker.commerce.price(),
    orderId: i + 1,
    itemId: i + 2
  })
}

for (let i = 0; i < 6; i++) {
  reviewSeed.push({
    submissionDate: faker.date.past(),
    rating: Math.floor(Math.random() * 5) + 1,
    content: faker.lorem.sentence(),
    userId: i + 1,
    itemId: i + 1
  })
}

for (let i = 0; i < 6; i++) {
  reviewSeed.push({
    submissionDate: faker.date.past(),
    rating: Math.floor(Math.random() * 5) + 1,
    content: faker.lorem.sentence(),
    userId: i + 1,
    itemId: i + 2
  })
}

const orderDetails = [
  {
    orderId: 1,
    itemId: 2
  },
  {
    orderId: 1,
    itemId: 1
  },
  {
    orderId: 2,
    itemId: 1
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await User.create({email: 'cody@email.com', password: '123', isAdmin: true})
    await Category.bulkCreate(categorySeed)
    await Item.bulkCreate(itemSeed)
    await User.bulkCreate(userSeed)
    await Order.bulkCreate(orderSeed)
    await OrderDetails.bulkCreate(orderDetailSeed)
    await Review.bulkCreate(reviewSeed)
  } catch (err) {
    console.log('Error seeding bulk file', err)
  }
}

seed()
  .then(() => {
    console.log('Seeding success!')
    db.close()
  })
  .catch(err => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })

module.exports = seed
