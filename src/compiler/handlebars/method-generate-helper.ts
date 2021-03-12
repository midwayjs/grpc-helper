import { registerHelper } from 'handlebars';

registerHelper(
  'server-method-signature',
  (reqType, resType, isReqStream, isResStream) => {
    if (reqType === 'google.protobuf.Empty') {
      reqType = '';
    }

    if (resType === 'google.protobuf.Empty') {
      resType = 'void';
    }

    if (isReqStream || isResStream) {
      return `(${reqType ? 'data: ' + reqType : ''}): Promise<void>`;
    } else {
      return `(${reqType ? 'data: ' + reqType : ''}): Promise<${resType}>`;
    }
  }
);

registerHelper(
  'client-method-signature',
  (reqType, resType, isReqStream, isResStream) => {
    if (reqType === 'google.protobuf.Empty') {
      reqType = 'any';
    }

    if (resType === 'google.protobuf.Empty') {
      resType = 'any';
    }
    if (isReqStream && isResStream) {
      return `(options?: grpc.IClientOptions): grpc.IClientDuplexStreamService<${reqType}, ${resType}>`;
    } else if (isReqStream && !isResStream) {
      return `(options?: grpc.IClientOptions): grpc.IClientWritableStreamService<${reqType}, ${resType}>`;
    } else if (!isReqStream && isResStream) {
      return `(options?: grpc.IClientOptions): grpc.IClientReadableStreamService<${reqType}, ${resType}>`;
    } else {
      return `(options?: grpc.IClientOptions): grpc.IClientUnaryService<${reqType}, ${resType}>`;
    }
  }
);

registerHelper('client-method-name', serviceName => {
  if (/Client$/.test(serviceName)) {
    return serviceName + 'Proxy';
  } else {
    return serviceName + 'Client';
  }
});
