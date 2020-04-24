 var url = "bd/padres.php";

new Vue({
  el: '#u',
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
        value: 'id_representante',
      },
      { text: 'ID', value:'id_representante'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'APELLIDO PATERNO', value: 'apellido_p'},
      { text: 'APELLIDO MATERNO', value: 'apellido_m'},
      { text: 'CELULAR', value: 'celular'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    representantes: [], //definimos el array
    editedIndex: -1,
    editado: {
      id_representante: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      celular: ''
    },
    defaultItem: {
      id_representante: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
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
      this.listarRepresentantes()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar  
    listarRepresentantes:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.representantes = response.data;       
        });
 
    },
    //Procedimiento Alta
    altaRepresentante:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre, apellido_p:this.apellido_p ,
          apellido_m:this.apellido_m, celular:this.celular}).then(response =>{
            this.listarRepresentantes();
        });        
         this.nombre = "",
         this.apellido_p= "",
         this.apellido_m = "",
         this.celular = ""
    },  
    //Procedimiento EDITAR.
    editarRepresentante:function(id_representante,nombre,apellido_p,apellido_m,celular){       
       axios.post(url, {opcion:2, id_representante:id_representante, nombre:nombre, 
        apellido_p:apellido_p, apellido_m:apellido_m,celular:celular}).then(response =>{
          this.listarRepresentantes();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarRe:function(id_representante){
        axios.post(url, {opcion:3, id_representante:id_representante}).then(response =>{           
            this.listarRepresentantes();
            });
    },             
    editar (item) {    
      this.editedIndex = this.representantes.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.representantes.indexOf(item)
      
      console.log(this.representantes[index].id_representante) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarRe(this.representantes[index].id_representante)    
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
        this.id_representante=this.editado.id_representante          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.celular=this.editado.celular
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarRepresentante(this.id_representante,this.nombre, this.apellido_p, 
        	this.apellido_m, this.celular)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre == "" || this.editado.apellido_p == "" || this.editado.apellido_m == ""){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre, apellido paterno y materno'      
        }else{
        this.id_representante=this.editado.id_representante          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.celular=this.editado.celular       
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaRepresentante()
        }       
      }
      this.cancelar()
    },
  },
});