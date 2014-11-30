function createGame() {
  var elements = require('./elements.json');
  var Suitcase = require('./suitcase.js');
  var currentDrag, i;

  console.log('elements');
  console.log(elements);

  var $game = document.getElementById('game');
  var $suitcase = document.getElementById('koffer');
  var sc = new Suitcase();
  sc.set(elements);

  $suitcase.addEventListener('dragenter', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (sc.hint().name === currentDrag.element.name) {
      $suitcase.classList.add('valid-drop');
    } else {
      $suitcase.classList.add('invalid-drop');
    }
  });

  $suitcase.addEventListener('dragleave', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $suitcase.classList.remove('valid-drop');
    $suitcase.classList.remove('invalid-drop');
  });

  $suitcase.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  });

  $suitcase.addEventListener('drop', function (event) {
    console.log('dropping?');
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    if (sc.put(currentDrag.element)) {
      console.log('dropped!');
      $game.removeChild(currentDrag.div);
      $suitcase.appendChild(currentDrag.div);
      checkIfDone();
    } else {
      console.log('not dropped!');
    }
  });

  for (i = elements.length - 1; i >= 0; i--) {
    createElement($game, elements, i);
  }

  function checkIfDone() {
    if (sc.isDone()) {
      alert('yay!');
    }
  }

  function createElement($body, elements, i) {
    var element = elements[i];
    var $div = document.createElement('div');
    $div.setAttribute('id', 'element_' + i);
    $div.setAttribute('class', 'element');
    $div.setAttribute('draggable', true);
    $div.innerHTML = element.name;
    $div.addEventListener('dragstart', function (event) {
      event.dataTransfer.effectAllowed = 'move';
      currentDrag = {div : $div, element : element};
      console.log('dragging started');
      $div.classList.add('dragging');
      var br = $div.getBoundingClientRect();
      console.log(br);
      console.log(event);

      event.dataTransfer.setDragImage($div, event.x - br.left, event.y - br.top);
      event.dataTransfer.setData('application/json', element);
      event.dataTransfer.setData('text/plain', element.name);
    });

    $div.addEventListener('dragend', function (event) {
      console.log('dragging ended');
      currentDrag = null;
      $div.classList.remove('dragging');
      $suitcase.classList.remove('valid-drop');
      $suitcase.classList.remove('invalid-drop');
    });

    $body.appendChild($div);
  }
}

window.onload = function () {
  console.log('loaded');
  createGame();
};
