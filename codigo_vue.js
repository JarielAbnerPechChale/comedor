var url = "bd/crud_alumno.php";

new Vue({
  el: '#a',
  vuetify: new Vuetify(),
  data: () => ({ 
    search: '', //para el cuadro de búsqueda de datatables  
    snackbar: false, //para el mensaje del snackbar   
    textSnack: 'texto snackbar', //texto que se ve en el snackbar 
    dialog: false, //para que la ventana de dialogo o modal no aparezca automáticamente      
    //definimos los headers de la datatables  
    headers: [
      {
        text: 'ID',
        align: 'left',
        sortable: false,
        value: 'id_alumno',
      },
      { text: 'ID', value:'id_alumno'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'APELLIDO PATERNO', value: 'apellido_p'},
      { text: 'APELLIDO MATERNO', value: 'apellido_m'},
      { text: 'EDAD', value: 'edad'},
      { text: 'SEXO', value: 'sexo'},
      { text: 'CURP', value: 'curp'},
      { text: 'DIRECCION', value: 'direccion'},
      { text: 'CRUZAMIENTO', value: 'cruzamiento'},
      { text: 'ID_ESC', value: 'id_escuela'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    alumnos: [],
    escuelas:[], //definimos el array moviles
    editedIndex: -1,
    editado: {
      id_alumno: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      edad: '',
      sexo: '',
      curp: '',
      direccion: '',
      cruzamiento: '',
      id_escuela:''
    },
    defaultItem: {
      id_alumno: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      edad: '',
      sexo: '',
      curp: '',
      direccion: '',
      cruzamiento: '',
      id_escuela:''
    },
  }),

  computed: {
    //Dependiendo si es Alta o Edición cambia el título del modal  
    formTitle () {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>    
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
    },
  },

  watch: {
    dialog (val) {
      val || this.cancelar()
    },
  },

  created() {
      this.listarAlumnos()
      this.escuelas()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar moviles  
    listarAlumnos:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.alumnos = response.data;       
        });
      },

    escuelas:function(){
      axios.post(url, {opcion:5}).then(response =>{
        this.escuelas = response.data;
      });
    },
    //Procedimiento Alta de alumnos.
    altaAlumno:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre, apellido_p:this.apellido_p ,
          apellido_m:this.apellido_m, edad:this.edad, sexo:this.sexo, 
          curp:this.curp, direccion:this.direccion, cruzamiento:this.cruzamiento, id_escuela:this.id_escuela}).then(response =>{
            this.listarAlumnos();
        });        
         this.nombre = "",
         this.apellido_p = "",
         this.apellido_m = "",
         this.edad = "",
         this.sexo = "",
         this.curp = "",
         this.direccion = "",
         this.cruzamiento = "",
         this.id_escuela=""
    },  
    //Procedimiento EDITAR.
    editarAlumno:function(id_alumno,nombre,apellido_p,apellido_m,edad,sexo,curp,direccion,cruzamiento,id_escuela){       
       axios.post(url, {opcion:2, id_alumno:id_alumno, nombre:nombre, 
        apellido_p:apellido_p, apellido_m:apellido_m, 
        edad:edad, sexo:sexo, curp:curp, direccion:direccion, 
        cruzamiento:cruzamiento,id_escuela:id_escuela}).then(response =>{
          this.listarAlumnos();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarAlumno:function(id_alumno){
        axios.post(url, {opcion:3, id_alumno:id_alumno}).then(response =>{           
            this.listarAlumnos();
            });
    },             
    editar (item) {    
      this.editedIndex = this.alumnos.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.alumnos.indexOf(item)
      
      console.log(this.alumnos[index].id_alumno) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarAlumno(this.alumnos[index].id_alumno)    
        this.snackbar = true
        this.textSnack = 'Se eliminó el registro.'    
        } else {
        this.snackbar = true
        this.textSnack = 'Operación cancelada.'    
        }    
    },
    cancelar () {
      this.dialog = false
      this.editado = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    guardar () {
      if (this.editedIndex > -1) {
          //Guarda en caso de Edición
        this.id_alumno=this.editado.id_alumno          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.edad=this.editado.edad
        this.sexo=this.editado.sexo
        this.curp=this.editado.curp
        this.direccion=this.editado.direccion
        this.cruzamiento=this.editado.cruzamiento
        this.id_escuela=this.editado.id_escuela
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarAlumno(this.id_alumno,this.nombre, this.apellido_p, this.apellido_m, this.edad, this.sexo, this.curp, this.direccion, this.cruzamiento, this.id_escuela)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre == "" || this.editado.apellido_p == "" || this.editado.apellido_m == ""){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre, apellido paterno y materno'      
        }else{
        this.id_alumno=this.editado.id_alumno          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.edad=this.editado.edad
        this.sexo=this.editado.sexo
        this.curp=this.editado.curp
        this.direccion=this.editado.direccion
        this.cruzamiento=this.editado.cruzamiento
        this.id_escuela=this.editado.id_escuela         
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaAlumno()
        }       
      }
      this.cancelar()
    },
  },
});