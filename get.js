import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
//export async function main(event, context) {}
export const main = handler(async (event, context) => {
  const params = {
    TableName: "notes",//
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});
