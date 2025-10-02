// Массив личных комплиментов от Арсюшки для Настюшки
const compliments = [
    "Ты мой родничок 💧",
    "Самая красивая ✨",
    "Ты моё море 🌊",
    "Ты моя муза 💔",
    "Та самая 💔",
    "Любовь моя 🖤",
    "Близкий мой человечек 👥",
    "Мой котенок 🐱",
    "Моя нежность 😌",
    "Солнышко моё ☀️",
    "Радость моя 😊",
    "Звёздочка моя ⭐",
    "Моя Настюшка секси-шмекси 💃",
    "Моё счастье 😍",
    "Мой супергерой 🦸‍♀️",
    "Моя единственная 💕",
    "Цветочек мой 🌸",
    "Моё сокровище 💎",
    "Самая умная 🧠",
    "Ангелочек мой 👼",
    "Самая чувственная 💫",
    "Родная 👨‍👩‍👧‍👦",
    "Моя (просто моя)",
    "Душа моя 🌟",
    "Когда смотрю на тебя всегда тепло на душе 🔥",
    "Ты озаряешь даже самый темный уголок 💡",
    "Моя муза 🎭",
    "Всегда готов положиться на тебя 🤝",
    "Моя мечта 🌙",
    "Я обожаю твой нежный голос 🎵",
    "Ты моя звезда ⭐",
    "Моя любовь 💕",
    "Моя грушка 🍐",
    "Моя се-мья 👨‍👩‍👧‍👦",
    "Трусигмочка) 👙",
    "Моя забота 🤗",
    "Моё тепло 😘",
    "Ты мой уют 🏠",
    "Всё моё 🎁"
];

// DOM элементы
const complimentText = document.getElementById('compliment-text');
const newComplimentBtn = document.getElementById('new-compliment-btn');
const currentDateElement = document.getElementById('current-date');

// Функция для получения случайного комплимента
function getRandomCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    return compliments[randomIndex];
}

// Функция для обновления комплимента с анимацией
function updateCompliment() {
    // Добавляем класс для анимации исчезновения
    complimentText.style.opacity = '0';
    complimentText.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        // Получаем новый комплимент
        const newCompliment = getRandomCompliment();
        
        // Обновляем текст
        complimentText.textContent = newCompliment;
        
        // Убираем старый класс и добавляем новый для анимации появления
        complimentText.classList.remove('animated');
        void complimentText.offsetWidth; // Принудительное перерисовывание
        
        complimentText.classList.add('animated');
        
        // Возвращаем стили для анимации появления
        complimentText.style.opacity = '1';
        complimentText.style.transform = 'scale(1)';
        
    }, 400);
}

// Функция для обновления текущей даты
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
}

// Обработчик клика по кнопке
newComplimentBtn.addEventListener('click', () => {
    // Добавляем эффект нажатия
    newComplimentBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        newComplimentBtn.style.transform = '';
    }, 150);
    
    updateCompliment();
});

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальный комплимент
    complimentText.textContent = "Нажми кнопку, чтобы получить красивый комплимент! ✨";
    
    // Обновляем дату
    updateCompliment();
});

// Добавляем эффект снежинок на клик
function createHeartAnimation(event) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'heartFall 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Добавляем CSS анимацию для сердечек
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFall {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Добавляем эффект сердечек при клике
document.addEventListener('click', createHeartAnimation);

// Сохраняем последний показанный комплимент в localStorage
function saveLastCompliment(compliment) {
    localStorage.setItem('lastCompliment', compliment);
}

function getLastCompliment() {
    return localStorage.getItem('lastCompliment');
}

// Модифицируем функцию обновления комплимента для сохранения
function updateCompliment() {
    complimentText.style.opacity = '0';
    complimentText.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        const newCompliment = getRandomCompliment();
        complimentText.textContent = newCompliment;
        
        complimentText.classList.remove('animated');
        void complimentText.offsetWidth;
        
        complimentText.classList.add('animated');
        
        complimentText.style.opacity = '1';
        complimentText.style.transform = 'scale(1)';
        
        // Сохраняем комплимент
        saveLastCompliment(newCompliment);
        
    }, 400);
}

// Восстанавливаем последний комплимент при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const lastCompliment = getLastCompliment();
    if (lastCompliment) {
        complimentText.textContent = lastCompliment;
    } else {
        complimentText.textContent = "Нажми кнопку, чтобы получить красивый комплимент! ✨";
    }
    
    updateDate();
    updateCompliment();
});

// Добавляем случайный фон каждый день
function getRandomBackgroundColor() {
    const colors = [
        'linear-gradient(135deg, #ffb8d4 0%, #ff8fb3 50%, #ff69b4 100%)',
        'linear-gradient(135deg, #ff91a4 0%, #ff6b7a 50%, #e91e63 100%)',
        'linear-gradient(135deg, #f8bbd9 0%, #f06292 50%, #c2185b 100%)',
        'linear-gradient(135deg, #ffc0cb 0%, #ffb3ba 50%, #ff8fa3 100%)',
        'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #f06292 100%)',
        'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #e17055 100%)'
    ];
    
    const today = new Date().getDate();
    return colors[today % colors.length];
}

// Список фотографий для отображения на фоне
const photoList = [
    'фото/IMG_0088.jpg',
    'фото/IMG_0090.JPG',
    'фото/IMG_0091.JPG',
    'фото/IMG_0092.JPG',
    'фото/IMG_0093.JPG',
    'фото/IMG_0094.JPG',
    'фото/IMG_0095.JPG',
    'фото/IMG_0096.JPG',
    'фото/IMG_0097.JPG',
    'фото/IMG_0098.JPG',
    'фото/IMG_0099.JPG',
    'фото/IMG_0101.JPG',
    'фото/IMG_0103.JPG',
    'фото/IMG_0105.JPG',
    'фото/IMG_0107.JPG',
    'фото/IMG_0108.JPG',
    'фото/IMG_0109.jpg',
    'фото/IMG_0110.JPG',
    'фото/IMG_0111.JPG',
    'фото/IMG_0112.JPG',
    'фото/IMG_0114.JPG'
];

// Переменные для динамического контента
let currentPhotoIndex = 0;
let scrollElements = []; // Массив всех созданных элементов
let elementCounter = 0;

    // Функция для создания случайного элемента при скролле
    function createScrollElement() {
        const heartsBackground = document.querySelector('.hearts-background');
        const elementTypes = [
            { type: 'heart', emoji: '💖', class: 'heart' },
            { type: 'pony', emoji: '🦄', class: 'pony' },
            { type: 'candy', emoji: Math.random() > 0.5 ? '🍭' : '🍬', class: 'candy' },
            { type: 'flower', emoji: Math.random() > 0.5 ? '🌸' : '🌹', class: 'floating-emoji' },
            { type: 'animal', emoji: Math.random() > 0.5 ? '🐱' : '🐰', class: 'floating-emoji' },
            { type: 'star', emoji: Math.random() > 0.5 ? '⭐' : '✨', class: 'floating-emoji' },
            { type: 'sweet', emoji: Math.random() > 0.5 ? '🍄' : '🦋', class: 'floating-emoji' },
            { type: 'photo', src: photoList[Math.floor(Math.random() * photoList.length)], class: 'floating-photo' }
        ];
        
        const randomType = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        const element = document.createElement(randomType.type === 'photo' ? 'img' : 'div');
        
        element.className = randomType.class;
        element.id = `scroll-element-${elementCounter++}`;
        
        // Случайное позиционирование с избеганием текстовой области
        element.style.position = 'absolute';
        
        // Безопасная зона сверху (избегаем notch)
        const safeTop = Math.max(60, getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top').replace('px', '') || 0);
        const safeBottom = window.innerHeight * 0.75; // Не ниже 75% экрана чтобы избежать текст
        const safeLeft = Math.max(20, getComputedStyle(document.documentElement).getPropertyValue('--safe-area-left').replace('px', '') || 0);
        const safeRight = Math.min(80, 100 - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-right').replace('px', '') || 0));
        
        // Хаотичные позиции с учетом текстовой области в центре
        const randomTop = Math.random() * (safeBottom - safeTop) + safeTop;
        const randomLeft = Math.random() * (safeRight - safeLeft) + safeLeft;
        
        element.style.top = randomTop + 'px';
        element.style.left = randomLeft + '%';
        
        // Случайная хаотичная анимация для эмодзи
        const crazyAnimations = ['emojiFloatCrazy1', 'emojiFloatCrazy2', 'emojiFloatCrazy3', 'emojiFloatCrazy4'];
        const randomAnimSpeed = Math.random() * 4 + 6; // 6-10 секунд
        const randomDelay = Math.random() * 3;
        
        if (randomType.class === 'floating-emoji') {
            const randomAnim = crazyAnimations[Math.floor(Math.random() * crazyAnimations.length)];
            element.style.animation = `${randomAnim} ${randomAnimSpeed}s ease-in-out infinite`;
            element.style.animationDelay = randomDelay + 's';
        } else {
            element.style.animationDelay = randomDelay + 's';
        }
        
        if (randomType.type === 'photo') {
            element.src = randomType.src;
            element.loading = 'lazy';
            element.alt = 'Настюшка';
            element.style.width = '80px';
            element.style.height = '80px';
        } else {
            element.textContent = randomType.emoji;
            element.style.fontSize = '20px';
        }
        
        heartsBackground.appendChild(element);
        scrollElements.push(element);
        
        // Удаляем элемент через 8 секунд
        setTimeout(() => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
                const index = scrollElements.indexOf(element);
                if (index > -1) scrollElements.splice(index, 1);
            }
        }, 8000);
    }

// Обработчик скролла
let scrollTimeout;
function handleScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Создаем новый элемент с вероятностью 30%
        if (Math.random() < 0.3) {
            createScrollElement();
        }
    }, 200);
}

// Функция для добавления плавающих фотографий
function addFloatingPhotos() {
    const heartsBackground = document.querySelector('.hearts-background');
    
    // Добавляем только 2 фотографии для мобильных
    for (let i = 0; i < 2; i++) {
        const photo = document.createElement('img');
        photo.className = 'floating-photo';
        photo.loading = 'lazy'; // Ленивая загрузка
        photo.src = photoList[i];
        photo.alt = 'Настюшка';
        photo.id = `photo-${i}`;
        
        // Позиции дальше от центра экрана
        const positions = [
            { top: '12%', left: '8%', animationDelay: '0s' },
            { top: '78%', left: '88%', animationDelay: '2s' }
        ];
        
        photo.style.top = positions[i].top;
        photo.style.left = positions[i].left;
        photo.style.animationDelay = positions[i].animationDelay;
        
        heartsBackground.appendChild(photo);
    }
}

// Функция для смены фотографий
function changePhotos() {
    const photos = document.querySelectorAll('.floating-photo');
    
    photos.forEach((photo, index) => {
        const newIndex = (currentPhotoIndex + index + 1) % photoList.length;
        
        // Плавный переход через fade out -> обновление фото -> fade in
        photo.style.opacity = '0';
        photo.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            photo.src = photoList[newIndex];
        }, 500);
        
        setTimeout(() => {
            photo.style.opacity = '0.8';
            photo.style.transform = 'scale(1)';
        }, 1000);
    });
    
    currentPhotoIndex = (currentPhotoIndex + 2) % photoList.length;
}

// Применяем случайный фон и добавляем фото
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.background = getRandomBackgroundColor();
    updateDate();
    addFloatingPhotos();
    
    // Автоматическая смена фотографий каждые 5 секунд
    setInterval(changePhotos, 5000);
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Создаем начальные элементы для демонстрации
    setTimeout(() => createScrollElement(), 1000);
    setTimeout(() => createScrollElement(), 2000);
});
