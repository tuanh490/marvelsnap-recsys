import mongoose from "mongoose";
import fs from 'fs';
import csv from 'csv-parser';
import CardSchema from '../models/Card.js';

mongoose.connect('mongodb://localhost:27017/marvelsnap', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const desiredColumns = ['name', 'cost', 'power', 'description', 'CardSeriesDefId', 'art_base'];
const batchSize = 100;
let batch = [];

fs.createReadStream('./dataset/cleaned_cards.csv')
    .pipe(csv())
    .on('data', (row) => {
        try {
            const filteredRow = {
                name: row[desiredColumns[0]],
                cost: row['cost'],
                power: row['power'],
                ability: row['description'],
                series: row['CardSeriesDefId'],
                art: row['art_base']
            };

            batch.push(filteredRow);

            if (batch.length >= batchSize) {
                CardSchema.insertMany(batch)
                    .then(() => {
                        console.log(`Inserted ${batch.length} records`);
                    })
                    .catch(err => {
                        console.error('Error inserting batch:', err);
                    });
                batch = [];
            }
        } catch (error) {
            console.error('Error processing row:', error);
        }
    })
    .on('end', async () => {
        if (batch.length > 0) {
            try {
                await CardSchema.insertMany(batch);
                console.log(`Inserted final ${batch.length} records`);
            } catch (err) {
                console.error('Error inserting final batch:', err);
            }
        }

        console.log('CSV file successfully processed and filtered data inserted.');
        db.close();
    });
