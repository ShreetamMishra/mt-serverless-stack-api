import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
//export async function main(event, context) {}
export const main = handler(async (event, context) => {
  const params = {
    TableName: "notes",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };
  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
