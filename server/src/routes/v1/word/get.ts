import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { WordId } from "../../../schemas/word/params.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";


const routes: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:wordId", { schema: { params: WordId } }, async (req, reply) => {
    const wordId = parseInt(req.params.wordId);
    try {
      // const word = await app.pg.query("SELECT * FROM words WHERE id = $1", [wordId]);
      const word = await app.db.selectFrom('words').selectAll().where('id', '=', wordId).executeTakeFirst();


      // const defs = await app.pg.query("SELECT * FROM definitions WHERE word_id = $1", [wordId]);
      const defs = await app.db.selectFrom('definitions').selectAll().where('word_id', '=', wordId).execute();
      // const examples = await app.pg.query("SELECT * FROM examples WHERE word_id = $1", [wordId,]);
      const examples = await app.db.selectFrom('examples').selectAll().where('word_id', '=', wordId).execute();
      // const conjugations = await app.pg.query("SELECT * FROM conjugations WHERE word_id = $1", [wordId,]);
      const conjugations = await app.db.selectFrom('conjugations').selectAll().where('word_id', '=', wordId).execute();



      // const tags = await app.pg.query("SELECT * FROM tags JOIN wordtags ON wordtags.tag_id = tags.id");
      const tags = await app.db.selectFrom('tags')
        .innerJoin('wordtags', 'wordtags.tag_id', 'tags.id')
        .select(['tags.tag', 'wordtags.word_id'])
        .execute();

      const defsArr = defs.map((def) => def.definition);
      const examplesArr = examples.map((ex) => ({
        example: ex.example,
        translation: ex.translation,
      }));
      const conjArr = conjugations.map((con) => ({
        morfant: con.morfant,
        conjugation: con.conjugation,
        translation: con.translation,
      }));
      const tagsArr = tags.filter((tag) => tag.word_id === wordId).map((tag) => tag.tag);

      const wordData = {
        ...word,
        definitions: defsArr,
        examples: examplesArr,
        conjugations: conjArr,
        tags: tagsArr,
      };


      return wordData;
    } catch (error) {
      app.log.error(`Error retrieving word with id ${wordId}: ${getErrorMessage(error)}`);
      return reply.internalServerError('Internal Server Error');
    }
  });
}

export default routes;