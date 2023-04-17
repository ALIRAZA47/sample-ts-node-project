import { Schema } from 'mongoose'

const mongoosePlugin = (schema: Schema) => {
    schema.pre('save', function (next) {
        console.log('pre save hook')
        next()
    })
    schema.post('save', function (doc, next) {
        console.log('post save hook')
        next()
    })
    schema.post('findOneAndUpdate', function (this, doc, next) {
        console.log('post findOneAndUpdate hook', this.getUpdate(), doc)
        next()
    })
    schema.post('insertMany', function (doc, next) {
        console.log('post insertMany hook', doc)
        next()
    })
}

export default mongoosePlugin
