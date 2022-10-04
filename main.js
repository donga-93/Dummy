var myArray = [
    {
      'name':'Michael', 
      'price':'39.42', 
      'birthdate':'11/10/1989'
    },
    {
      'name':'Mila', 
      'price':'31.93', 
      'birthdate':'10/1/1989'
    },
    {
     'name':'Paul',
     'price':'49.44',
     'birthdate':'10/14/1990'
    },
    {
    'name':'Dennis', 
    'price':'65.38', 
    'birthdate':'11/29/1993'
    },
    {
    'name':'Tim', 
    'price':'27.21', 
    'birthdate':'3/12/1991'
    },
    {
    'name':'Erik', 
    'price':'73.05', 
    'birthdate':'10/31/1995'
  },
]

$('#search-input').on('keyup',function() {
  var value = $(this).val();
  console.log('Value:',value)
  var data = searchTable(value,myArray)
  buildTable(data);
})

buildTable(myArray)

function searchTable(value, data) {
  var filteredData = []

  for(var i = 0; i < data.length; i++) {
    value = value.toLowerCase()
    var name = data[i].name.toLowerCase()

    if(name.includes(value)) {
      filteredData.push(data[i])
    }
  }
  return filteredData
}

 $('th').on('click', function(){
     var column = $(this).data('colname')
     var order = $(this).data('order')
     var text = $(this).html()
     text = text.substring(0, text.length - 1);
     
     if (order == 'desc'){
        myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
        $(this).data("order","asc");
        text += '&#9660'
     }else{
        myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
        $(this).data("order","desc");
        text += '&#9650'
     }

    $(this).html(text)
    buildTable(myArray)
    })

function buildTable(data){
    var table = document.getElementById('myTable')
    table.innerHTML = ''
    for (var i = 0; i < data.length; i++){
        var colname = `name-${i}`
        var colage = `price-${i}`

        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].price}₾</td>
                        <td><button onclick="toggle(this)" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-shopping-cart"></span></button></td>
                   </tr>`
        table.innerHTML += row
    }
}

function toggle(e) {
  let txt = e.innerHTML;
  e.innerHTML = txt == `<span onclick="decrement()" class="glyphicon glyphicon-ok">ADDED</span> `
   ? `<span  class="glyphicon glyphicon-shopping-cart"></span>`
    : `<span onclick="decrement()" class="glyphicon glyphicon-ok">ADDED</span> `;
}

document.addEventListener("click",function(e){
   let btn = e.target;
   if(btn.className.includes("glyphicon glyphicon-shopping-cart")){
    plus()
    console.log(i);
   }
   else if(btn.className.includes("glyphicon glyphicon-ok")){
    minus()
    console.log(i);
   }
});

var i=0;
const plus = function(){
    i += 1;
    document.getElementById("count").innerText = i;
}
const minus = function(){
    i -= 1;
    document.getElementById("count").innerText = i;
}

function decrement() {
  console.log('Click')
}

let min_price = 0;
let max_price = 100;

$("#min-price").on("change mousemove", function () {
  min_price = parseInt($("#min-price").val());
  $("#min-price-txt").text("$" + min_price);
  showItemsFiltered();
});

$("#max-price").on("change mousemove", function () {
  max_price = parseInt($("#max-price").val());
  $("#max-price-txt").text("$" + max_price);
  showItemsFiltered();
});

function showItemsFiltered() {
  //Default grid to show all items on page load in
  $("#myTable").empty();
  for (let i = 0; i < myArray.length; i++) {
    //Go through the items but only show items that have size from show_sizes_array
    if (
      myArray[i]["price"] <= max_price &&
      myArray[i]["price"] >= min_price
    ) {
      let item_content =
      `<tr>
                        <td>${myArray[i].name}</td>
                        <td>${myArray[i].price}₾</td>
                        <td><button onclick="toggle(this)" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-shopping-cart"></span></button></td>
                   </tr>`;
      $("#myTable").append(item_content); //Display in grid
    }
  }
}