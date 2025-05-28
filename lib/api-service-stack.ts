import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class ApiServiceStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const fn = new lambdaNode.NodejsFunction(this, 'TempConvert', {
                    entry: 'src/handler.ts',
                    handler: 'handler',
                    runtime: lambda.Runtime.NODEJS_22_X
                });

        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: fn,
            proxy: true
        })
    }
}