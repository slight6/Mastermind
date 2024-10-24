

interact('.draggable').draggable({
    listeners: { move: dragMoveListener }
  });
  
  function dragMoveListener(event) {
    const target = event.target;
    // Get the new position of the dragged element
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
    // Apply the transform style to move the element
    target.style.transform = `translate(${x}px, ${y}px)`;
  
    // Save the new position in attributes (so it remembers its position)
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 0.5,
    ondrop: function(event) {
        event.target.appendChild(event.relatedTarget);
    }
});

interact('.draggable').draggable({
    modifiers: [
        interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 50, y: 50 })], // Customize grid size
            range: Infinity,
            relativePoints: [{ x: 0.5, y: 0.5 }],
        })
    ],
    listeners: { move: dragMoveListener }
});

