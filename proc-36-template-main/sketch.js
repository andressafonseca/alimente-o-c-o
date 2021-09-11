var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime, lastFed, feed, addFood;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  if (lastFed>=12){
    text("last feed:  " + lastFeed %12 + "PM" , 350, 30)
  }else if (lastFeed == 0){
    text("last feed: 12 AM",350, 30);
  } else{
    text("last feed: " + lastFeed + "AM", 350, 30);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time]
    foodObj.updateFoodStock(foodObject.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      fedTime : hour()

    })
 var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
    
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
