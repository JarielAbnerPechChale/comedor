<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_empleado = (isset($_POST['id_empleado'])) ? $_POST['id_empleado'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellidop = (isset($_POST['apellidop'])) ? $_POST['apellidop'] : '';
$apellidom = (isset($_POST['apellidom'])) ? $_POST['apellidom'] : '';
$celular = (isset($_POST['celular'])) ? $_POST['celular'] : '';



switch($opcion){
    case 1:
        $consulta = "INSERT INTO empleados ( nombre, apellidop, apellidom, celular) VALUES( '$nombre', '$apellidop', '$apellidom', '$celular')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();  
           $data=$resultado->fetchAll(PDO::FETCH_ASSOC);              
        break;
    case 2:
        $consulta = "UPDATE empleados SET id_empleado='$id_empleado', nombre='$nombre', apellidop='$apellidop', apellidom='$apellidom', celular='$celular' WHERE id_empleado='$id_empleado' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM empleados WHERE id_empleado='$id_empleado' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_empleado, nombre, apellidop, apellidom, celular FROM empleados";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;