import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
//comentario
export class GoLambdaHelloworldV3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define la función Lambda
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('.', { exclude: ['cdk.out'] }), // Excluye la carpeta cdk.out
    });

    // Crea un endpoint de API Gateway que invoque la función Lambda cuando se haga una solicitud GET
    const api = new apigw.LambdaRestApi(this, 'HelloApi', {
      handler: helloLambda,
      proxy: false,
    });

    // Agrega un recurso raíz al endpoint de API Gateway
    const apiRoot = api.root;

    // Agrega un método GET al recurso raíz
    apiRoot.addMethod('GET');
  }
}

