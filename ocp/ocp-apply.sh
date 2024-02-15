#!/usr/bin/env sh
# Use this script to run oc commands to create resources in the selected namespace. Files are ordered
# in proper order. 'oc process' processes the template as resources which is again piped to
# 'oc apply' to create those resources in OpenShift namespace
oc process -f /projects/jhipster-devspace/ocp/registry/scc-config.yml | oc apply -f -
oc process -f /projects/jhipster-devspace/ocp/delivery/delivery-postgresql.yml | oc apply -f -
oc process -f /projects/jhipster-devspace/ocp/delivery/delivery-deployment.yml | oc apply -f -
