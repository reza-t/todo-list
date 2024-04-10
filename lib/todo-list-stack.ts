import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Lambda } from './constructs/Lambda';
import { ApiGateway } from './constructs/ApiGateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class TodoListStack extends cdk.Stack {
    readonly getTodoList: Lambda;
    readonly getTodoListApi: ApiGateway;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      this.getTodoList = new Lambda(this, 'getList', { region: this.region, functionName: 'handler', fileName: 'getList' });
  
      this.getTodoListApi = new ApiGateway(this, 'getListApi', { apiName: 'getList'});
  
      const templateLambdaIntegration = new LambdaIntegration(this.getTodoList.lambdaFunction);
  
      const singleItem = this.getTodoListApi.restApi.root.addResource('all');
      singleItem.addMethod('GET', templateLambdaIntegration);
      this.getTodoListApi.addCorsOptions(singleItem);
    }
}
