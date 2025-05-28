import { Stack, StackProps } from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiServiceStage } from './service-stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: 'TempConvertPipeline',
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.connection(
                    'VenBenvolio/tempconvert', 
                    'main', { 
                        connectionArn: 'arn:aws:codeconnections:us-east-2:868500534166:connection/a2ecf8f6-6379-430e-be6d-58fefd5cdc56'
                    }
                ),
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });

        pipeline.addStage(new ApiServiceStage(this, 'Prod', { 
            env: { 
                account: process.env.CDK_DEFAULT_ACCOUNT ,
                region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
            } 
        }));
    }
}