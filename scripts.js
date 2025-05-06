document.getElementById('health-level').addEventListener('change', updateDiagram);
document.getElementById('organs-affected').addEventListener('change', updateDiagram);

function updateDiagram() {
    const healthLevel = document.getElementById('health-level').value;
    const organsAffected = document.getElementById('organs-affected').value;

    // Construct the image path based on the selected options
    const imagePath = `${healthLevel}-${organsAffected}.png`;

    // Get the diagram box and image elements
    const diagramBox = document.getElementById('diagram-box');
    const bodyDiagram = document.getElementById('body-diagram');

    // Add a class to trigger the fade-out effect
    bodyDiagram.classList.add('hidden');

    // Wait for the fade-out transition to complete, then update the image source
    setTimeout(() => {
        bodyDiagram.src = imagePath;
        bodyDiagram.classList.remove('hidden');
    }, 500); // Match this duration to the CSS transition duration
}
