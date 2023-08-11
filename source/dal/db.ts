import exitHandler from './connectors/sqlite-exit-handler';
import determineConnector from './determine-connector';

const connector = determineConnector();

process.on('exit', exitHandler(connector));
process.on('SIGINT', exitHandler(connector));

export default connector;
