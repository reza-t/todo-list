import { LambdaResponse } from "./utils";


export const handler = async (event: Record<string, any>): Promise<LambdaResponse> => {
  console.log("Getting Todo List");

  return { statusCode: 200, body: 'Todo List' };
}