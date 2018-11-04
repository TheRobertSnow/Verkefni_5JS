//Walking the DOM
<html>
<body>
  <div>Users:</div>
  <ul>
    <li>John</li>
    <li>Pete</li>
  </ul>
</body>
</html>

//How to access:
//the <div> DOM node?
document.body.firstElementChild
//eða
document.body.children[0]
//eða
document.body.childNodes[1]

//The <ul> DOM node?
document.body.lastElementChild
//eða
document.body.children[1]

//The second <li> (with Pete)?
document.body.lastElementChild.lastElementChild


// If elem -is an arbitary DOM element node...
	// Is it true that elem.lastChild.nextSibling is always null?
		//Já, lastChild er alltaf síðast svo að það er enginn nextSibling
	// Is it true that elem.children[0].previousSibling is always null?
		//Nei, elem.children[0] er fyrsta child meðal elements. Það getur verið non element node á undan t.d. text node.


//-------------------------------------------------------------------------------------------------------------------

//Searching:
//How to find:
// 1. The table with id="age-table"
let table = document.getElementById('age-table')
// 2. All label elements inside that table
table.getElementsByTagName('label')
//eða
document.querySelectorAll('#age-table label')
//3. The first td in that table(with the word "Age")
table.getElementsByTagName('td')[0]
//eða
table.querySelector('td')
//eða
table.rows[0].cells[0]
//4. The form with the name search
let form = document.getElementById('search')[0]
//5. The first input in that form
form.getElementsByTagName('input')[0]
//eða
form.querySelector('input')
//6. The last input in that form
let input = form.querySelectorAll('input')
input[input.length-1]


//-------------------------------------------------------------------------------------------------------------------


//Node properties:
//What does the script show?
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>

//Þar sem að scriptið runnar áður en browserinn klárar að loada síðuna
//þá er script seinasta DOM node og útkoman er 1

//------------------------------------------------------------------------------------------------------------------

//Attributes and properties:
//Write the code to select the element with data-widget-name attribute from the document and to read its value:
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    let elem = document.querySelector('[data-widget-name]');
    alert(elem.dataset.widgetName);
  </script>
</body>
</html>

//-------------------------------------------------------------------------------------------------------------------

//Modifying the document:
//Show descendants in a tree:
<script>
    let lis = document.getElementsByTagName('li');

    for (let li of lis) {
      // nær í fjölda á öllum <li> fyrir neðan þetta <li>

      let descendantsCount = li.getElementsByTagName('li').length;
      if (!descendantsCount) continue;

      // bætir við text node
      li.firstChild.data += ' [' + descendantsCount + ']';
    }
 </script>

 //------------------------------------------------------------------------------------------------------------------

 //Styles and classes:
 //Create notification:
 <script>
    function showNotification({top = 0, right = 0, className, html}) {

      let notification = document.createElement('div');
      notification.className = "notification";
      if (className) {
        notification.classList.add(className);
      }

      notification.style.top = top + 'px';
      notification.style.right = right + 'px';

      notification.innerHTML = html;
      document.body.append(notification);

      setTimeout(() => notification.remove(), 1500);
    }

    let i = 1;
    setInterval(() => {
      showNotification({
        top: 10,
        right: 10,
        html: 'Hello ' + i++,
        className: "welcome"
      });
    }, 2000);
  </script>

//-----------------------------------------------------------------------------------------------------------------

//Element size and scrolling
//What's the scroll from the bottom?:
let scrollBottom = elm.scrollHeight - elm.scrollTop - elm.clientHeight;
//					(Hæðin á öllu)		(hæðin frá top)		(hæðin sem sést)

//-----------------------------------------------------------------------------------------------------------------

//Coordinates
// 1.
let coordinates = elem.getBoundingClientRect();
let uloc = [coordinates.left, coords.top];
// 2.
let broc = [coordinates.right, coords.bottom];
// 3.
let ulic = [coordinates.left + field.clientLeft, coordinates.top + field.clientTop];
// 4.
let bric = [
	coordinates.left + elem.clientLeft + elem.clientWidth,
	coordinates.top + elem.clientTop + elem.clientHeight
];

//-------------------------------------------------Events----------------------------------------------------------

//Browser events:
//Add JavaScript to the button to make <div id="text"> dissapear when we click it.
document.getElementById('hider').onclick = function() {	//nær í "hider"
	document.getElementById('text').hidden = true; //sýnir ekki "text" eftir að ýtt er á takkann.
}

//-----------------------------------------------------------------------------------------------------------------

//Event delegation:
// Hide messages with delegation:
container.onclick = function(event) {
	if (event.target.className != 'remove-button') return;//ef target er ekki X takkinn gerist ekkert.

	let pane = event.target.closest('.pane');
	pane.remove();//eyðir í burt glugganum
    };

//-----------------------------------------------------------------------------------------------------------------

//Browser default actions:
//
thumbs.onclick = function(event) {
	let thumbnail = event.target.closest('a');//nær í element sem hyperlink

	if (!thumbnail) return;
	showThumbnail(thumbnail.href, thumbnail.title);//setur inn href og title á þeim hyperlink sem var valinn
	event.preventDefault();//kemur í veg fyir deafult aðgerð
}

function showThumbnail(href, title) {// aðgerð sem breytir src og alt á því sem er með id="largeImg"
	largeImg.src = href;
	largeImg.alt = title;
}

//-----------------------------------------------------------------------------------------------------------------

//Mouse events basics
// Selectable list
ul.onclick = function(event) {
	if (event.target.tagName != "LI") return;

	if (event.ctrlKey || event.metaKey) {//skilar true eða false ef það er ýtt á ctrl eða ekki
		toggleSelect(event.target);//keyrir toggleSelect functionið
	} 
	else {
		singleSelect(event.target);//keyrir singleSelect
	}

}

// prevent unneeded selection of list elements on clicks
	ul.onmousedown = function() {
	return false;
};

function toggleSelect(li) {//aðferð til að slökva á selected
	li.classList.toggle('selected');
	}

function singleSelect(li) {//aðferð til að kveikja á selected og 
	let selected = ul.querySelectorAll('.selected');
	for(let elem of selected) {//kemur í veg fyrir að fleyri en einn sé selected
		elem.classList.remove('selected');
	}
	li.classList.add('selected');
}

//------------------------------------------------------------------------------------------------------------------

//Moving:
// Improved tooltip behavior
let tooltip;

document.onmouseover = function(event) {

	let anchorElem = event.target.closest('[data-tooltip]');
	if (!anchorElem) return;
	tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
}

document.onmouseout = function() {
	if (tooltip) {
		tooltip.remove();
		tooltip = false;
	}

}


function showTooltip(anchorElem, html) {
	let tooltipElem = document.createElement('div');
	tooltipElem.className = 'tooltip';
	tooltipElem.innerHTML = html;
	document.body.append(tooltipElem);

	let coords = anchorElem.getBoundingClientRect();

	let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0;

	let top = coords.top - tooltipElem.offsetHeight - 5;
	if (top < 0) {
      	top = coords.top + anchorElem.offsetHeight + 5;
	}

	tooltipElem.style.left = left + 'px';
	tooltipElem.style.top = top + 'px';

	return tooltipElem;
}

//-----------------------------------------------------------------------------------------------

//Drag'n'Drop:
// Slider
let thumb = slider.querySelector('.thumb');

thumb.onmousedown = function(event) {
	event.preventDefault(); // prevent selection start (browser action)

	let shiftX = event.clientX - thumb.getBoundingClientRect().left;

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);

	function onMouseMove(event) {
		let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

		// the pointer is out of slider => lock the thumb within the bounaries
		if (newLeft < 0) {
			newLeft = 0;
		}
		let rightEdge = slider.offsetWidth - thumb.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumb.style.left = newLeft + 'px';
	}

function onMouseUp() {
	document.removeEventListener('mouseup', onMouseUp);
	document.removeEventListener('mousemove', onMouseMove);
}

};

thumb.ondragstart = function() {
	return false;
};

//----------------------------------------------------------------------------------------------

//Keyboard:
// Extended hotkeys
function runOnKeys(func, ...codes) {
      let pressed = new Set();

      document.addEventListener('keydown', function(event) {
        pressed.add(event.code);

        for (let code of codes) { // are all keys in the set?
          if (!pressed.has(code)) {
            return;
          }
        }
        pressed.clear();

        func();
      });

      document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
      });

    }

    runOnKeys(
      () => alert("Hello!"),
      "KeyQ",
      "KeyW"
    );

//---------------------------------------------------------------------------------------------

//Resource loading:
// Load images with a callback
function preloadImages(sources, callback) {
	et counter = 0;

	function onLoad() {
		counter++;
		if (counter == sources.length) callback();
	}

	for(let source of sources) {
		let img = document.createElement('img');
		img.onload = img.onerror = onLoad;
		img.src = source;
	}
}


let sources = [
	"https://en.js.cx/images-load/1.jpg",
	"https://en.js.cx/images-load/2.jpg",
	"https://en.js.cx/images-load/3.jpg"
];
for (let i = 0; i < sources.length; i++) {
	sources[i] += '?' + Math.random();
}

function testLoaded() {
	let widthSum = 0;
	for (let i = 0; i < sources.length; i++) {
		let img = document.createElement('img');
		img.src = sources[i];
		widthSum += img.width;
	}
	alert(widthSum);
}

preloadImages(sources, testLoaded);