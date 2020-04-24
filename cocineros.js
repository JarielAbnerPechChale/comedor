 var url = "bd/cocineros.php";

new Vue({
  el: '#emp',
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
        value: 'id_empleado',
      },
      { text: 'ID', value:'id_empleado'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'APELLIDO PATERNO', value: 'apellidop'},
      { text: 'APELLIDO MATERNO', value: 'apellidom'},
      { text: 'CELULAR', value: 'celular'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    empleados: [], //definimos el array
    editedIndex: -1,
    editado: {
      id_empleado: 0,
      nombre: '',
      apellidop: '',
      apellidom: '',
      celular: ''
    },
    defaultItem: {
      id_empleado: 0,
      nombre: '',
      apellidop: '',
      apellidom: '',
      celular: ''
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
      this.listarEmpleados()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar  
    listarEmpleados:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.empleados = response.data;       
        });
 
    },
    //Procedimiento Alta
    altaEmpleado:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre, apellidop:this.apellidop ,
          apellidom:this.apellidom, celular:this.celular}).then(response =>{
            this.listarEmpleados();
        });        
         this.nombre = "",
         this.apellidop= "",
         this.apellidom = "",
         this.celular = ""
    },  
    //Procedimiento EDITAR.
    editarEmpleado:function(id_empleado,nombre,apellidop,apellidom,celular){       
       axios.post(url, {opcion:2, id_empleado:id_empleado, nombre:nombre, 
        apellidop:apellidop, apellidom:apellidom,celular:celular}).then(response =>{
          this.listarEmpleados();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarEmpleado:function(id_empleado){
        axios.post(url, {opcion:3, id_empleado:id_empleado}).then(response =>{           
            this.listarEmpleados();
            });
    },             
    editar (item) {    
      this.editedIndex = this.empleados.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.empleados.indexOf(item)
      
      console.log(this.empleados[index].id_empleado) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarEmpleado(this.empleados[index].id_empleado)    
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
        this.id_empleado=this.editado.id_empleado          
        this.nombre=this.editado.nombre
        this.apellidop=this.editado.apellidop
        this.apellidom=this.editado.apellidom
        this.celular=this.editado.celular
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarEmpleado(this.id_empleado,this.nombre, this.apellidop, 
        	this.apellidom, this.celular)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre == "" || this.editado.apellidop == "" || this.editado.apellidom == ""){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre, apellido paterno y materno'      
        }else{
        this.id_empleado=this.editado.id_empleado          
        this.nombre=this.editado.nombre
        this.apellidop=this.editado.apellidop
        this.apellidom=this.editado.apellidom
        this.celular=this.editado.celular       
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaEmpleado()
        }       
      }
      this.cancelar()
    },
  },
});