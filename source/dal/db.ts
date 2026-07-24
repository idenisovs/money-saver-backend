import closeDatabase from './connectors/close-database';
import determineConnector from './determine-connector';

const connector = determineConnector();

export function closeDb(): Promise<void> {
  return closeDatabase(connector);
}

export default connector;
