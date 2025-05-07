document.addEventListener('DOMContentLoaded', function() {
    const healthLevelSelect = document.getElementById('health-level');
    const organsAffectedSelect = document.getElementById('organs-affected');
    const bodyDiagram = document.getElementById('body-diagram');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    
    healthLevelSelect.addEventListener('change', updateDiagram);
    organsAffectedSelect.addEventListener('change', updateDiagram);
    
    // Initialize
    updateDiagram();
    
    // Add error handling for image loading
    bodyDiagram.addEventListener('error', handleImageError);
    
    function updateDiagram() {
        const healthLevel = healthLevelSelect.value;
        const organsAffected = organsAffectedSelect.value;
        const imagePath = `${healthLevel}-${organsAffected}.png`;
        const diagramBox = document.getElementById('diagram-box');
        bodyDiagram.classList.add('hidden');
        updateInformationPanel(healthLevel, organsAffected);
        
        
        setTimeout(() => {
            bodyDiagram.src = imagePath;
            bodyDiagram.alt = `${healthLevel} ${organsAffected} diagram`;
            bodyDiagram.classList.remove('hidden');
        }, 500); // Fade-out transition
    }
    
    function handleImageError() {
        console.error(`Failed to load image: ${bodyDiagram.src}`);
        
        // Fallback image
        bodyDiagram.src = 'healthy-lungs.png';
        
        // Error message
        const diagramBox = document.getElementById('diagram-box');
        
        // Error overlay
        let errorOverlay = document.getElementById('error-overlay');
        if (!errorOverlay) {
            errorOverlay = document.createElement('div');
            errorOverlay.id = 'error-overlay';
            errorOverlay.style.position = 'absolute';
            errorOverlay.style.top = '10px';
            errorOverlay.style.left = '0';
            errorOverlay.style.width = '100%';
            errorOverlay.style.padding = '10px';
            errorOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            errorOverlay.style.color = 'red';
            errorOverlay.style.borderRadius = '5px';
            diagramBox.appendChild(errorOverlay);
        }
        
        errorOverlay.textContent = `Image not found: ${bodyDiagram.src}`;
        bodyDiagram.classList.remove('hidden');
    }
    
    function updateInformationPanel(healthLevel, organsAffected) {
        switch(healthLevel) {
            case 'healthy':
                infoTitle.textContent = 'Healthy Lungs';
                infoDescription.textContent = 'Normal, healthy lung tissue. No TB bacteria present.';
                break;
            case 'latent':
                infoTitle.textContent = 'Latent TB Infection';
                infoDescription.textContent = 'TB bacteria are present in the body but are inactive. The person is not ill and cannot spread TB to others.';
                break;
            case 'active':
                infoTitle.textContent = 'Active TB Disease';
                infoDescription.textContent = 'TB bacteria are actively multiplying in the body. The person is ill and can spread TB to others. Symptoms may include persistent cough, chest pain, and coughing up blood.';
                break;
            case 'recovery':
                infoTitle.textContent = 'Recovery Phase';
                infoDescription.textContent = 'TB bacteria is completely eradicated from the body. The person is gradually recovering, but some damage to tissues remains.';
                break;
        }
        
        if (organsAffected === 'lymph-nodes') {
            infoDescription.textContent += ' This view focuses on how TB affects the lymphatic system.';
        } else {
            infoDescription.textContent += ' This view focuses on how TB affects the lungs.';
        }
    }
});
