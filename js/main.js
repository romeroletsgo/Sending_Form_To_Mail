"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('__sending');
            //     let response = await fetch('sendmail.php', {
            //         method: 'POST',
            //         body: formData
            //     });
            //     if(response.ok){
            //         let result = await response.json();
            //         alert(result.message);
            //         formPreview.innerHTML = '';
            //         form.reset();
            //         form.classList.remove('__sending');
            //     } else {
            //         alert('Ошибка');
            //         form.classList.remove('__sending');
            //     }
            // } else {
            //     alert('Заполните обязательные поля')
            // }
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.__req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('__email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('__error');
        input.classList.add('__error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('__error');
        input.classList.remove('__error');
    }

    //Функция теста email регулярным выражением
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

    //Получаем input file в переменную
    const formImage = document.getElementById('formImage');
    //Получаем div для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Слушаем изменения в инпуте file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        //Проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return;
        }
        //Проверяем размер файла (<2 Мб)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 МБ.');
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});