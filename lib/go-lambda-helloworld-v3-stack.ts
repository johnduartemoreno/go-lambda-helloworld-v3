import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class GoLambdaHelloworldV3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define la función Lambda
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2, // Cambiar el runtime a PROVIDED_AL2
      handler: 'main', // Se ajustó el handler para que coincida con el nombre del archivo binario de Go
      code: lambda.Code.fromAsset('go'), // Se asume que el directorio 'go' contiene el binario compilado de la función Lambda
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
