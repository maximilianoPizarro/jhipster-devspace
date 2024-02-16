# JHipster v8.1.0 Monolithic application On Red Hat OpenShift Dev Spaces

<p align="left">
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="java">
<img src="https://img.shields.io/badge/nodejs-68a063?style=for-the-badge&logo=javascript&logoColor=white" alt="nodejs">
<img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="VueJS">
<img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="Spring"> 
<img src="https://img.shields.io/badge/redhat-CC0000?style=for-the-badge&logo=redhat&logoColor=white" alt="Redhat">
<img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="kubernetes">
<img src="https://img.shields.io/badge/docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="shell">
<a href="https://www.linkedin.com/in/maximiliano-gregorio-pizarro-consultor-it"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin">     
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/coverjhipster.PNG?raw=true" width="684" title="Run On Openshift">
</p>

## Install JHipster DevSpace on OpenShift Dev Spaces

1. Login with your red hat account https://console.redhat.com/openshift/sandbox

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/redhat-console.PNG?raw=true" width="684" title="Run On Openshift">
</p>

2. Fork this repo and complete git url with your fork repo info

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/install-jhipster-devspace.PNG?raw=true" width="684" title="Run On Openshift">
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/install-jhipster-devspace-2.PNG?raw=true" width="684" title="Run On Openshift">
</p>


## Re-generate JHipster application from JDL File on Red Hat OpenShift Dev Spaces


1. Open terminal and run:

jhipster-devspace (master) $ rm -r app && mkdir app

```
JAVA_HOME=$JAVA_HOME_17
rm -r app && mkdir app
```


1. Copy jhipster-devspace-model.jdl to app directory:

```
cp template-jdl/jhipster-devspace-model.jdl app
```

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-studio.PNG?raw=true" width="684" title="Run On Openshift">
</p>

3. Run 'jhipster jdl' command. info https://www.jhipster.tech/jdl/getting-started :
app (master) $

```
cd app
jhipster jdl jhipster-devspace-model.jdl
```

```bash
Output:

[jboss@workspace9ebd5039e3b24f5e-6c59b9cf86-4gpc4 jhipster-devspace]$ cd app
[jboss@workspace9ebd5039e3b24f5e-6c59b9cf86-4gpc4 app]$ jhipster jdl jhipster-devspace-model.jdl
INFO! Using JHipster version installed globally
INFO! Executing import-jdl jhipster-devspace-model.jdl
INFO! The JDL is being parsed.
warn: An Entity name 'User' was used: 'User' is an entity created by default by JHipster. All relationships toward it will be kept but any attributes and relationships from it will be disregarded.
INFO! Found entities: Producto, ProductoCategoria, Cliente, Carrito, ProductoOrden.
INFO! The JDL has been successfully parsed
INFO! Generating 1 application.


        ██╗ ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗
        ██║ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗
        ██║ ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝
  ██╗   ██║ ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║
  ╚██████╔╝ ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗
   ╚═════╝  ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝

                            https://www.jhipster.tech

Welcome to JHipster v7.1.0
Application files will be generated in folder: /projects/jhipster-devspace/app
 _______________________________________________________________________________________________________________

  Documentation for creating an application is at https://www.jhipster.tech/creating-an-app/
  If you find JHipster useful, consider sponsoring the project at https://opencollective.com/generator-jhipster
 _______________________________________________________________________________________________________________

 ______________________________________________________________________________

  JHipster update available: 8.1.0 (current: 7.1.0)

  Run npm install -g generator-jhipster to update.

 ______________________________________________________________________________

This is an existing project, using the configuration from your .yo-rc.json file 
to re-generate the project...
...more lines...
Entity Producto generated successfully.
Entity ProductoCategoria generated successfully.
Entity Cliente generated successfully.
Entity Carrito generated successfully.
Entity ProductoOrden generated successfully.
INFO! Generator app succeed
Congratulations, JHipster execution is complete!
Sponsored with ❤️  by @oktadev.
```

4. Run Development Mode the JHipster Application. 

```
./mvnw
```

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-delivery-devspace-run.PNG?raw=true" width="684" title="Run On Openshift">
</p>

Default Admin credentials: admin / admin


## Deploy JHipster v8.1.0 Monolithic application on ⭕ Red Hat OpenShift ⭕

From terminal on Red Hat Openshift Dev Spaces

Note. By default, the repo contains a version generated for testing this section with the name "delivery", if you want to change it in your fork you will need to change it to the new value in the yaml objects and the jhispter JDL file.

1. Fork repo and modify the yaml files with your environment keys:


  k8s/overlay/develop/route.yaml
  spec:
    host: delivery-<NAMESPACE>.apps.sandbox-m2.ll9k.p1.openshiftapps.com

  k8s/overlay/develop/deployment-patches.yaml
    spec:
      containers:
      - name: delivery
        image: image-registry.openshift-image-registry.svc:5000/<NAMESPACE>/delivery
        env:
          - name: SPRING_DATASOURCE_URL
            value: jdbc:mariadb://mariadb.<NAMESPACE>.svc.cluster.local:3306/delivery                  

2. Create Tekton Pipeline:

```bash
jhipster-devspace (master) $ oc apply -f pipeline.yaml
```

```bash
Output
persistentvolumeclaim/workspace created
task.tekton.dev/npm created
pipeline.tekton.dev/jhipster-devspace created
```

3. Run Pipeline jhipster-space from OpenShift Pipelines

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-pipelines-form.PNG?raw=true" width="684" title="Run On Openshift">
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-pipelines.PNG?raw=true" width="684" title="Run On Openshift">
</p>



## An example of JDL modification to change the style of Bootswatch Theme (Optional)

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-delivery.PNG?raw=true" width="684" title="Run On Openshift">
</p>

Try to changing the value from "quartz" to "vapor" in "clientTheme" from template-jdl/jhipster-despace-model.jdl and run steps 1 to 4 for regenerate proyect. 

```
template-jdl/jhipster-despace-model
application {
  config {
  	applicationType monolith
    baseName delivery
    packageName com.delivery.app
    authenticationType jwt
    prodDatabaseType mariadb
    databaseType sql
    devDatabaseType h2Memory
    buildTool maven
    clientFramework vue
    clientTheme vapor           //<---This
    clientThemeVariant dark
    enableTranslation true
    nativeLanguage es
    languages [en, nl]
  }
  entities *
}
```

The landing page should look like this:

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-vapor-theme.PNG?raw=true" width="684" title="Run On Openshift">
</p>


## H2 Console Dev Mode 

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-state.PNG?raw=true" width="684" title="Run On Openshift">
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/h2-console.PNG?raw=true" width="684" title="Run On Openshift">
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/h2-console-query.PNG?raw=true" width="684" title="Run On Openshift">
</p>

