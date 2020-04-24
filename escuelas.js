 var url = "bd/escuela.php";

new Vue({
  el: '#esc',
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
        value: 'id_escuela',
      },
      { text: 'ID', value:'id_escuela'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'CLAVE', value: 'clave_escuela'},
      { text: 'DIRECCIÓN', value: 'direccion'},
      { text: 'CRUZAMIENTO', value: 'cruzamiento'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    escuelas:[], //definimos el array
    editedIndex: -1,
    editado: {
      id_escuela: 0,
      nombre: '',
      clave_escuela: '',
      direccion: '',
      cruzamiento: ''
    },
    defaultItem: {
      id_escuela: 0,
      nombre: '',
      clave_escuela: '',
      direccion: '',
      cruzamiento: ''
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
      this.listarEscuelas()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar  
    listarEscuelas:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.escuelas = response.data;       
        });
 
    },
    //Procedimiento Alta
    altaEscuela:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre, clave_escuela:this.clave_escuela,
          direccion:this.direccion, cruzamiento:this.cruzamiento}).then(response =>{
            this.listarEscuelas();
        });        
         this.nombre = "",
         this.clave_escuela= "",
         this.direccion = "",
         this.cruzamiento = ""
    },  
    //Procedimiento EDITAR.
    editarEscuela:function(id_escuela,nombre,clave_escuela,direccion,cruzamiento){       
       axios.post(url, {opcion:2, id_escuela:id_escuela, nombre:nombre, 
        clave_escuela:clave_escuela, direccion:direccion,cruzamiento:cruzamiento}).then(response =>{
          this.listarEscuelas();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarEscuela:function(id_escuela){
        axios.post(url, {opcion:3, id_escuela:id_escuela}).then(response =>{           
            this.listarEscuelas();
            });
    },             
    editar (item) {    
      this.editedIndex = this.escuelas.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.escuelas.indexOf(item)
      
      console.log(this.escuelas[index].id_escuela) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarEscuela(this.escuelas[index].id_escuela)    
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
        this.id_escuela=this.editado.id_escuela          
        this.nombre=this.editado.nombre
        this.clave_escuela=this.editado.clave_escuela
        this.direccion=this.direccion
        this.cruzamiento=this.editado.cruzamiento
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarEscuela(this.id_escuela,this.nombre, this.clave_escuela, 
        	this.direccion, this.cruzamiento)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre == "" || this.clave_escuela == "" || this.direccion == ""){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre, apellido paterno y materno'      
        }else{
        this.id_escuela=this.editado.id_escuela          
        this.nombre=this.editado.nombre
        this.clave_escuela=this.editado.clave_escuela
        this.direccion=this.editado.direccion
        this.cruzamiento=this.editado.cruzamiento       
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaEscuela()
        }       
      }
      this.cancelar()
    },
  },
});