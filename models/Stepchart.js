import mongoose from 'mongoose';

const stepchartSchema = new mongoose.Schema({

    title: {type: String, required: true},
    difficulty: {type: String, required: true},
    type: {type: String, required: true},

}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret._links = {
                self: {
                    href: `${process.env.HOST}/stepcharts/${ret.id}`
                },
                collection: {
                    href: `${process.env.HOST}/stepcharts`
                }
            }

            delete ret._id;
        }
    }
});

const Stepchart = mongoose.model('Stepchart', stepchartSchema);

export default Stepchart;