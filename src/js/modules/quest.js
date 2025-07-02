export function questInit() {
    const questRows = document.querySelectorAll('.quest__row');

    questRows.forEach(row => {
        const questItems = row.querySelectorAll('.item-quest');

        // Инициализация стилей с учетом начального состояния _active
        questItems.forEach(item => {
            const left = item.querySelector('.item-quest__left');
            const leftBody = left?.querySelector('.item-quest__body');
            const right = item.querySelector('.item-quest__right');
            const title = left?.querySelector('.item-quest__title');
            const isActive = item.classList.contains('_active'); // Проверка начального состояния

            // Установка начальных стилей
            if (left && title) {
                left.style.minHeight = `${title.scrollHeight}px`;
            }

            if (leftBody) {
                const leftHeight = leftBody.scrollHeight;
                leftBody.style.marginBottom = isActive ? '0' : `-${leftHeight}px`;
            }

            if (right) {
                const rightHeight = right.scrollHeight;
                right.style.marginBottom = isActive ? '0' : `-${rightHeight}px`;
            }
        });

        // Обработчики событий (остаются без изменений)
        questItems.forEach(item => {
            const questStr = item.querySelector('.item-quest__str');
            const leftBody = item.querySelector('.item-quest__left .item-quest__body');
            const right = item.querySelector('.item-quest__right');
            const img = item.querySelector('.item-quest__img');
            const button = item.querySelector('.item-quest__button');

            item.addEventListener('click', function(e) {
                const isClickOnExcluded = 
                    (img && img.contains(e.target)) || 
                    (button && button.contains(e.target));
                const isClickOnStr = questStr && questStr.contains(e.target);

                if (isClickOnStr && item.classList.contains('_active')) {
                    closeItem(item, leftBody, right);
                } 
                else if (isClickOnStr) {
                    closeOtherItems(questItems, item);
                    openItem(item, leftBody, right);
                }
                else if (!isClickOnExcluded && item.classList.contains('_active')) {
                    closeItem(item, leftBody, right);
                }
                else if (!isClickOnExcluded) {
                    closeOtherItems(questItems, item);
                    openItem(item, leftBody, right);
                }
            });
        });

        function closeOtherItems(allItems, currentItem) {
            allItems.forEach(otherItem => {
                if (otherItem !== currentItem && otherItem.classList.contains('_active')) {
                    const otherLeftBody = otherItem.querySelector('.item-quest__left .item-quest__body');
                    const otherRight = otherItem.querySelector('.item-quest__right');
                    closeItem(otherItem, otherLeftBody, otherRight);
                }
            });
        }

        function openItem(item, leftBody, right) {
            item.classList.add('_active');
            if (leftBody) leftBody.style.marginBottom = '0';
            if (right) right.style.marginBottom = '0';
        }

        function closeItem(item, leftBody, right) {
            item.classList.remove('_active');
            if (leftBody) {
                leftBody.style.marginBottom = `-${leftBody.scrollHeight}px`;
            }
            if (right) {
                right.style.marginBottom = `-${right.scrollHeight}px`;
            }
        }
    });
}