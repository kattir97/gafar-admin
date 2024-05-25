import fastify from "fastify";
import buildServer from "./server.js"
import cors from '@fastify/cors';

async function run() {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      },

    },
  });

  // app.register(fastifyPostgres, {
  //   connectionString: "postgres://postgres:1412@localhost/dictionary",
  // });



  app.register(cors, {
    origin: "http://localhost:5173",
  });
  app.register(buildServer)


  try {
    await app.listen({
      port: 3000,
      // host: "0.0.0.0",
    });
    console.log(
    )
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

run();