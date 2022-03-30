/**THINGS TO FIX
	Counter DIV removes styling from border after removal of items (mobile/desktop)
	Combine cartDisplay() to use both Mobile and Desktop
	Add EventListener for Desktop and Mobile when user clicks/touches out of cart to fire closeDisplay()
**/

const items = [];
var inc = 0;
function addToCart(e){										//FUNCTION adds number to CART COUNTER
	
	let el_add  = document.getElementById('counter');					//get id for counter element
	
	if(inc < 10){										//only allow 10 items to be added to the cart
		inc += 1;									//increment GLOBAL inc variable first
		el_add.innerHTML = '<p>'+inc+'</p>';						//update html for COUNTER number in CART
		createCart(e.target.id);							//send event counting the ID of the specific clicked on item from menu
	}
}

function removeFromCart(e){									//FUNCTION to decrement counter and update ID values in ITEMS array
	
	let index = parseInt(e.target.id);							//get ID of element to remove
	items.splice(index-1, 1);								//splice element from array
	inc--;											//decrement ID number
	document.getElementById('counter').innerHTML = '<p>'+inc+'</p>';			//change counter value to new ID count
	
	let x = 1;										//new ID number for elements
	for(let i = 0; i < inc; i++)								//loop through elements in array
		items[i].firstChild.id = x++;						//change 1st child of elements in array to new ID number(1st = button id)
	
}

function closeDisplay(expandCart, expandCartCounter){				//CLOSE CART DROP DOWN function (expandCart = cart ID, expandCartCounter = counter ID)
	let rmEl = document.getElementsByTagName('ul')[1]; 			//get the ul containing new elements on CART dropdown
	
	if(rmEl == null){									//Prevents undfined behavior
		console.log('variable is null');
		event.stopPropagation();
		return;
	}
	
	let conEl = rmEl.parentNode;								//get parent of ul node 'li'
	conEl.removeChild(rmEl);								//remove ul from cart display
	
	expandCart.style.animationName = 'cartAnimationClose';					//call animation to start @keyframes 
	expandCart.style.animationDuration = '0.5s';						//set animation duration time
	expandCart.style.width = '';								//undue all js styling for CART
	expandCart.style.borderRadius ='';
	expandCart.style.width = '';
	expandCart.style.position = '';
	expandCart.style.right = '';
	expandCart.style.borderRadius = '';
	expandCart.style.backgroundColor = '';
	expandCart.style.border = '';
	expandCart.style.boxShadow = '';
	expandCart.style.zIndex = '';
	expandCart.style.display = '';
	expandCart.style.paddingBottom = '';
	expandCart.style.paddingLeft = '';
	
	expandCartCounter.style.backgroundColor = '';						//undue all js styling for COUNTER
	expandCartCounter.style.border = '';
	expandCartCounter.style.left = '';
	expandCartCounter.style.float = '';
	expandCartCounter.style.bottom = '';
	
}

function cartDisplayMobile(expandCart, expandCartCounter){					//WE CAN MAKE THIS BETTER
	console.log('mobile display');
	expandCart.style.animationName = 'cartAnimation';
	expandCart.style.animationDuration = '0.5s';
	expandCart.style.width = '180px';
	expandCart.style.position = 'relative';
	expandCart.style.right = '100px';
	expandCart.style.borderRadius = '3px';
	expandCart.style.backgroundColor = 'rgba(255, 245, 238, 0.95)';
	expandCart.style.border = 'none';
	expandCart.style.boxShadow = '4px 4px 0px #FA522B';
	expandCart.style.zIndex = '100';
	expandCart.style.display = 'inline-table';
	expandCart.style.paddingBottom = '5px';
	
	expandCartCounter.style.backgroundColor = 'rgba(255, 245, 238, 0.95)';
	expandCartCounter.style.border = 'none';
	expandCartCounter.style.left = '0px';
	expandCartCounter.style.float = 'right';
	expandCartCounter.style.bottom = '22px';
}

function cartDisplayDesktop(expandCart, expandCartCounter){				//COMBINE
	console.log('desktop display');
	expandCart.style.animationName = 'cartAnimation';
	expandCart.style.animationDuration = '0.5s';
	expandCart.style.width = '215px';
	expandCart.style.position = 'relative';
	expandCart.style.right = '125px';
	expandCart.style.borderRadius = '3px';
	expandCart.style.backgroundColor = 'rgba(255, 245, 238, 0.95)';
	expandCart.style.border = 'none';
	expandCart.style.boxShadow = '4px 4px 0px #FA522B';
	expandCart.style.zIndex = '100';
	expandCart.style.display = 'inline-table';
	expandCart.style.paddingBottom = '5px';
	
	expandCartCounter.style.backgroundColor = 'rgba(255, 245, 238, 0.95)';
	expandCartCounter.style.border = 'none';
	expandCartCounter.style.left = '0px';
	expandCartCounter.style.float = 'right';
	expandCartCounter.style.bottom = '24px';
}
function cartDisplay(event){
	
	if(items.length == 0)									//IF there aren't any added item, don't display
		return;
		
	let device = screen.width;
	let expandCart = el_display;
	let expandCartCounter = document.getElementById('counter');
	
	
	if(device <= 600)
		cartDisplayMobile(expandCart, expandCartCounter);
	
	else
		cartDisplayDesktop(expandCart, expandCartCounter);
	
	
	var x = document.getElementsByTagName('li')[1];						//get CARRT List element
	var u  = document.createElement('ul');							//Create unordered list
	u.setAttribute('id', 'expnd');								//set unordered element with ID = 'expnd' to stylize w/CSS
	
	for(var i = 0; i < items.length; i++){							//loop through items in array, and append to unordered list
		u.appendChild(items[i]);							//append each element from array to unordered list
	}
	x.appendChild(u);									//finally, append unordered list to CART list
	
	//DESKTOP/MOBILE: Counter DIV border goes out of wack
	var rm, rmCon;
	if(event.target.tagName == 'INPUT'){
		rm = document.getElementsByClassName('select')[parseInt(event.target.id) -1];	//Get item based on Index of Items array eg. IDs are Natural #'s
		rmCon = rm.parentNode;
		rmCon.removeChild(rm);
		removeFromCart(event);
		console.log('removed: '+rm.innerHTML);
		
		if(items.length <= 0){								//Close Cart Display is there are no more items in the cart
			closeDisplay(expandCart, expandCartCounter);
		}
	}
	
	window.onscroll = () => closeDisplay(expandCart,expandCartCounter);		//Close the Cart Display if SCROLLING is detected on the window (DESKTOP)
	window.ontouchmove = () => closeDisplay(expandCart,expandCartCounter);		//Close the Cart Display if SCROLLING is detected on the window (MOBILE)
}

function createCart(itemID){								//Create cart based on event id
	var newEl = document.createElement('li');
	newEl.setAttribute('class', 'select');
	var newItem = '<input type=\"button\" id=\"' + inc + '\" name=\"'+itemID+'\">';
	
	if(itemID == 'insc'){
		newItem += '<p style=\"color: #DD215C; padding-left: 10px;\">INSECTIVORE</p>';
		
	}
	else if(itemID == 'carn'){
		newItem += '<p style=\"color: #41A0E6; padding-left: 10px;\">CARNIVORE</p>';
	}
	else{
		newItem += '<p style=\"color: #FC6E2E; padding-left: 10px;\">PESCIVORE</p>';
	}
	
	newEl.innerHTML = newItem;
	items.push(newEl);
}

var el_display = document.getElementById('cart');
el_display.addEventListener('click',cartDisplay, true);

var el = document.getElementsByTagName('button');
el[0].addEventListener('click', function(e){ addToCart(e); }, false);
el[1].addEventListener('click', function(e){ addToCart(e); }, false);
el[2].addEventListener('click', function(e){ addToCart(e); }, false);
