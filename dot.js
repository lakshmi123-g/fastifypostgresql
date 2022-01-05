const fastify = require('fastify')()

fastify.register(require('fastify-postgres'), {
    connectionString: "postgres://postgres:durga123@localhost:5432/primaryDB",
    // native: true
})

fastify.get('/user', (req, reply) => {
    fastify.pg.query(
        'SELECT * from table1', [req.params.id],
        function onResult(err, result) {
            reply.send(err || result)
        }
    )
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})