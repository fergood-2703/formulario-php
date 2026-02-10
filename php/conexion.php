<?php
// Configuración para MAC (MAMP)
$servidor = "localhost";
$usuario = "root";
$password = "root"; // En Mac MAMP la contraseña es "root"
$base_datos = "contact_form_db";
$puerto = 8889; // Puerto estándar de MAMP para MySQL

$conn = new mysqli($servidor, $usuario, $password, $base_datos, $puerto);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>