// Массив личных комплиментов от Арсюшки для Настюшки
const compliments = [
    "Ты мой родничок 💧",
    "Самая красивая ✨",
    "Ты моё море 🌊",
    "Ты моя муза 🎨",
    "Та самая 💝",
    "Любовь моя 💖",
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
    "Моя (просто моя) 💝",
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
    "Моё тепло 🌡️",
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

// Переменная для отслеживания текущей фотографии
let currentPhotoIndex = 0;

// Функция для добавления плавающих фотографий
function addFloatingPhotos() {
    const heartsBackground = document.querySelector('.hearts-background');
    
    // Добавляем только 3 фотографии для быстрой загрузки
    for (let i = 0; i < 3; i++) {
        const photo = document.createElement('img');
        photo.className = 'floating-photo';
        photo.loading = 'lazy'; // Ленивая загрузка
        photo.src = photoList[i];
        photo.alt = 'Настюшка';
        photo.id = `photo-${i}`;
        
        // Позиции дальше от центра экрана
        const positions = [
            { top: '12%', left: '8%', animationDelay: '0s' },
            { top: '78%', left: '88%', animationDelay: '2s' },
            { top: '18%', left: '92%', animationDelay: '4s' }
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
    
    currentPhotoIndex = (currentPhotoIndex + 3) % photoList.length;
}

// Применяем случайный фон и добавляем фото
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.background = getRandomBackgroundColor();
    updateDate();
    addFloatingPhotos();
    
    // Автоматическая смена фотографий каждые 5 секунд
    setInterval(changePhotos, 5000);
});
