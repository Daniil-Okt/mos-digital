import Matter from "matter-js";

export function itemServices() {
    const itemServices = document.querySelectorAll('.item-services');

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    const animations = {};
    // Настройка задержки между падением элементов (в миллисекундах)
    const FALL_DELAY = 100;
    // Диапазон случайного веса (масса = площадь * density)
    const MIN_DENSITY = 0.4;
    const MAX_DENSITY = 0.6;

    // Обработчик клика для item-services (только для нетouch-устройств)
    function handleItemClick(e) {
        // Проверяем, был ли клик на кнопке внутри item
        if (e.target.closest('.services__btn-str')) {
            return; // Не обрабатываем клик, если он был на кнопке
        }
        
        // Ищем ссылку внутри item
        const link = this.querySelector('.item-services__link');
        if (link) {
            link.click()
        }
    }

    itemServices.forEach(item => {
        const btnRow = item.querySelector('.item-services__btn-row');
        const buttons = btnRow.querySelectorAll('.services__btn-str');
        const itemId = item.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);

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
            activeBodies: 0
        };

        if (!isTouchDevice() && window.innerWidth > 1024) {
            // Добавляем обработчик клика для item (только для нетouch-устройств)
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
                // Для touch-устройств проверяем, не был ли клик на кнопке
                if (e.target.closest('.services__btn-str')) {
                    return; // Не обрабатываем, если клик был на кнопке
                }
                
                document.querySelectorAll('.item-services._active').forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherId = otherItem.getAttribute('data-id') ||
                            Array.from(itemServices).indexOf(otherItem).toString();
                        otherItem.classList.remove('_active');
                        stopAnimationWithDelay(otherId);
                    }
                });

                const wasActive = item.classList.contains('_active');
                item.classList.toggle('_active');

                if (item.classList.contains('_active')) {
                    startAnimation(itemId, btnRow, buttons);
                } else {
                    stopAnimationWithDelay(itemId);
                }

                e.stopPropagation();
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.item-services') && isTouchDevice()) {
            document.querySelectorAll('.item-services._active').forEach(item => {
                const itemId = item.getAttribute('data-id') ||
                    Array.from(itemServices).indexOf(item).toString();
                item.classList.remove('_active');
                stopAnimationWithDelay(itemId);
            });
        }
    });


    function startAnimation(itemId, container, buttons) {
        const anim = animations[itemId];
        if (anim.timeout) {
            clearTimeout(anim.timeout);
            anim.timeout = null;
        }
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

        setTimeout(() => {
            if (!animations[itemId]?.isActive) return;

            const { Engine, Render, Runner, Composite, Bodies, Mouse, MouseConstraint, Body, Events } = Matter;

            anim.engine = Engine.create();
            // Начальная гравитация - 0, будет включаться постепенно
            anim.engine.world.gravity.y = 0;

            anim.render = Render.create({
                element: container,
                engine: anim.engine,
                options: {
                    width: container.offsetWidth,
                    height: container.offsetHeight,
                    wireframes: false,
                    background: 'transparent'
                }
            });
            
            // Canvas должен перехватывать события для перетаскивания
            anim.render.canvas.style.pointerEvents = 'auto';
            anim.render.canvas.style.position = 'absolute';
            anim.render.canvas.style.top = '0';
            anim.render.canvas.style.left = '0';
            anim.render.canvas.style.zIndex = '1';
            anim.render.canvas.style.cursor = 'default';

            anim.buttonBodies = [];
            anim.activeBodies = 0;

            // создаём тела кнопок с задержкой
            buttons.forEach((button, index) => {
                setTimeout(() => {
                    if (!animations[itemId]?.isActive) return;

                    const rect = button.getBoundingClientRect();
                    const cRect = container.getBoundingClientRect();
                    const x = rect.left - cRect.left + rect.width / 2;
                    const y = rect.top - cRect.top + rect.height / 2;
                    const radius = Math.min(rect.width, rect.height) / 2;
                    
                    // Генерируем случайную плотность для веса
                    const randomDensity = MIN_DENSITY + Math.random() * (MAX_DENSITY - MIN_DENSITY);
                    // Площадь круга = π * r²
                    const area = Math.PI * radius * radius;
                    // Масса = площадь * плотность
                    const mass = area * randomDensity;

                    const body = Bodies.circle(x, y, radius, {
                        restitution: 0.25,
                        friction: 0.2,
                        frictionAir: 0.02 + Math.random() * 0.03, // Случайное сопротивление воздуха
                        render: { visible: false },
                        label: 'button',
                        // Делаем тело статичным до начала анимации
                        isStatic: true,
                        // Устанавливаем случайную плотность (влияет на массу)
                        density: randomDensity,
                        // Можно также установить массу напрямую
                        mass: mass,
                        // Случайный отскок
                        restitution: 0.2 + Math.random() * 0.2,
                        // Случайное трение
                        friction: 0.1 + Math.random() * 0.2
                    });
                    
                    body.domElement = button;
                    body._index = index;
                    body._randomDensity = randomDensity; // Сохраняем для отладки
                    anim.buttonBodies.push(body);

                    button.style.position = 'absolute';
                    button.style.left = (x - radius) + 'px';
                    button.style.top = (y - radius) + 'px';
                    button.style.width = rect.width + 'px';
                    button.style.height = rect.height + 'px';
                    button.style.borderRadius = '50%';
                    // Кнопки должны оставаться кликабельными!
                    button.style.pointerEvents = 'auto';

                    // Сохраняем оригинальные данные кнопки
                    button._isButton = true;
                    button._href = button.href;
                    button._onclick = button.onclick;

                    // Добавляем тело в мир
                    Composite.add(anim.engine.world, body);
                    anim.activeBodies++;

                    // Через небольшую задержку делаем тело динамичным
                    setTimeout(() => {
                        if (body && animations[itemId]?.isActive) {
                            Body.setStatic(body, false);
                            
                            // Добавляем небольшой случайный импульс для разнообразия
                            if (Math.random() > 0.7) {
                                const force = 0.01 + Math.random() * 0.02;
                                const angle = Math.random() * Math.PI * 2;
                                Body.applyForce(body, body.position, {
                                    x: Math.cos(angle) * force,
                                    y: Math.sin(angle) * force
                                });
                            }
                        }
                    }, 100);

                }, index * FALL_DELAY); // Задержка между созданием тел
            });

            // стены невидимые
            const w = container.clientWidth;
            const h = container.clientHeight;
            const thickness = 100;
            const walls = [
                Bodies.rectangle(w/2, -thickness/2, w, thickness, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(w/2, h+thickness/2, w, thickness, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(-thickness/2, h/2, thickness, h, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(w+thickness/2, h/2, thickness, h, { isStatic: true, render: { visible: false } })
            ];

            // Создаем один MouseConstraint для всего мира
            const mouse = Mouse.create(anim.render.canvas);
            anim.mouseConstraint = MouseConstraint.create(anim.engine, {
                mouse: mouse,
                constraint: { 
                    stiffness: 0.2, 
                    damping: 0.4, 
                    render: { visible: false } 
                }
            });

            Composite.add(anim.engine.world, [...walls, anim.mouseConstraint]);

            // Постепенно включаем гравитацию
            let gravityStep = 0;
            const gravityInterval = setInterval(() => {
                if (!animations[itemId]?.isActive) {
                    clearInterval(gravityInterval);
                    return;
                }
                gravityStep += 0.3;
                anim.engine.world.gravity.y = Math.min(gravityStep, 1.5);
                
                if (gravityStep >= 1.5) {
                    clearInterval(gravityInterval);
                }
            }, 100);

            // Обрабатываем события перетаскивания
            Events.on(anim.mouseConstraint, 'startdrag', function(event) {
                anim.isDragging = true;
                anim.dragStartTime = Date.now();
                if (event.body && event.body.domElement) {
                    event.body.domElement.style.cursor = 'grabbing';
                }
            });

            Events.on(anim.mouseConstraint, 'enddrag', function(event) {
                const dragDuration = Date.now() - anim.dragStartTime;
                anim.isDragging = false;
                
                if (event.body && event.body.domElement) {
                    event.body.domElement.style.cursor = 'grab';
                    
                    // Если перетаскивание было коротким (менее 200ms), это клик
                    if (dragDuration < 200 && event.body.domElement._isButton) {
                        // Даем небольшой таймаут чтобы события успели обработаться
                        setTimeout(() => {
                            if (!anim.isDragging) {
                                // Вызываем оригинальный клик или переходим по ссылке
                                if (event.body.domElement._onclick) {
                                    event.body.domElement._onclick();
                                } else if (event.body.domElement._href) {
                                    window.location.href = event.body.domElement._href;
                                }
                            }
                        }, 50);
                    }
                }
            });

            // Предотвращаем стандартное поведение клика на canvas
            anim.render.canvas.addEventListener('click', function(e) {
                if (anim.isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            Render.run(anim.render);
            anim.runner = Runner.create();
            Runner.run(anim.runner, anim.engine);

            function update() {
                if (!animations[itemId]?.isActive) return;
                anim.buttonBodies.forEach(body => {
                    if (body && body.domElement) {
                        const r = body.circleRadius;
                        body.domElement.style.left = (body.position.x - r) + 'px';
                        body.domElement.style.top = (body.position.y - r) + 'px';
                        body.domElement.style.transform = 'rotate(' + body.angle + 'rad)';
                    }
                });
                anim.rafId = requestAnimationFrame(update);
            }
            update();

        }, 500);
    }

    function stopAnimationWithDelay(itemId) {
        const anim = animations[itemId];
        if (!anim) return;

        if (anim.timeout) clearTimeout(anim.timeout);
        anim.timeout = setTimeout(() => {
            stopAnimation(itemId);
        }, 4000);
    }

    function stopAnimation(itemId) {
        const anim = animations[itemId];
        if (!anim) return;
        if (!anim.isActive) return;

        anim.isActive = false;

        if (anim.rafId) cancelAnimationFrame(anim.rafId);
        if (anim.runner) Matter.Runner.stop(anim.runner);
        if (anim.render) {
            Matter.Render.stop(anim.render);
            if (anim.render.canvas && anim.render.canvas.parentNode) {
                anim.render.canvas.parentNode.removeChild(anim.render.canvas);
            }
        }
        if (anim.engine) Matter.Engine.clear(anim.engine);
        if (anim.mouseConstraint) {
            Matter.Composite.remove(anim.engine.world, anim.mouseConstraint);
        }

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
            
            // Убираем временные данные
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

    window.addEventListener('resize', () => {
        document.querySelectorAll('.item-services._active').forEach(item => {
            const itemId = item.getAttribute('data-id') ||
                Array.from(itemServices).indexOf(item).toString();
            stopAnimation(itemId);
            item.classList.remove('_active');
        });
    });
}