const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const { Disco, Artista } = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017').then(console.log('MongoDB está conectado')).catch(err => {
    console.log('MongoDB NO conectado!: ' + err)
})

// prueba

let cruzCafuneArtista = new Artista({
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Carlos',
    género: 'Rap',
    fechaDeNacimiento: 210195,
    nacionalidad: 'española',
    nombreArtistico: 'Cruz Cafuné'

})

// cruzCafuneArtista.save().then(console.log('Cruz Cafuné añadido correctamente')).catch(e => console.error('No se ha podido guardar Cruz Cafuné en la base de datos' + e))

let Disco1 = new Disco({
    _id: new mongoose.Types.ObjectId(),
    titulo: 'Me muevo con Dios',
    artista: cruzCafuneArtista._id,
    anyo: 2023,
    género: 'rap',
    stock: 124,
    formato: 'físico y online'
})

// Disco1.save().then(console.log('El disco se ha añadido correctamente')).catch(e => console.error('No se ha podido guardar el disco' + e))

// Get para recibir lista entera de discos en stock

app.get('/discos', async (req, res) => {
    try {
        let results = await Disco.find({ stock: { $gt: 0 } })
        results.length > 0
            ? res.send({ mensaje: 'Se ha completado la petición', results })
            : res.send({ mensaje: "La peticion no ha devuelto resultados", results })
    } catch (error) {
        res.send('No se ha podido completar la petición', error)
    }
})

// get para recibir un disco en concreto

app.get('/discos/:titulo', async (req, res) => {
    try {
        let results = await Disco.find({
            $or: [
                { _id: req.params.idOTitulo },
                { titulo: req.params.idOTitulo }
            ]
        }).populate('artista')
        results.length > 0
            ? res.send({ mensaje: 'Disco encontrado', results })
            : res.send({ mensaje: 'No se ha podido encontrar el disco', results })
    } catch (error) {
        res.send('No ha sido posible encontrar el disco', error)
    }
})

// post para añadir disco

app.post('/anyadirDisco', async (req, res) => {
    try {
        let { titulo, artista, anyo, género, stock, formato } = req.body
        let results = await Disco.create({ titulo, artista, anyo, género, stock, formato })
            ? res.send({ mensaje: 'Disco añadido correctamente', results })
            : res.send({ mensaje: 'No se ha pidido añadir el disco', results })
    } catch (error) {
        res.send('No se ha podido añadir el disco', error)
    }
})

// post para añadir artista

app.post('/anyadirArtista', async (req, res) => {
    try {
        let { nombre, género, fechaDeNacimiento, nacionalidad, nombreArtistico } = req.body
        let results = await Disco.create({ nombre, género, fechaDeNacimiento, nacionalidad, nombreArtistico })
            ? res.send({ mensaje: 'Artista añadido correctamente', results })
            : res.send({ mensaje: 'No se ha podido añadir el artista', results })
    } catch (error) {
        res.send('No se ha podido añadir el disco', error)
    }
})

// put para actualizar disco

app.put('/discos/:id', async (req, res) => {
    try {
        let results = await Disco.findByIdAndUpdate(req.params.id, req.body, { new: true })
            ? res.send({ mensaje: 'Disco actualizado correctamente', results })
            : res.send({ mensaje: 'No se ha podido actualizar el disco', results })
    } catch (error) {
        res.send('No se ha podido actualizar el disco', error)
    }
})

// actualizar artista

app.put('/artista/:id', async (req, res) => {
    try {
        let results = await Artista.findByIdAndUpdate(req.params.id, req.body, { new: true })
            ? res.send({ mensaje: 'Artista actualizado correctamente', results })
            : res.send({ mensaje: 'No se ha podido actualizar el artista', results })
    } catch (error) {
        res.send('No se ha podido actualizar el artista', error)
    }
})

// eliminar

app.delete('/discos/:id', async (req, res) => {
    try {
        const results = await Disco.findByIdAndDelete(req.params.id)
            ? res.send({ mensaje: 'El disco ha sido borrado', results })
            : res.send({ mensaje: 'El disco no ha podido borrarse', results })
    } catch (error) {
        res.send({ mensaje: 'No ha sido posible hacer la petición' })
    }
})

app.delete('/artista/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndDelete(req.params.id)
            ? res.send({ mensaje: 'El artista ha sido borrado', results })
            : res.send({ mensaje: 'El artista no ha podido borrarse', results })
    } catch (error) {
        res.send({ mensaje: 'No ha sido posible hacer la petición' })
    }
})



app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

});