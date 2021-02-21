<?php
//Подключаем файлы из папки PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

//Объявление плагина
$mail = new PHPMailer(true);
//Настройка кодировки
$mail->CharSet = 'UTF-8';
//Настраиваем языковой файл
$mail->setLanguage('ru', 'phpmailer/language/phpmailer.lang-ru.php');
//Включаем возможность HTML-тегов в письме
$mail->isHTML(true);

//От кого письмо
$mail->setFrom('romeroletsgo@mail.ru', 'Romero');
//Кому отправить
$mail->addAddress('roman_shkapov@mail.ru');
//Тема письма
$mail->Subject = "Очень важное письмо";

//Рука
$hand = "Правая";
if ($_POST['hand'] == "left") {
    $hand = "Левая";
} else {
    $hand = "Правая";
}

//Тело письма
$body = '<h1>Встречайте супер письмо!</h1>';
//Проверяем на пустоту поля,если не пустое выводим текст в лэйбл
if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong>' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong>' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['hand']))) {
    $body .= '<p><strong>Рука:</strong>' . $_POST['hand'] . '</p>';
}
if (trim(!empty($_POST['age']))) {
    $body .= '<p><strong>Возраст:</strong>' . $_POST['age'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Сообщение:</strong>' . $_POST['message'] . '</p>';
}

//Прикрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
    //Путь загрузки файлов
    $filePath = __DIR__ . "files/" . $_FILES['image']['name'];
    //Грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= "<p><strong>Фото в приложении</strong></p>";
        $mail->addAttachment($fileAttach);
    }
}

//Собранную переменную присваиваем в плагин
$mail->Body = $body;

//Обработчик отправки
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

//Формируем json
$response = ['message' => $message];

//С заголовком json возвращаем JS
header('Content-type: application/json');
echo json_encode($response);
