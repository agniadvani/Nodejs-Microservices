const express = require("express")
const app = express()
const { randomBytes } = require("crypto")
app.use(express.json())

const commentsByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
    res.json(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", (req, res) => {
    const comments = commentsByPostId[req.params.id] || []
    const id = randomBytes(4).toString('hex')
    comments.push({ id: id, comment: req.body.comment })
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log("Listening on port 4001...")
})