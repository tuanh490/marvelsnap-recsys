import Card from '../models/Card.js'

export async function getCard(req, res) {
    const name = req.body.name;
    const card = await Card.findOne({ name: { $regex: name, $options: "i" } });

    if (!card)
        return res.status(404).json({ error: `Card with name "${name}" not found.` });

    res.json(card)
}