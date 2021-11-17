# todo-list-app
Node.js and Express.js Para el backend de la aplicación, se utiliza MongoDB Atlas
para conectar la aplicación a una base de datos NoSQL. Lo cual le da persistencia
a la información ingresada.


 Esta es una aplicación en la cual toda la logica se encuentra del lado del servidor, 
 Se utiliza Node.js con Express.js para programar un sencillo Backend de la
 app.

 Este pequeño aplicativo fue desplegado en Heroku, link del mismo: [Todo-List](https://todo-list-1.herokuapp.com/)

 ![Todo-list-app](https://i.imgur.com/48dAmxg.jpg)

La base de datos se encuentra desplegada en la nueva, la cual es accedida desde el 
backend de la aplicación, la cual esta en la capacidad de guardar la información que 
ingresa el usuario en la base de datos, y a su vez consulta la información y la 
renderiza en el aplicativo en MongoDB desplegada en atlas puede ser observada en esta imagen.

Se tiene una collection con el nombre **Items** donde saldrán siempre los tres items por defecto,
y en la siguiente collection llamada **lists** donde se almacenará las listas modificables.

![Atlas MongoDB](https://i.imgur.com/vhgzoHK.jpg)

También se utilizan  routing parameters de Express.js para poder crear Todo-List modificables,
 y esto genera una nueva coleccion en la base de datos que almacena para cada todo-list un nuevo
 documento en esa colección

En la siguiente imagen se puede apreciar que se realiza la petición get a la dirección 
**https://todo-list-1.herokuapp.com/work** en donde el backend se encarga de crear una lista 
de no existir, y de existir procede a buscar la información:

![Work Route](https://i.imgur.com/v4DcnMu.jpg)

Y la información guardada en la base de datos se puede visualizar en la siguiente imagen:

![Atlas MongoDB work lists](https://i.imgur.com/Htddg4y.jpg)
