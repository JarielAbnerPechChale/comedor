<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_usuario = (isset($_POST['id_usuario'])) ? $_POST['id_usuario'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellido_p = (isset($_POST['apellido_p'])) ? $_POST['apellido_p'] : '';
$apellido_m = (isset($_POST['apellido_m'])) ? $_POST['apellido_m'] : '';
$correo = (isset($_POST['correo'])) ? $_POST['correo'] : '';
$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$contrasenia = (isset($_POST['contrasenia'])) ? $_POST['contrasenia'] : '';



switch($opcion){
    case 1:
        $consulta = "INSERT INTO usuarios ( nombre, apellido_p, apellido_m, correo, usuario, contrasenia) VALUES( '$nombre', '$apellido_p', '$apellido_m', '$correo', '$usuario', '$contrasenia')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();  
           $data=$resultado->fetchAll(PDO::FETCH_ASSOC);              
        break;
    case 2:
        $consulta = "UPDATE usuarios SET id_usuario='$id_usuario', nombre='$nombre', apellido_p='$apellido_p', apellido_m='$apellido_m', correo='$correo', usuario='usuario', contrasenia='$contrasenia' WHERE id_usuario='$id_usuario' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM usuarios WHERE id_usuario='$id_usuario' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_usuario, nombre, apellido_p, apellido_m, correo, usuario, contrasenia FROM usuarios";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;