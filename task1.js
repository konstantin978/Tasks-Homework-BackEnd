// TASK 1
const express = require('express')
const app = express()
app.use(express.json())

const data = []

app.get('/users', (req, res) => {
    res.send(data)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)

    if (user) {
        return res.send(user)
    }
    res.status(404).send('Not found')
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.findIndex(user => user.id == id)

    if (user != -1) {
        const updatedUser = { ...data[user], ...req.body };
        data[user] = updatedUser;
        return res.json(updatedUser);
    }
    res.status(404).send('User not found');
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const index = data.findIndex(user => user.id == id)
    if (id != -1) {
        data.splice(index, 1)
        return res.send(data)
    }
    res.status(404).send('Not Found')
})

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({ error: 'Please provide all required fields' })
    }
    const user = {
        id: data.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    data.push(user)
    res.send(user)
})

app.post('/users/:id/profile', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)

    if (user) {
        if (user.profile) {
            return res.send(404, 'Profile already exist')
        }

        const profile = req.body
        user.profile = profile

        return res.status(201).send('Successfully')
    }
    res.send(404, 'User Not Found')
})

app.get('/users/:id/profile', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)

    if (user) {
        if (user.profile) {
            return res.send(user.profile)
        }
    }
    res.status(404).send('Not found')
})

app.put('/users/:id/profile', (req, res) => {
    const id = req.params.id
    const userIndex = data.findIndex(user => user.id == id)

    if (userIndex != -1) {
        const user = data[userIndex];
        const updatedProfile = { ...user.profile, ...req.body };
        user.profile = updatedProfile;
        return res.json(updatedProfile);
    }
    res.status(404).send('User not found');
})

app.delete('/users/:id/profile', (req, res) => {
    const id = req.params.id
    const userIndex = data.find(user => user.id == id)

    if (id != -1) {
        delete userIndex.profile
        res.send(data)
    }
})

app.put('/users/:id/profile/picture', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const user = data[userIndex];
        const newPictureUrl = req.body.picture;

        if (!newPictureUrl) {
            return res.status(400).send('Profile picture URL is required');
        }

        user.profile.picture = newPictureUrl;
        return res.send('Successfully!')
    }

    res.status(404).send('User not found');
});

app.listen(3000)