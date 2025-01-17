import CardDetails from '../models/CardDetails.js';
import mongoose from 'mongoose';

export const getOrCreateCardDetails = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    let card = await CardDetails.findOne({ userId: objectId });
    if (!card) {
        card = new CardDetails({
            userId: objectId,
            name: "Default User",
            cardNumber: Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0'),
            expiryDate: "12/27",
        });
        await card.save();
    }

    return card;
};
