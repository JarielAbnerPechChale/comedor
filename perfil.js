 var url = "bd/perfil.php";

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
        value: 'id_usuario',
      },
      { text: 'ID', value:'id_usuario'},
      { text: 'NOMBRE', value:'nombre'},
      { text: 'APELLIDO PATERNO', value: 'apellido_p'},
      { text: 'APELLIDO MATERNO', value: 'apellido_m'},
      { text: 'CORREO', value: 'correo'},
      { text: 'USUARIO', value: 'usuario'},
      { text: 'CONTRASEÑA', value: 'contrasenia'},
      { text: 'ACCIONES', value: 'accion', sortable: false },
    ],
    usuarios: [], //definimos el array
    editedIndex: -1,
    editado: {
      id_usuario: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      correo: '',
      usuario: '',
      contrasenia: ''
    },
    defaultItem: {
      id_usuario: 0,
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      correo: '',
      usuario: '',
      contrasenia: ''
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
      this.listarUsuarios()
  },

  methods: {      
     //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar  
    listarUsuarios:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.usuarios = response.data;       
        });
 
    },
    //Procedimiento Alta
    altaUsuario:function(){
        axios.post(url, {opcion:1,  nombre:this.nombre, apellido_p:this.apellido_p ,
          apellido_m:this.apellido_m, correo:this.correo, usuario:this.usuario, 
          contrasenia:this.contrasenia}).then(response =>{
            this.listarUsuarios();
        });        
         this.nombre = "",
         this.apellido_p= "",
         this.apellido_m = "",
         this.correo = "",
         this.usuario = "",
         this.contrasenia = ""
    },  
    //Procedimiento EDITAR.
    editarUsuario:function(id_usuario,nombre,apellido_p,apellido_m,correo,usuario,contrasenia){       
       axios.post(url, {opcion:2, id_usuario:id_usuario, nombre:nombre, 
        apellido_p:apellido_p, apellido_m:apellido_m, 
        correo:correo, usuario:usuario, contrasenia:contrasenia}).then(response =>{
          this.listarUsuarios();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarUsuario:function(id_usuario){
        axios.post(url, {opcion:3, id_usuario:id_usuario}).then(response =>{           
            this.listarUsuarios();
            });
    },             
    editar (item) {    
      this.editedIndex = this.usuarios.indexOf(item)
      this.editado = Object.assign({}, item)
      this.dialog = true
    },
    borrar (item) { 
      const index = this.usuarios.indexOf(item)
      
      console.log(this.usuarios[index].id_usuario) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.borrarUsuario(this.usuarios[index].id_usuario)    
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
        this.id_usuario=this.editado.id_usuario          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.correo=this.editado.correo
        this.usuario=this.editado.usuario
        this.contrasenia=this.editado.contrasenia
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarUsuario(this.id_usuario,this.nombre, this.apellido_p, 
        	this.apellido_m, this.correo, this.usuario, this.contrasenia)  
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.nombre == "" || this.editado.apellido_p == "" || this.editado.apellido_m == ""){
          this.snackbar = true
          this.textSnack = 'campos necesarios: nombre, apellido paterno y materno'      
        }else{
        this.id_usuario=this.editado.id_usuario          
        this.nombre=this.editado.nombre
        this.apellido_p=this.editado.apellido_p
        this.apellido_m=this.editado.apellido_m
        this.correo=this.editado.correo
        this.usuario=this.editado.usuario
        this.contrasenia=this.editado.contrasenia       
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaUsuario()
        }       
      }
      this.cancelar()
    },
  },
});