const mongoose = require('mongoose')

// esquema disco

const discoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre es un requisito']
    },
    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artista'
    },
    anyo: {
        type: Number,
        required: [true, 'El año es un requisito']
    },
    género: String,
    stock: {
        type: Number,
        required: [true, 'El año es un requisito']
    },
    formato: String,
}
)

// esquema artista

const artistaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un requisito']
    },
    género: {
        type: String,
        required: [true, 'El género es un requisito']
    },
    fechaDeNacimiento: Number,
    nacionalidad: {
        type: String,
        required: [true, 'La nacionalidad es un requisito']
    },
    nombreArtistico: String
})

// instanciamos los dos modelos

const Disco = mongoose.model('disco', discoSchema)
cmongoose.onnections Artista = mongoose.model('artista', artistaSchema)

module.exports = { Disco, Artista }