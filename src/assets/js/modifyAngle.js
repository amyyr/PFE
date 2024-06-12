function modifyAngle() {
    const svgElement = document.querySelector('svg');
    const angle = parseFloat(prompt("Enter the angle to rotate:"));
    
    if (!isNaN(angle)) {
        // Get the current transform attribute or set it to an empty string if not set
        const currentTransform = svgElement.getAttribute('transform') || '';

        // Append the new rotate transformation
        svgElement.setAttribute('transform', `${currentTransform} rotate(${angle} 100 100)`);
    } else {
        alert("Please enter a valid number for the angle.");
    }
}
<script type="application/ecmascript">
<![CDATA[
  let selectedElement = null;
  let offset = {x: 0, y: 0};

  function getMousePosition(evt) {
    const svg = document.querySelector('svg');
    const CTM = svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  function startDrag(evt) {
    if (evt.target.classList.contains('angle-line')) {
      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttribute('x2'));
      offset.y -= parseFloat(selectedElement.getAttribute('y2'));
    }
  }

  function drag(evt) {
    if (selectedElement) {
      evt.preventDefault();
      const coord = getMousePosition(evt);
      selectedElement.setAttribute('x2', coord.x - offset.x);
      selectedElement.setAttribute('y2', coord.y - offset.y);
      updateAngleText();
    }
  }

  function endDrag() {
    selectedElement = null;
  }

  function updateAngleText() {
    const x1 = parseFloat(document.getElementById('line1').getAttribute('x2'));
    const y1 = parseFloat(document.getElementById('line1').getAttribute('y2'));
    const x2 = parseFloat(document.getElementById('line2').getAttribute('x2'));
    const y2 = parseFloat(document.getElementById('line2').getAttribute('y2'));

    const angle = Math.atan2(y2 - 100, x2 - 100) - Math.atan2(y1 - 100, x1 - 100);
    const angleDegrees = Math.abs(angle * 180 / Math.PI).toFixed(2);

    document.getElementById('angle-text').textContent = angleDegrees + '°';
  }

  document.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
]]>
</script>