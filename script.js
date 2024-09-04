// Эмуляция серверной базы данных ключей (для демонстрации)
const validKeys = ['ABC123', 'XYZ789', 'KEY456'];

// Функция для отображения или скрытия меню
function toggleKeyForm() {
    const keyForm = document.getElementById('keyForm');
    keyForm.classList.toggle('show');
}

// Функция для проверки количества введенных символов
function validateInput() {
    const keyInput = document.querySelector('.input').value;
    const submitButton = document.querySelector('.sign');

    if (keyInput.length >= 3) {
        submitButton.disabled = false;
        submitButton.classList.add('enabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.remove('enabled');
    }
}

// Функция для отправки ключа (асинхронная версия для работы с сервером)
async function submitKey() {
    const keyInput = document.querySelector('.input').value;

    try {
        const response = await fetch('http://localhost:3000/validate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: keyInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.valid) {
            //console.log('Key is valid');
            alert('Ключ принят! Добро пожаловать.');
            toggleKeyForm(); // Закрываем меню после ввода
        } else {
            //console.log('Key is invalid');
            alert('Неверный ключ. Пожалуйста, попробуйте снова.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при проверке ключа.');
    }
}

// Функция для скрытия меню при клике вне его границ
function handleOutsideClick(event) {
    const keyForm = document.getElementById('keyForm');
    const formContainer = document.querySelector('.form-container');
    const isClickInsideForm = formContainer.contains(event.target);
    const isClickOnToggleBtn = event.target.classList.contains('boton-elegante');

    // Если клик был вне формы и не на кнопке открытия, закрываем форму
    if (keyForm.classList.contains('show') && !isClickInsideForm && !isClickOnToggleBtn) {
        toggleKeyForm();
    }
}

// Привязываем события
document.querySelector('.input').addEventListener('input', validateInput);
document.querySelector('.sign').addEventListener('click', submitKey); // Добавлено событие для кнопки
document.addEventListener('click', handleOutsideClick);
