<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_alumno = (isset($_POST['id_alumno'])) ? $_POST['id_alumno'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellido_p = (isset($_POST['apellido_p'])) ? $_POST['apellido_p'] : '';
$apellido_m = (isset($_POST['apellido_m'])) ? $_POST['apellido_m'] : '';
$edad = (isset($_POST['edad'])) ? $_POST['edad'] : '';
$sexo = (isset($_POST['sexo'])) ? $_POST['sexo'] : '';
$curp = (isset($_POST['curp'])) ? $_POST['curp'] : '';
$direccion = (isset($_POST['direccion'])) ? $_POST['direccion'] : '';
$cruzamiento = (isset($_POST['cruzamiento'])) ? $_POST['cruzamiento'] : '';
$id_escuela = (isset($_POST['id_escuela'])) ? $_POST['id_escuela'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO alumnos (nombre, apellido_p, apellido_m, edad, sexo, curp, direccion, cruzamiento,id_escuela) VALUES('$nombre', '$apellido_p', '$apellido_m', '$edad', '$sexo', '$curp', '$direccion', '$cruzamiento','$id_escuela') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 2:
        $consulta = "UPDATE alumnos SET id_alumno='$id_alumno', nombre='$nombre', apellido_p='$apellido_p', apellido_m='$apellido_m', edad='$edad', sexo='$sexo', curp='$curp', direccion='$direccion', cruzamiento='$cruzamiento',id_escuela='$id_escuela' WHERE id_alumno='$id_alumno' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM alumnos WHERE id_alumno='$id_alumno' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        break;         
    case 4:
        $consulta = "SELECT id_alumno, nombre, apellido_p, apellido_m, edad, sexo, curp, direccion, cruzamiento,id_escuela FROM alumnos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;