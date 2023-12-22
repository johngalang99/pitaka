import { RecordController } from '../controllers/record.controller';
import { validateToken } from '../validators';
import { Express } from 'express';

export function setupRecordRoutes(app: Express, recordController: RecordController) {
  app.post('/record', validateToken, recordController.createRecord.bind(recordController));
}
