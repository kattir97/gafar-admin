import { LoaderFunction } from "react-router-dom";
import { useHomeStore } from "../../stores/homeStore";
import { convertToCamelCase } from "../../utils/caseConverter";



export const wordLoader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.wordId as string);
  const { getWord } = useHomeStore.getState();

  const response = await getWord(id);
  const wordObj = convertToCamelCase(response.data);
  console.log('wordObj from loader', wordObj);
  return wordObj;
}