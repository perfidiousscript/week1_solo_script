// ! ! !
// Three Bugs
//I found three bugs: 

//BUG1 is at line 20 where the function was being called on 
//array, but not on the index of array, 

//BUG2 is at line 84 where basepercent was being subtracted
//from one, making things negative.

//BUG3 was at line 56 where adding floating point decimals was giving wonky results.
//I ran the sum through two fixed to truncate it at 2 decimals.


var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
  //BUG 1: calculateSTI is being called on array, not array[i]. 
  //Therefore the function is not looping through array. This is fixed by turning array into
  //array[i]
	array[i] = calculateSTI(array[i]);
 	newEl = document.createElement('li');
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];

  console.log(newArray);

  newArray[0] = array[0];

  var employeeNumber = array[1];
  var baseSalary = array[2];
  var reviewScore = array[3];
  
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }
  console.log("bonus is: ", bonus)
  newArray[1] = bonus;

//console.log(newArray);
//BUG3: Here the addition of floating point decimals was getting surreal to I jued
//'toFixed() to truncate things' 
  newArray[2] = (baseSalary * (1.0 + bonus)).toFixed(2);

//console.log(newArray);

  newArray[3] = baseSalary * bonus;

//console.log(newArray);

  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}


function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  //BUG 2: Here 'basePercent - 1' throws things off (made basePercent negative). 
  //I fixed this by removing the '- 1'
  console.log("base percent: ", basePercent)
  return basePercent// - 1;
}



function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  console.log("yearAdjustment: ",yearAdjustment);
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  console.log("incomeAdjustment: ", incomeAdjustment);
  return incomeAdjustment;
}