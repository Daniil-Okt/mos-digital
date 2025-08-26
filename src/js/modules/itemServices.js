import Matter from "matter-js";
import { setupResizeHandler } from "./setupResizeHandler";

export function itemServices() {
    const itemServices = document.querySelectorAll('.item-services');

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    const animations = {};

    function handleItemClick(e) {
        if (e.target.closest('.services__btn-str')) return;
        const link = this.querySelector('.item-services__link');
        if (link) link.click();
    }

    itemServices.forEach(item => {
        // Создаём уникальный data-id, если его нет
        let itemId = item.getAttribute('data-id');
        if (!itemId) {
            itemId = Math.random().toString(36).substr(2, 9);
            item.setAttribute('data-id', itemId);
        }

        const btnRow = item.querySelector('.item-services__btn-row');
        const buttons = btnRow.querySelectorAll('.services__btn-str');

        animations[itemId] = {
            engine: null,
            runner: null,
            render: null,
            buttonBodies: [],
            timeout: null,
            isActive: false,
            rafId: null,
            originalStyles: [],
            mouseConstraint: null,
            isDragging: false,
            dragStartTime: 0,
            activeBodies: 0,
            fallTimeouts: [] // Таймеры падения кнопок
        };

        if (!isTouchDevice() && window.innerWidth > 1024) {
            item.addEventListener('click', handleItemClick);

            item.addEventListener('mouseenter', () => {
                item.classList.add('_active');
                startAnimation(itemId, btnRow, buttons);
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('_active');
                stopAnimationWithDelay(itemId);
            });
        } else {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.services__btn-str')) return;

                if (item.classList.contains('_active')) {
                    item.classList.remove('_active');
                    stopAnimation(itemId);
                    return;
                }

                // Останавливаем анимацию всех других активных элементов
                Array.from(document.querySelectorAll('.item-services._active'))
                    .filter(el => el !== item)
                    .forEach(otherItem => {
                        const otherId = otherItem.getAttribute('data-id');
                        otherItem.classList.remove('_active');
                        stopAnimation(otherId);
                    });

                item.classList.add('_active');
                startAnimation(itemId, btnRow, buttons);
                e.stopPropagation();
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.item-services') && isTouchDevice()) {
            document.querySelectorAll('.item-services._active').forEach(item => {
                const itemId = item.getAttribute('data-id');
                item.classList.remove('_active');
                stopAnimation(itemId);
            });
        }
    });

    function startAnimation(itemId, container, buttons) {
        const anim = animations[itemId];
        if (anim.timeout) clearTimeout(anim.timeout);
        if (anim.isActive) return;
        anim.isActive = true;

        anim.originalStyles = [];
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            anim.originalStyles.push({
                element: button,
                position: button.style.position,
                left: button.style.left,
                top: button.style.top,
                transform: button.style.transform,
                borderRadius: button.style.borderRadius,
                width: button.style.width,
                height: button.style.height,
                zIndex: button.style.zIndex,
                cursor: button.style.cursor,
                pointerEvents: button.style.pointerEvents,
                originalLeft: rect.left,
                originalTop: rect.top,
                originalWidth: rect.width,
                originalHeight: rect.height
            });
        });

        const { Engine, Render, Runner, Composite, Bodies, Mouse, MouseConstraint, Body, Events } = Matter;

        anim.engine = Engine.create();
        anim.engine.world.gravity.y = 0;

        anim.render = Render.create({
            element: container,
            engine: anim.engine,
            options: { width: container.offsetWidth, height: container.offsetHeight, wireframes: false, background: 'transparent' }
        });

        anim.render.canvas.style.pointerEvents = 'none';
        anim.render.canvas.style.position = 'absolute';
        anim.render.canvas.style.top = '0';
        anim.render.canvas.style.left = '0';
        anim.render.canvas.style.zIndex = '1';
        anim.render.canvas.style.cursor = 'default';

        anim.buttonBodies = [];
        anim.activeBodies = 0;
        anim.fallTimeouts = [];

        function getRandomWeight() {
            const MIN_WEIGHT = 0.3;
            const MAX_WEIGHT = 2.5;
            const WEIGHT_VARIATION = 0.7;
            let weight = 1.0 + (Math.random() - 0.5) * 2 * WEIGHT_VARIATION;
            return Math.max(MIN_WEIGHT, Math.min(MAX_WEIGHT, weight));
        }

        function getPhysicsProperties(weight) {
            return {
                weight,
                restitution: 0.8 - (weight * 0.2),
                friction: 0.2 + (weight * 0.3),
                frictionStatic: 0.3 + (weight * 0.3)
            };
        }

        // Падение кнопок
        buttons.forEach((button, index) => {
            const timeoutId = setTimeout(() => {
                if (!animations[itemId]?.isActive) return;

                const rect = button.getBoundingClientRect();
                const cRect = container.getBoundingClientRect();
                const x = rect.left - cRect.left + rect.width / 2;
                const y = rect.top - cRect.top + rect.height / 2;
                const radius = rect.width / 2;
                const sides = 20;
                const polygonRadius = radius / Math.cos(Math.PI / sides);
                const randomWeight = getRandomWeight();
                const physics = getPhysicsProperties(randomWeight);
                const area = Math.PI * radius * radius;
                const mass = area * randomWeight;

                const body = Bodies.polygon(x, y, sides, polygonRadius, {
                    restitution: physics.restitution,
                    friction: physics.friction,
                    frictionStatic: physics.frictionStatic,
                    frictionAir: 0.02,
                    density: randomWeight,
                    mass,
                    render: { visible: false },
                    label: 'button',
                    isStatic: false
                });

                body._weight = randomWeight;
                body.domElement = button;
                body._index = index;
                anim.buttonBodies.push(body);

                button.style.position = 'absolute';
                button.style.width = rect.width + 'px';
                button.style.height = rect.height + 'px';
                button.style.left = (x - radius) + 'px';
                button.style.top  = (y - radius) + 'px';
                button.style.borderRadius = '50%';
                button._isButton = true;
                button._href = button.href;
                button._onclick = button.onclick;

                Composite.add(anim.engine.world, body);
                anim.activeBodies++;

                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
                const forceMagnitude = 0.01 * (2 - randomWeight);
                const angle = Math.random() * Math.PI * 2;
                Body.applyForce(body, body.position, { x: Math.cos(angle) * forceMagnitude, y: Math.sin(angle) * forceMagnitude });
            }, 200 * index);

            anim.fallTimeouts.push(timeoutId);
        });

        // Стены и мышь
        const w = container.clientWidth;
        const h = container.clientHeight;
        const thickness = 100;
        const walls = [
            Bodies.rectangle(w/2, -thickness/2, w, thickness, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(w/2, h+thickness/2, w, thickness, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(-thickness/2, h/2, thickness, h, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(w+thickness/2, h/2, thickness, h, { isStatic: true, render: { visible: false } })
        ];

        const mouse = Mouse.create(anim.render.canvas);
        anim.mouseConstraint = MouseConstraint.create(anim.engine, {
            mouse,
            constraint: { stiffness: 0.2, damping: 0.4, render: { visible: false } }
        });

        Composite.add(anim.engine.world, [...walls, anim.mouseConstraint]);

        // Плавная гравитация
        let gravityStep = 0;
        const gravityInterval = setInterval(() => {
            if (!animations[itemId]?.isActive) return clearInterval(gravityInterval);
            gravityStep += 0.02;
            anim.engine.world.gravity.y = Math.min(gravityStep, 1);
            if (gravityStep >= 1) clearInterval(gravityInterval);
        }, 20);

        // Drag
        Events.on(anim.mouseConstraint, 'startdrag', (event) => {
            anim.isDragging = true;
            anim.dragStartTime = Date.now();
            if (event.body?.domElement) event.body.domElement.style.cursor = 'grabbing';
        });
        Events.on(anim.mouseConstraint, 'enddrag', (event) => {
            anim.isDragging = false;
            const dragDuration = Date.now() - anim.dragStartTime;
            if (event.body?.domElement) {
                event.body.domElement.style.cursor = 'grab';
                if (dragDuration < 200 && event.body.domElement._isButton) {
                    setTimeout(() => {
                        if (!anim.isDragging) {
                            if (event.body.domElement._onclick) event.body.domElement._onclick();
                            else if (event.body.domElement._href) window.location.href = event.body.domElement._href;
                        }
                    }, 50);
                }
            }
        });

        anim.render.canvas.addEventListener('click', (e) => {
            if (anim.isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        Render.run(anim.render);
        anim.runner = Runner.create();
        Runner.run(anim.runner, anim.engine);

        // Обновление DOM
        function update() {
            if (!animations[itemId]?.isActive) return;
            anim.buttonBodies.forEach(body => {
                if (!body?.domElement) return;
                const r = (body.circleRadius || (body.bounds.max.x - body.bounds.min.x)/2);
                if (Math.sqrt(body.velocity.x**2 + body.velocity.y**2) < 0.01) Body.setVelocity(body, { x: 0, y: 0 });
                if (Math.abs(body.angularVelocity) < 0.001) Body.setAngularVelocity(body, 0);
                body.domElement.style.left = (body.position.x - r) + 'px';
                body.domElement.style.top  = (body.position.y - r) + 'px';
                body.domElement.style.transform = 'rotate(' + body.angle + 'rad)';
            });
            anim.rafId = requestAnimationFrame(update);
        }
        update();
    }

    function stopAnimation(itemId) {
        const anim = animations[itemId];
        if (!anim || !anim.isActive) return;
        anim.isActive = false;

        // Очистка таймеров падения
        anim.fallTimeouts.forEach(t => clearTimeout(t));
        anim.fallTimeouts = [];

        if (anim.rafId) cancelAnimationFrame(anim.rafId);
        if (anim.runner) Matter.Runner.stop(anim.runner);
        if (anim.render) {
            Matter.Render.stop(anim.render);
            if (anim.render.canvas?.parentNode) anim.render.canvas.parentNode.removeChild(anim.render.canvas);
        }
        if (anim.engine) Matter.Engine.clear(anim.engine);
        if (anim.mouseConstraint) Matter.Composite.remove(anim.engine.world, anim.mouseConstraint);

        anim.originalStyles.forEach(style => {
            const el = style.element;
            el.style.position = style.position || '';
            el.style.left = style.left || '';
            el.style.top = style.top || '';
            el.style.width = style.width || '';
            el.style.height = style.height || '';
            el.style.transform = style.transform || '';
            el.style.borderRadius = style.borderRadius || '';
            el.style.zIndex = style.zIndex || '';
            el.style.cursor = style.cursor || '';
            el.style.pointerEvents = style.pointerEvents || '';
            el.style.opacity = '';
            delete el._isButton;
            delete el._href;
            delete el._onclick;
        });

        anim.buttonBodies = [];
        anim.originalStyles = [];
        anim.engine = null;
        anim.runner = null;
        anim.render = null;
        anim.rafId = null;
        anim.mouseConstraint = null;
        anim.isDragging = false;
        anim.dragStartTime = 0;
        anim.activeBodies = 0;
    }

    function stopAnimationWithDelay(itemId) {
        const anim = animations[itemId];
        if (!anim) return;
        if (anim.timeout) clearTimeout(anim.timeout);
        anim.timeout = setTimeout(() => stopAnimation(itemId), 4000);
    }

    let previousWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== previousWidth) {
            document.querySelectorAll('.item-services._active').forEach(item => {
                const itemId = item.getAttribute('data-id');
                stopAnimation(itemId);
                item.classList.remove('_active');
            });
            previousWidth = currentWidth;
        }
    });
}
