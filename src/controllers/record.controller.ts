import { Request, Response } from 'express';
import { RecordService } from '../services/record.service';
import { CreateRecordRequest } from '../validators';

export class RecordController {
  constructor(private recordService: RecordService) { }

  async createRecord(req: Request, res: Response) {
    try {
      const { accountId, amount, type, description, date } = req.body as CreateRecordRequest;
      await this.recordService.createRecord({ accountId, amount, type, description, date });
      res.send({ message: 'Record created successfully' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}
