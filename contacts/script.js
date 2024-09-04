document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('messageInput');
    const submitButton = document.getElementById('submitButton');
    const feedback = document.getElementById('feedback');
    let isSubmitted = false;

    // Функция для проверки длины текста в поле ввода
    function validateInput() {
        if (messageInput.value.length >= 8) {
            submitButton.disabled = false;
            submitButton.classList.add('enabled'); // Убедитесь, что этот класс определен в CSS для видимого изменения состояния кнопки
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove('enabled');
        }
    }

    // Обработчик ввода в поле
    messageInput.addEventListener('input', validateInput);

    // Функция для отправки сообщения
    async function submitMessage() {
        if (isSubmitted) {
            feedback.textContent = 'Вы уже отправили письмо. Пожалуйста, подождите перед отправкой нового.';
            return;
        }

        if (messageInput.value.length < 8) {
            feedback.textContent = 'Сообщение должно содержать минимум 8 символов.';
            return;
        }

        feedback.textContent = ''; // Очистить сообщение об ошибке
        isSubmitted = true;
        submitButton.disabled = true;

        // Пример отправки сообщения, можно заменить на реальный запрос
        try {
            // Имитация отправки сообщения
            await new Promise(resolve => setTimeout(resolve, 2000)); // Имитируем задержку

            // Если сообщение успешно отправлено
            console.log('Сообщение отправлено:', messageInput.value);
            alert('Сообщение отправлено!');

            // Сброс состояния после успешной отправки
            messageInput.value = '';
            validateInput(); // Проверка состояния кнопки после сброса
            isSubmitted = false;
            submitButton.disabled = false;

        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            alert('Произошла ошибка при отправке сообщения.');
        }
    }

    // Обработчик клика по кнопке
    submitButton.addEventListener('click', submitMessage);
});
