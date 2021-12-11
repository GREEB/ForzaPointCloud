import mongoose from 'mongoose'

const MapSchema = new mongoose.Schema({
  count: 'number',
  minX: 'number',
  maxX: 'number',
  minY: 'number',
  maxY: 'number',
  maxZ: 'number',
  minZ: 'number'
})

const mapModel = mongoose.models.Map || mongoose.model('Map', MapSchema) // This could fix dev hotreload mongoose overwrite error
export default mapModel
