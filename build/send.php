<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $infos = $_POST['data'];

    foreach($infos as $info){
        $var_name = $info['name'];
        $$var_name = $info['value'];
    }

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF;                      //Enable verbose debug output
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';                                         //Send using SMTP
        $mail->Host       = 'smtp-relay.sendinblue.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'thimholanda@gmail.com';                     //SMTP username
        $mail->Password   = '6ph81KYmTVPqax37';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('sac@bausch.com', 'Lentes Lunare');
        $mail->addAddress('sac@bausch.com', 'SAC Bausch');     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = "Novo contato de {$nome} por meio do site \"Lentes Lunare\"";
        $mail->Body    = "
            <h1>Novo contato de {$nome} por meio do site \"Lentes Lunare\"</h1>
            <h2>Confira os dados do contato:</h2>
            <ul>
                <li><b>E-mail:</b> {$email}</li>
                <li><b>Telefone:</b> {$telefone}</li>
                <li><b>Nome:</b> {$nome}</li>
                <li><b>Mensagem:</b> {$mensagem}</li>
            </ul>
        ";
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        die('1');
    } catch (Exception $e) {
        die('0');
        //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }


    
?>