import { type ITask } from '@/shared/model/task.model';
import { type IEmployee } from '@/shared/model/employee.model';
import { type IJobHistory } from '@/shared/model/job-history.model';

export interface IJob {
  id?: number;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  tasks?: ITask[] | null;
  employee?: IEmployee | null;
  jobHistory?: IJobHistory | null;
}

export class Job implements IJob {
  constructor(
    public id?: number,
    public jobTitle?: string | null,
    public minSalary?: number | null,
    public maxSalary?: number | null,
    public tasks?: ITask[] | null,
    public employee?: IEmployee | null,
    public jobHistory?: IJobHistory | null,
  ) {}
}
