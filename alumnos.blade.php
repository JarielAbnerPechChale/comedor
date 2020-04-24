<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">    
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
</head>
<body>
  
<v-app id="a">    
    <v-data-table :headers="headers" :items="alumnos" :search="search" sort-by="id_alumno" class="elevation-3">     
      <template v-slot:top>    
        <v-system-bar color="indigo darken-2" dark></v-system-bar>
        <v-toolbar flat color="indigo">
            <template v-slot:extension>
            <v-btn
              fab
              color="cyan accent-2"
              bottom
              left
              absolute
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>            
          <v-toolbar-title class="white--text">Alumnos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider> 
          <v-spacer></v-spacer>  
         
            <!--  Modal del diálogo para Alta y Edicion    -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-card>
                <!-- para el EDICION-->
             <v-card-title  class="cyan white--text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>    
                
              <v-card-text>                  
                <v-container>
                  <v-row>
                    <!--EL ID NO SE MODIFICA YA QUE ES AUTOINCREMENTAL EN LA BASE DE DATOS-->
                    <!--<v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.id" label="ID"></v-text-field>
                    </v-col>-->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.nombre" label="nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.apellido_p" label="apellido_p"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.apellido_m" label="apellido_m"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.edad" label="edad"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.sexo" label="sexo"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.curp" label="curp"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.direccion" label="direccion"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.cruzamiento" label="cruzamiento"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editado.id_escuela" label="id_escuela"></v-text-field>
                    </v-col>
                    
                 </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                <v-btn color="teal accent-4" class="ma-2 white--text"  @click="guardar">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
           <!-- Barra de búsqueda  -->
          <v-col cols="12" sm="12">
             <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
          </v-col>
      </template>
      <template v-slot:item.accion="{ item }">        
        <v-btn class="mr-2" fab dark small color="cyan" @click="editar(item)">
        <v-icon dark>mdi-pencil</v-icon>
        </v-btn>   
        <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
        <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- template para el snackbar-->
    <template>
        <div class="text-center ma-2">
        <v-snackbar v-model="snackbar">
          {{ textSnack }}
          <v-btn color="info" text @click="snackbar = false">Cerrar</v-btn>
        </v-snackbar>
        </div>
    </template>    
</v-app>
<center><a href="index.blade.php">REGRESAR</a></center><br>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
  <!--Axios -->      
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>     
  <script src="codigo_vue.js"></script>
</body>
</html>