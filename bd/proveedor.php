<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_proveedor = (isset($_POST['id_proveedor'])) ? $_POST['id_proveedor'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';



switch($opcion){
    case 1:
        $consulta = "INSERT INTO proveedores ( nombre) VALUES( '$nombre')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();  
           $data=$resultado->fetchAll(PDO::FETCH_ASSOC);              
        break;
    case 2:
        $consulta = "UPDATE proveedores SET id_proveedor='$id_proveedor', nombre='$nombre' WHERE id_proveedor'$id_proveedor' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM proveedores WHERE id_proveedor='$id_proveedor' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_proveedor, nombre FROM proveedores";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;