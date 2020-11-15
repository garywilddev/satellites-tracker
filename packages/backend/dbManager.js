import mongoose from 'mongoose'

export default {
  Position: mongoose.model('Position', {
    satid: Number,
    satname: String,
    satlatitude: Number,
    satlongitude: Number,
    sataltitude: Number,
    timestamp: {
      type: Date,
      /* create a ttl index on field timestamp
    so mongo can clean up object at timestamp + 1s */
      expires: 1,
    },
  }),
}
