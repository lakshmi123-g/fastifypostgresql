const fastify = require("fastify")();
const AutoLoad = require("fastify-autoload");
const path = require("path");

fastify.register(require("fastify-postgres"), {
  connectionString: "postgres://postgres:durga123@localhost:5432/secondary",
});
fastify.register(require("fastify-cors"), {});

fastify.get("/secondary", async (req, reply) => {
  fastify.pg.connect(onConnect);

  async function onConnect(err, client, release) {
    if (err) return reply.send(err);

    await client.query(
      `select table_schema, 
    table_name, 
    (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
from (
select table_name, table_schema, 
      query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
from information_schema.tables
where table_schema = 'public'
) t`,
      function onResult(err, result) {
        let output = [];
        if (!err) {
          for (let i = 0; i < result.rows.length; i++) {
            output.push({
              table_name: result.rows[i].table_name,
              row_count: result.rows[i].row_count,
            });
          }

          reply.send(output);
        }
        // console.log(result)
        //  reply.send(err || result)
        //                    release()
      }
    );
  }
});


module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

fastify.listen(3002, (err) => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
