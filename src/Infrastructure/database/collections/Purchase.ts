import mongoose from 'mongoose'
import Purchase from '../../../Domain/entities/Purchase';

const PurchaseSchema = new mongoose.Schema<Purchase>(
    {
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ingredient",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    });

const PurchaseModel = mongoose.model<Purchase>('purchase', PurchaseSchema);

export default PurchaseModel;
