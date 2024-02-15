import { defineComponent, provide } from 'vue';

import RegionService from './region/region.service';
import CountryService from './country/country.service';
import LocationService from './location/location.service';
import DepartmentService from './department/department.service';
import TaskService from './task/task.service';
import EmployeeService from './employee/employee.service';
import JobService from './job/job.service';
import JobHistoryService from './job-history/job-history.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('regionService', () => new RegionService());
    provide('countryService', () => new CountryService());
    provide('locationService', () => new LocationService());
    provide('departmentService', () => new DepartmentService());
    provide('taskService', () => new TaskService());
    provide('employeeService', () => new EmployeeService());
    provide('jobService', () => new JobService());
    provide('jobHistoryService', () => new JobHistoryService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
