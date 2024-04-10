import { aws_logs, CfnOutput, Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaFunctionProps {
  functionName: string;
  region: string;
  fileName: string;
}

export class Lambda extends Construct {
  public readonly lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaFunctionProps) { 
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, id, {
      runtime: Runtime.NODEJS_20_X,
      functionName: props.functionName,
      entry: join(__dirname, "../../../", "lambdas", `${props.fileName}.ts`),
    });

    new CfnOutput(this, 'LambdaLogsUrl', {
      exportName: 'LambdaLogs',
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${props.region}#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${this.lambdaFunction.functionName}`
    })
  }
}