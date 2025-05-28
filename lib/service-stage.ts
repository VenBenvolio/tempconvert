import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiServiceStack } from "./api-service-stack";
import { TempConvertStack } from "./tempconvert-stack";

export class ApiServiceStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new TempConvertStack(this, 'TempConvertStack', {
            env: props?.env
        });

        new ApiServiceStack(this, 'ApiStack', {
            env: props?.env
        });
    }
}