<?php
include 'conexion.php';

$errores = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Limpiar datos (Seguridad)
    $nombre = $conn->real_escape_string(trim($_POST['nombre']));
    $apellido = $conn->real_escape_string(trim($_POST['apellido']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $tipo_consulta = isset($_POST['tipo-consulta']) ? $conn->real_escape_string($_POST['tipo-consulta']) : '';
    $mensaje = $conn->real_escape_string(trim($_POST['mensaje']));
    $consentimiento = isset($_POST['consentimiento']) ? 1 : 0;

    // 2. Validaciones (Backend)
    if (empty($nombre)) $errores[] = "Falta el nombre.";
    if (empty($apellido)) $errores[] = "Falta el apellido.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = "Email inválido.";
    if (empty($tipo_consulta)) $errores[] = "Selecciona un tipo de consulta.";
    if (empty($mensaje)) $errores[] = "Escribe un mensaje.";
    if (!$consentimiento) $errores[] = "Debes aceptar los términos.";

    // 3. Guardar o Rechazar
    if (empty($errores)) {
        $sql = "INSERT INTO formularios (nombre, apellido, email, tipo_consulta, mensaje, consentimiento) 
                VALUES ('$nombre', '$apellido', '$email', '$tipo_consulta', '$mensaje', '$consentimiento')";

        if ($conn->query($sql) === TRUE) {
            // Éxito: Redirigir al inicio con señal de éxito
            header("Location: ../index.html?status=success");
            exit();
        } else {
            echo "Error BBDD: " . $conn->error;
        }
    } else {
        // Error: Mostrar alerta y regresar
        $msg = implode("\\n", $errores);
        echo "<script>alert('$msg'); window.history.back();</script>";
    }
}
?>