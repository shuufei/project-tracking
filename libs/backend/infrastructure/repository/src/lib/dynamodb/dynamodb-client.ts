import { DynamoDB } from 'aws-sdk';

export class DynamoDBClient {
  private static client?: DynamoDB;

  static getClient() {
    return (
      this.client ??
      new DynamoDB({
        // TODO: 利用環境によって切り替えられるようにする
        endpoint: 'http://localhost:8000',
        region: 'us-west-2',
      })
    );
  }
}
