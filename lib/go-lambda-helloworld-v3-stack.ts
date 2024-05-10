import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class GoLambdaHelloworldV3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define la función Lambda
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('.'), // Esto especifica que el código de la función Lambda se encuentra en el directorio raíz del proyecto
    });

    // Crea un endpoint de API Gateway que invoque la función Lambda cuando se haga una solicitud GET
    const api = new apigw.LambdaRestApi(this, 'HelloApi', {
      handler: helloLambda,
      proxy: true,
    });

    // Agrega un recurso raíz al endpoint de API Gateway
    const apiRoot = api.root;

    // Agrega un método GET al recurso raíz
    apiRoot.addMethod('GET');
  }
}

