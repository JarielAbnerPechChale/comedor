<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_representante = (isset($_POST['id_representante'])) ? $_POST['id_representante'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellido_p = (isset($_POST['apellido_p'])) ? $_POST['apellido_p'] : '';
$apellido_m = (isset($_POST['apellido_m'])) ? $_POST['apellido_m'] : '';
$celular = (isset($_POST['celular'])) ? $_POST['celular'] : '';



switch($opcion){
    case 1:
        $consulta = "INSERT INTO representantes ( nombre, apellido_p, apellido_m, celular) VALUES( '$nombre', '$apellido_p', '$apellido_m', '$celular')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();  
           $data=$resultado->fetchAll(PDO::FETCH_ASSOC);              
        break;
    case 2:
        $consulta = "UPDATE representantes SET id_representante='$id_representante', nombre='$nombre', apellido_p='$apellido_p', apellido_m='$apellido_m', celular='$celular' WHERE id_representante='$id_representante' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM representantes WHERE id_representante='$id_representante' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_representante, nombre, apellido_p, apellido_m, celular FROM representantes";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;