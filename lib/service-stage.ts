import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiServiceStack } from "./api-service-stack";

export class ApiServiceStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new ApiServiceStack(this, 'ApiStack', {
            env: props?.env
        });
    }
}