
// 6min
function getHalfPriceFood(){
  const allPromotions = loadPromotions();
  return allPromotions.filter((value) => {
    if(value.type = '指定菜品半价'){
      return value.items
    }
  });
}

// 27min
function printReceipt(totalPrice, itemFoods, halfPriceFood, firstPreference, secondPreference){
  let receipt = `============= 订餐明细 =============
`
  itemFoods.forEach((value) => {
    let foodPrice = value.price * value.count;
    totalPrice += foodPrice;
    receipt += `${value.name} x ${value.count} = ${parseInt(foodPrice)}元
`
    if(value.isHalfPriceFood){
      halfPriceFood.push(value.name);
      firstPreference += value.price / 2;
    }
  });

  if(totalPrice > 30){
    secondPreference = 6;
    receipt += `-----------------------------------
使用优惠:
`;
    if(firstPreference >= secondPreference) {
      totalPrice -= firstPreference;
      receipt += `指定菜品半价(${halfPriceFood.join('，')})，省${firstPreference}元
`;
    }else{
      totalPrice -= 6;
      receipt += `满30减6元，省6元
`;
    }
  }else{
    if(firstPreference != 0){
      totalPrice -= firstPreference;
      receipt += `-----------------------------------
使用优惠:
指定菜品半价(${halfPriceFood.join('，')})，省${firstPreference}元
`;
    }
  }

  receipt += `-----------------------------------
总计：${parseInt(totalPrice)}元
===================================
`;
  return receipt;
}

// 12min
function bestCharge(selectedItems) {
  let totalPrice = 0;
  let halfPriceFood = [];
  let allHalfPriceFood = getHalfPriceFood();
  let firstPreference = 0;
  let secondPreference = 0;
  let itemFoods = [];
  getItemFoods(selectedItems, allHalfPriceFood, itemFoods);
  let receipt = printReceipt(totalPrice, itemFoods, halfPriceFood, firstPreference, secondPreference);
  return receipt;
}

// 25min
function getItemFoods(selectedItems, allHalfPriceFood, itemFoods){
  var allFood = loadAllItems();
  selectedItems.map((value) => {
    let items = value.split("x");
    allFood.forEach(element => {
      if(element.id == items[0].trim()){
        itemFoods.push({
          name : element.name,
          price : element.price,
          count : items[1].trim(),
          isHalfPriceFood : allHalfPriceFood[0].items.includes((items[0].trim()))
        })
      }
    });
  })
}
