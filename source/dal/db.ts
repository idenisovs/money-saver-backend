import exitHandler from './connectors/sqlite-exit-handler';
import determineConnector from './determine-connector';

function connect() {
  const connector = determineConnector();

  process.on('exit', exitHandler(connector));
  process.on('SIGINT', exitHandler(connector));

  return connector;
}

export default connect();
