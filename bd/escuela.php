<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_escuela = (isset($_POST['id_escuela'])) ? $_POST['id_escuela'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$clave_escuela = (isset($_POST['clave_escuela'])) ? $_POST['clave_escuela'] : '';
$direccion = (isset($_POST['direccion'])) ? $_POST['direccion'] : '';
$cruzamiento = (isset($_POST['cruzamiento'])) ? $_POST['cruzamiento'] : '';



switch($opcion){
    case 1:
        $consulta = "INSERT INTO escuelas ( nombre, clave_escuela, direccion, cruzamiento) VALUES( '$nombre', '$clave_escuela', '$direccion', '$cruzamiento') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 2:
        $consulta = "UPDATE escuelas SET id_escuela='$id_escuela', nombre='$nombre', clave_escuela='$clave_escuela', direccion='$direccion', cruzamiento='$cruzamiento' WHERE id_escuela='$id_escuela' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM escuelas WHERE id_escuela='$id_escuela' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_escuela, nombre, clave_escuela, direccion, cruzamiento FROM escuelas";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;