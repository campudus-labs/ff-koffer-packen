function createGame() {
  var elements = require('./elements.json');
  var Suitcase = require('./suitcase.js');
  var currentDrag, i;

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
    event.preventDefault();
    event.stopPropagation();
    var $div = currentDrag.div;
    if (sc.put(currentDrag.element)) {
      $game.removeChild($div);
      $suitcase.appendChild($div);
      $div.removeEventListener('dragstart', dragStart);
      $div.removeEventListener('dragend', dragEnd);
      $div.classList.remove('dragging');
      $div.classList.add('dropped');
      $div.setAttribute('draggable', false);
      $suitcase.classList.remove('valid-drop');
      checkIfDone();
    } else {
      console.log('not dropped!');
    }
  });

  for (i = elements.length - 1; i >= 0; i--) {
    createElement($game, elements, i);
  }

  document.getElementById('rules').addEventListener('click', showPacking);

  function showPacking() {
    var $elements = document.querySelectorAll('.element');

    go(0)();

    function go(i) {
      return function () {
        var nextElem = sc.hint(i);
        var $div = null;
        var $elem, e, idx;
        if (nextElem !== false) {
          for (idx = 0; $div === null && idx < $elements.length; idx++) {
            $elem = $elements[idx];
            e = $elem.dragElement;
            if (e.name === nextElem.name) {
              $div = $elem;
            }
          }
          $div.classList.add('next');
          setTimeout(function () {
            $div.classList.remove('next');
          }, 500);
          setTimeout(go(i + 1), (i + 1) * 500);
        }
      }
    }
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
    $div.dragElement = element;
    $div.innerHTML = element.name;
    $div.addEventListener('dragstart', dragStart);

    $div.addEventListener('dragend', dragEnd);

    $body.appendChild($div);
  }

  function dragStart(event) {
    var $div = this;
    var br = $div.getBoundingClientRect();
    event.dataTransfer.effectAllowed = 'move';
    currentDrag = {
      div : $div,
      element : $div.dragElement
    };
    $div.classList.add('dragging');

    event.dataTransfer.setDragImage($div, event.x - br.left, event.y - br.top);
    event.dataTransfer.setData('text/plain', currentDrag.element.name);
  }

  function dragEnd(event) {
    currentDrag = null;
    this.classList.remove('dragging');
    $suitcase.classList.remove('valid-drop');
    $suitcase.classList.remove('invalid-drop');
  }
}

window.onload = function () {
  createGame();
};
