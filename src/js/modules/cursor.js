export function cursor() {
    const follower = document.querySelector('.cursor-follower');
    if (!follower) return;

    follower.style.position = 'fixed';
    follower.style.pointerEvents = 'none';
    follower.style.transform = 'translate(-50%, 0%)';
    follower.style.opacity = '0';
    follower.style.whiteSpace = 'normal';
    follower.style.textAlign = 'center';

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let mouseX = posX;
    let mouseY = posY;

    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    function animate() {
        const smoothness = 0.2;
        posX += (mouseX - posX) * smoothness;
        posY += (mouseY - posY) * smoothness;

        follower.style.left = `${posX}px`;
        follower.style.top = `${posY}px`;

        requestAnimationFrame(animate);
    }

    animate();

    function insertLineBreak(content) {
        const temp = document.createElement('div');
        temp.innerHTML = content;

        const walker = document.createTreeWalker(temp, NodeFilter.SHOW_TEXT, null, false);
        let firstTextNode = walker.nextNode();

        if (firstTextNode && firstTextNode.nodeValue.trim()) {
            const text = firstTextNode.nodeValue;
            const words = text.split(/(\s+)/);

            if (words.length > 1) {
                const fragment = document.createDocumentFragment();
                fragment.appendChild(document.createTextNode(words[0]));
                if (words[1]) {
                    fragment.appendChild(document.createTextNode(words[1]));
                }
                fragment.appendChild(document.createElement('br'));
                if (words.length > 2) {
                    fragment.appendChild(document.createTextNode(words.slice(2).join('')));
                }
                firstTextNode.parentNode.replaceChild(fragment, firstTextNode);
            }
        }

        return temp.innerHTML;
    }

    // Элементы с data-cursor-hover
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const hoverContent = el.dataset.cursorHover;
            if (hoverContent && follower) {
                follower.classList.add('hover-effect');
                follower.innerHTML = insertLineBreak(hoverContent);
            }
        });

        el.addEventListener('mouseleave', () => {
            if (follower) {
                follower.classList.remove('hover-effect');
                follower.innerHTML = '';
            }
        });
        
    });


    // Элементы с data-cursor-white с проверкой пересечения
    const whiteElements = document.querySelectorAll('[data-cursor-white]');
    let lastWhiteElement = null;

    function checkCursorOverlap() {
        if (!follower || !lastWhiteElement) return;

        const followerRect = follower.getBoundingClientRect();
        const elementRect = lastWhiteElement.getBoundingClientRect();

        // Проверяем пересечение элементов
        const isOverlapping = !(
            followerRect.right < elementRect.left || 
            followerRect.left > elementRect.right || 
            followerRect.bottom < elementRect.top || 
            followerRect.top > elementRect.bottom
        );

        if (isOverlapping) {
            follower.classList.add('white');
        } else {
            follower.classList.remove('white');
        }
    }

    whiteElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            lastWhiteElement = el;
            checkCursorOverlap();
        });

        el.addEventListener('mouseleave', () => {
            if (lastWhiteElement === el) {
                lastWhiteElement = null;
                follower?.classList.remove('white');
            }
        });
    });
}




