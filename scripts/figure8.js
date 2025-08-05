// Figure-8 Animation using proper path animation
document.addEventListener('DOMContentLoaded', function() {
    // Create proper figure-8 path
    const figure8Path = "M 400 200 C 400 100, 200 100, 200 200 S 400 300, 400 200 C 400 300, 600 300, 600 200 S 400 100, 400 200";
    
    // Update SVG paths
    const paths = document.querySelectorAll('.track-path');
    paths.forEach(path => {
        path.setAttribute('d', figure8Path);
    });
    
    // Create orbs that follow the path
    const orbData = [
        // Main track orbs
        { class: 'orb-main orb-orange', speed: 20, delay: 0 },
        { class: 'orb-main orb-purple', speed: 20, delay: -5 },
        { class: 'orb-main orb-violet', speed: 20, delay: -10 },
        { class: 'orb-main orb-green', speed: 20, delay: -15 },
        // Smaller orbs on outer tracks
        { class: 'orb-small orb-orange', speed: 30, delay: -2 },
        { class: 'orb-small orb-purple', speed: 30, delay: -8 },
        { class: 'orb-tiny orb-violet', speed: 40, delay: -4 },
        { class: 'orb-tiny orb-green', speed: 40, delay: -12 }
    ];
    
    const container = document.querySelector('.figure8-container');
    
    // Clear existing orbs
    container.querySelectorAll('.orb-container').forEach(el => el.remove());
    
    // Create new orbs with proper animation
    orbData.forEach((orb, index) => {
        const orbContainer = document.createElement('div');
        orbContainer.className = 'orb-follow-path';
        orbContainer.style.offsetPath = `path('${figure8Path}')`;
        orbContainer.style.animation = `followPath ${orb.speed}s linear infinite`;
        orbContainer.style.animationDelay = `${orb.delay}s`;
        
        const orbElement = document.createElement('div');
        orbElement.className = `orb ${orb.class}`;
        
        orbContainer.appendChild(orbElement);
        container.appendChild(orbContainer);
    });
    
    // Add CSS for path following
    const style = document.createElement('style');
    style.textContent = `
        .orb-follow-path {
            position: absolute;
            offset-path: path('${figure8Path}');
            offset-rotate: 0deg;
        }
        
        @keyframes followPath {
            0% {
                offset-distance: 0%;
            }
            100% {
                offset-distance: 100%;
            }
        }
    `;
    document.head.appendChild(style);
});