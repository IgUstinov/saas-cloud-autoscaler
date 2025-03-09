import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PrometheusService {
  private prometheusUrl = 'http://prometheus:9090/api/v1/query';

  async getCpuUsage(): Promise<number> {
    const query = '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)';
    const response = await axios.get(`${this.prometheusUrl}?query=${encodeURIComponent(query)}`);
    return response.data.data.result[0]?.value[1] || 0;
  }
}
