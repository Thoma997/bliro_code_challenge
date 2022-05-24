const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const bodySchema = Joi.object({
    createdAt: Joi.date().timestamp('javascript'),
    scheduledAt: Joi.date().timestamp('javascript'),
    message: Joi.string()
})

const app = express();
const PORT = 5001;

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("The force be with your solving bliro's coding challenge"))

app.post('/reminders', (req, res) => {
    // input validation
    const result = bodySchema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // usually here would come some logic :)

    res.status(201).json({ ok: true, response: { data: result.value } })
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost${PORT}`))