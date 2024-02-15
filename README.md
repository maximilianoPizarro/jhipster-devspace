# JHipster v7.1.0 Monolithic application On Red Hat OpenShift Dev Spaces

<p align="left">
<img src="https://img.shields.io/badge/redhat-CC0000?style=for-the-badge&logo=redhat&logoColor=white" alt="Redhat">
<img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="kubernetes">
<img src="https://img.shields.io/badge/docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="shell">
<a href="https://www.linkedin.com/in/maximiliano-gregorio-pizarro-consultor-it"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin">     
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/delivery-service/blob/master/screenshot/coverjhipster.PNG?raw=true" width="684" title="Run On Openshift">
</p>  


# JHipster OpenShift Generator

```
[jboss@workspace957b56497c3a46f6-7bdcf57dd8-ktkwn delivery-service]$ jhipster openshift
```

INFO! Using JHipster version installed globally
⭕ [*BETA*] Welcome to the JHipster OpenShift Generator ⭕
Files will be generated in folder: /projects/delivery-service or in the root directory path that you select in the subsequent step
Docker version 1.10.0 or later is not installed on your computer.
         Read http://docs.docker.com/engine/installation/#installation


Found .yo-rc.json config file...
? Which *type* of application would you like to deploy? Monolithic application
? Enter the root directory where your applications are located /projects/delivery-service
The path "/projects/delivery-service" does not end with a trailing "/", adding it anyway.
1 applications found at /projects/delivery-service/
? Which applications do you want to include in your configuration? app
? Do you want to setup monitoring for your applications ? No
? What should we use for the OpenShift namespace? maximilianopizarro5-dev
? Which *type* of database storage would you like to use? Ephemeral Storage
? What should we use for the base Docker repository name? image-registry.openshift-image-registry.svc:5000/maximilianopiza
rro5-dev
? What command should we use for push Docker image to repository? docker push

Checking Docker images in applications directories...
ls: no such file or directory: /projects/delivery-service/app/target/jib-cache
   create ocp/ocp-apply.sh
    force app/.yo-rc.json
    force .yo-rc.json
   create ocp/delivery/delivery-deployment.yml
   create ocp/delivery/delivery-postgresql.yml
   create ocp/registry/scc-config.yml

No change to package.json was detected. No package manager install will be executed.

WARNING! OpenShift configuration generated, but no Jib cache found
If you forgot to generate the Docker image for this application, please run:
To generate the missing Docker image(s), please run:

```
  ./mvnw -ntp -Pprod verify jib:dockerBuild in /projects/delivery-service/app
```

WARNING! You will need to push your image to a registry. If you have not done so, use the following commands to tag and push the images:

```
  docker image tag delivery image-registry.openshift-image-registry.svc:5000/maximilianopizarro5-dev/delivery
  docker push image-registry.openshift-image-registry.svc:5000/maximilianopizarro5-dev/delivery
```

You can deploy all your apps by running:

```
  /projects/delivery-service/ocp/ocp-apply.sh
```

OR

```
  oc process -f /projects/delivery-service/ocp/registry/scc-config.yml | oc apply -f -
  oc process -f /projects/delivery-service/ocp/delivery/delivery-postgresql.yml | oc apply -f -
  oc process -f /projects/delivery-service/ocp/delivery/delivery-deployment.yml | oc apply -f -
```

Use these commands to find your application's IP addresses:

```
  oc get svc delivery
```

Congratulations, JHipster execution is complete!
Sponsored with ❤️  by @oktadev.
