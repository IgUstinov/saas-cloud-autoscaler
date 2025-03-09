import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrometheusService } from '../prometheus';
import { exec } from 'child_process';

@Injectable()
export class ScalerService {
  private readonly logger = new Logger(ScalerService.name);
  private kubeApiUrl =
    'http://localhost:8001/apis/apps/v1/namespaces/default/deployments';

  constructor(private readonly prometheusService: PrometheusService) {}

  async scaleService(serviceName: string, minReplicas = 2, maxReplicas = 10) {
    const cpuUsage = await this.prometheusService.getCpuUsage();
    this.logger.log(`CPU Usage: ${cpuUsage}%`);

    const newReplicas = cpuUsage > 70 ? maxReplicas : minReplicas;
    this.logger.log(`Scaling ${serviceName} to ${newReplicas} replicas`);

    await axios.patch(
      `${this.kubeApiUrl}/${serviceName}`,
      { spec: { replicas: newReplicas } },
      { headers: { 'Content-Type': 'application/merge-patch+json' } },
    );
  }

  checkLoadAndScale(serviceName: string, minReplicas = 1, maxReplicas = 5) {
    exec(
      'docker stats --no-stream --format "{{.CPUPerc}}"',
      (error, stdout) => {
        if (error) {
          this.logger.error('Failed to get Docker stats', error);
          return;
        }

        const cpuUsage = parseFloat(stdout.replace('%', '').trim());
        this.logger.log(`CPU Usage for ${serviceName}: ${cpuUsage}%`);

        let newReplicas = minReplicas;
        if (cpuUsage > 20) {
          newReplicas = maxReplicas;
        }

        this.logger.log(`Scaling ${serviceName} to ${newReplicas} replicas`);
        exec(`docker-compose up --scale ${serviceName}=${newReplicas} -d`);
      },
    );
  }
}
