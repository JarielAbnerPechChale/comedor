 var url = "bd/proveedor.php";

new Vue({
  el: '#pro',
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
        value: 'id_proveedor',
      },
      { text: 'ID', value:'id_proveedor'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    proveedores: [], //definimos el array
    editedIndex: -1,
    editado: {
      id_proveedor: 0,
      nombre: ''
    },
    defaultItem: {
      id_proveedor: 0,
      nombre: ''
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
      this.listarProveedores()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar  
    listarProveedores:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.proveedores = response.data;       
        });
 
    },
    //Procedimiento Alta
    altaProveedor:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre}).then(response =>{
            this.listarProveedores();
        });        
         this.nombre = ""
    },  
    //Procedimiento EDITAR.
    editarPreveedor:function(id_empleado,nombre){       
       axios.post(url, {opcion:2, id_proveedor:id_proveedor, nombre:nombre}).then(response =>{
          this.listarProveedores();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarProveedor:function(id_proveedor){
        axios.post(url, {opcion:3, id_proveedor:id_proveedor}).then(response =>{           
            this.listarProveedores();
            });

    },             
    editar (item) {    
      this.editedIndex = this.proveedores.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.proveedores.indexOf(item)
      
      console.log(this.proveedores[index].id_proveedor) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarProveedor(this.proveedores[index].id_proveedor)    
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
        this.id_proveedor=this.editado.id_proveedor          
        this.nombre=this.editado.nombre
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarPreveedor(this.id_proveedor,this.nombre)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre=="" ){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre'      
        }else{
        this.id_proveedor=this.editado.id_proveedor          
        this.nombre=this.editado.nombre       
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaProveedor()
        }       
      }
      this.cancelar()
    },
  },
});