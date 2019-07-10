
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
function printReceipt(totalPrice, FoodInfos, halfPriceFood, firstPreference, secondPreference){
  let receipt = `============= 订餐明细 =============\n`
  FoodInfos.forEach((value) => {
    let oneFoodPrice = value.price * value.count;
    totalPrice += oneFoodPrice;
    receipt += `${value.name} x ${value.count} = ${parseInt(oneFoodPrice)}元\n`

    if(value.isHalfPriceFood){
      halfPriceFood.push(value.name);
      firstPreference += value.price / 2;
    }
  });

  if(totalPrice > 30){
    secondPreference = 6;
    receipt += `-----------------------------------\n`;
    receipt += `使用优惠:\n`;
    if(firstPreference >= secondPreference) {
      totalPrice -= firstPreference;
      receipt += `指定菜品半价(${halfPriceFood.join('，')})，省${firstPreference}元\n`;
    }else{
      totalPrice -= 6;
      receipt += `满30减6元，省6元\n`;
    }
  }else{
    if(firstPreference != 0){
      totalPrice -= firstPreference;
      receipt += `-----------------------------------
使用优惠:
指定菜品半价(${halfPriceFood.join('，')})，省${firstPreference}元\n`;
    }
  }

  receipt += `-----------------------------------
总计：${parseInt(totalPrice)}元
===================================\n`;
  return receipt;
}

// 12min
function bestCharge(selectedItems) {
  let totalPrice = 0;
  let firstPreference = 0;
  let secondPreference = 0;
  let halfPriceFood = [];
  let allHalfPriceFood = getHalfPriceFood();
  let itemFoods = [];
  getItemFoods(selectedItems, allHalfPriceFood, itemFoods);
  let receipt = printReceipt(totalPrice, itemFoods, halfPriceFood, firstPreference, secondPreference);
  return receipt;
}

// 25min
function getItemFoods(selectedItems, allHalfPriceFood, FoodInfos){
  var allFood = loadAllItems();
  selectedItems.map((value) => {
    let items = value.split("x");
    allFood.forEach(elem => {
      if(elem.id == items[0].trim()){
        FoodInfos.push({
          name: elem.name,
          price: elem.price,
          count: items[1].trim(),
          isHalfPriceFood: allHalfPriceFood[0].items.includes((items[0].trim()))
        })
      }
    });
  })
}