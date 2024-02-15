<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="jobHistory">
        <h2 class="jh-entity-heading" data-cy="jobHistoryDetailsHeading">
          <span v-text="t$('deliveryApp.jobHistory.detail.title')"></span> {{ jobHistory.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.startDate')"></span>
          </dt>
          <dd>
            <span v-if="jobHistory.startDate">{{ formatDateLong(jobHistory.startDate) }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.endDate')"></span>
          </dt>
          <dd>
            <span v-if="jobHistory.endDate">{{ formatDateLong(jobHistory.endDate) }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.language')"></span>
          </dt>
          <dd>
            <span v-text="t$('deliveryApp.Language.' + jobHistory.language)"></span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.job')"></span>
          </dt>
          <dd>
            <div v-if="jobHistory.job">
              <router-link :to="{ name: 'JobView', params: { jobId: jobHistory.job.id } }">{{ jobHistory.job.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.department')"></span>
          </dt>
          <dd>
            <div v-if="jobHistory.department">
              <router-link :to="{ name: 'DepartmentView', params: { departmentId: jobHistory.department.id } }">{{
                jobHistory.department.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.jobHistory.employee')"></span>
          </dt>
          <dd>
            <div v-if="jobHistory.employee">
              <router-link :to="{ name: 'EmployeeView', params: { employeeId: jobHistory.employee.id } }">{{
                jobHistory.employee.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="jobHistory.id"
          :to="{ name: 'JobHistoryEdit', params: { jobHistoryId: jobHistory.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./job-history-details.component.ts"></script>
