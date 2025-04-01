import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { formatDateAndHour } from '@sajermann/utils/FormatDate';

import { ConfigService } from '@nestjs/config';
import { LogRepository } from '../repositories/log.repository';

@Injectable()
export class LogService {
  constructor(
    private configService: ConfigService,
    private logRepository: LogRepository,
  ) {}

  private logs: Record<number, string[]> = {};

  send({ deployId, logContent }: { deployId: number; logContent: string }) {
    const messageFormatted = `${new Date().toISOString()} - ${logContent}`;
    if (!this.logs[deployId]) {
      this.logs = {
        ...this.logs,
        [deployId]: [messageFormatted],
      };
    } else {
      this.logs[deployId].push(messageFormatted);
    }
  }

  saveInDiskNew({ deployId }: { deployId: number }) {
    if (!this.logs[deployId]) {
      return;
    }
    const logsDirectory = this.configService.get<string>('PATH_TO_SAVE_LOGS');
    if (!existsSync(logsDirectory)) {
      mkdirSync(logsDirectory);
    }
    const logFilePath = join(logsDirectory, `${deployId}.txt`);
    appendFileSync(logFilePath, this.logs[deployId].join('\n'));
  }

  saveInDisk({ id, message }: { id: number; message: string }) {
    const logsDirectory = this.configService.get<string>('PATH_TO_SAVE_LOGS');
    if (!existsSync(logsDirectory)) {
      mkdirSync(logsDirectory);
    }
    const logFilePath = join(logsDirectory, `${id}.txt`);
    appendFileSync(logFilePath, message + '\n');
  }

  async log({
    context,
    data,
    whoListen,
    message,
    type,
  }: {
    context?: string;
    whoListen?: string;
    data?: object;
    message: string;
    type?: 'success' | 'error' | 'info';
  }) {
    const messages: string[] = [formatDateAndHour(new Date())];
    if (context) {
      messages.push(`[${context}]`);
    }
    if (type) {
      messages.push(`[${type}]`);
    }
    messages.push(`Message: ${message}`);
    if (whoListen) {
      messages.push(`Who Listen: ${whoListen}`);
    }

    if (data) {
      messages.push(`Data: ${JSON.stringify(data, null, 2)}`);
    }

    const messageFormatted = messages.join(' | ');

    this.logRepository.create({
      context,
      data: JSON.stringify(data) || null,
      message,
      whoListen,
      type,
    });

    console.log(messageFormatted);
  }

  async read({ whoListen }: { whoListen: string }) {
    const [logs] = await this.logRepository.findAndCount({
      where: { whoListen },
    });

    return logs;
  }
}
