const remove = document.getElementsByClassName("remove");
const addBtn = document.getElementsByClassName("addBtn");
removing();
qtyChanged();
addTocart();

// functions
function removing() {
  for (let i = 0; i < remove.length; i++) {
    button = remove[i];
    button.addEventListener("click", (e) => {
      clickedBtn = e.target;
      clickedBtn.parentElement.parentElement.remove();
      TotalUpdate();
    });
  }
}

function TotalUpdate() {
  let cart = document.getElementsByClassName("cart")[0];
  let rows = cart.getElementsByClassName("cart-items");
  var total = 0;
  for (let i = 0; i < rows.length; i++) {
    row = rows[i];
    let priceElem = row.getElementsByClassName("prices")[0].innerText;
    let qtyElem = row.getElementsByClassName("qty")[0].value;
    let price = parseFloat(priceElem.replace("$", ""));
    total = total + price * qtyElem;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("totals")[0].innerText = "$" + total;
}

function qtyChanged() {
  const qtyElm = document.getElementsByClassName("qty");
  for (let i = 0; i < qtyElm.length; i++) {
    qty = qtyElm[i];
    qty.addEventListener("input", (e) => {
      clickedQty = e.target;
      if (clickedQty.value <= 0 || clickedQty.value == isNaN) {
        clickedQty.value = 1;
      }
      TotalUpdate();
    });
  }
}

function addTocart() {
  for (let i = 0; i < addBtn.length; i++) {
    button = addBtn[i];
    button.addEventListener("click", (e) => {
      clickedBtn = e.target;
      var parent = clickedBtn.parentElement.parentElement;
      var itemImg = parent.getElementsByClassName("infoimg")[0].src;
      var itemInfo = parent.getElementsByClassName("info")[0].innerText;
      var itemPrice = parent.getElementsByClassName("itemPrice")[0].innerText;
      cartItemsAdd(itemInfo, itemImg, itemPrice);
    });
  }
}

function cartItemsAdd(itemInfo, itemImg, itemPrice) {
  const cart = document.getElementsByClassName("itemss")[0];
  const cartRow = document.createElement("div");

  cart.appendChild(cartRow);

  cartRow.innerHTML = `         <div class="products">
          <div class="cart-items"><div class="img"><img src=${itemImg} alt="" />
        <div class="infos">${itemInfo}</div> 
        </div>
          
             <div class="prices">${itemPrice}</div>
          <div class="cart-qty"><input value="1" type="number" class="qty"></div>
          <button class="remove">Remove</button>
              </div>
              
      </div>`;

  qtyChanged();
  removing();
  TotalUpdate();
}
