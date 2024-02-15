# JHipster v7.1.0 Monolithic application On Red Hat OpenShift Dev Spaces

<p align="left">
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

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/install-jhipster-devspace.PNG?raw=true" width="684" title="Run On Openshift">
</p>

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/install-jhipster-devspace-2.PNG?raw=true" width="684" title="Run On Openshift">
</p>



## Re-generate JHipster application from JDL File

1. Open terminal and run:

[jboss@workspace9ebd5039e3b24f5e-6c59b9cf86-4gpc4 jhipster-devspace]$ rm -r app && mkdir app

```
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


Found the .jhipster/Producto.json configuration file, entity can be automatically generated!


Found the .jhipster/ProductoCategoria.json configuration file, entity can be automatically generated!


Found the .jhipster/Cliente.json configuration file, entity can be automatically generated!


Found the .jhipster/Carrito.json configuration file, entity can be automatically generated!


Found the .jhipster/ProductoOrden.json configuration file, entity can be automatically generated!

     info Creating changelog for entities Producto,ProductoCategoria,Cliente,Carrito,ProductoOrden

KeyStore 'src/main/resources/config/tls/keystore.p12' generated successfully.

   create .prettierrc
   create .prettierignore
   create package.json
   create .gitattributes
    force .yo-rc.json
   create .editorconfig
   create README.md
   create .gitignore
   create sonar-project.properties
   create .huskyrc
   create .lintstagedrc.js
   create mvnw
    force .jhipster/Producto.json
   create mvnw.cmd
    force .jhipster/ProductoCategoria.json
   create .mvn/wrapper/maven-wrapper.jar
    force .jhipster/Cliente.json
   create .mvn/wrapper/maven-wrapper.properties
    force .jhipster/Carrito.json
   create .mvn/wrapper/MavenWrapperDownloader.java
    force .jhipster/ProductoOrden.json
   create npmw
   create npmw.cmd
   create src/main/resources/banner.txt
   create src/main/resources/config/liquibase/changelog/00000000000000_initial_schema.xml
   create src/main/resources/config/liquibase/master.xml
   create src/main/docker/jib/entrypoint.sh
   create checkstyle.xml
   create pom.xml
   create src/main/resources/.h2.server.properties
   create src/main/resources/logback-spring.xml
   create src/main/resources/i18n/messages.properties
   create src/main/docker/app.yml
   create src/main/docker/jhipster-control-center.yml
   create src/main/resources/config/application.yml
   create src/main/docker/sonar.yml
   create src/main/resources/config/application-dev.yml
   create src/main/docker/monitoring.yml
   create src/main/docker/prometheus/prometheus.yml
   create src/main/resources/config/application-tls.yml
   create src/main/docker/grafana/provisioning/dashboards/dashboard.yml
   create src/main/docker/grafana/provisioning/dashboards/JVM.json
   create src/main/resources/config/application-prod.yml
   create src/main/docker/grafana/provisioning/datasources/datasource.yml
   create src/main/resources/templates/error.html
   create src/main/docker/postgresql.yml
   create src/main/java/com/delivery/app/security/SpringSecurityAuditorAware.java
   create src/main/java/com/delivery/app/web/rest/vm/LoginVM.java
   create src/main/java/com/delivery/app/config/LoggingConfiguration.java
   create src/main/java/com/delivery/app/domain/package-info.java
   create src/main/java/com/delivery/app/web/rest/errors/FieldErrorVM.java
   create src/main/java/com/delivery/app/security/SecurityUtils.java
   create src/main/java/com/delivery/app/web/rest/UserJWTController.java
   create src/main/java/com/delivery/app/config/ApplicationProperties.java
   create src/test/resources/logback.xml
   create src/main/java/com/delivery/app/domain/AbstractAuditingEntity.java
   create src/main/java/com/delivery/app/web/rest/errors/EmailAlreadyUsedException.java
   create src/main/java/com/delivery/app/security/AuthoritiesConstants.java
   create src/main/java/com/delivery/app/DeliveryApp.java
   create src/main/java/com/delivery/app/config/JacksonConfiguration.java
   create src/main/java/com/delivery/app/repository/package-info.java
   create src/main/java/com/delivery/app/web/rest/errors/InvalidPasswordException.java
   create src/main/java/com/delivery/app/security/package-info.java
   create src/main/java/com/delivery/app/ApplicationWebXml.java
   create src/main/java/com/delivery/app/config/LocaleConfiguration.java
   create src/main/java/com/delivery/app/service/EmailAlreadyUsedException.java
   create src/main/java/com/delivery/app/web/rest/errors/LoginAlreadyUsedException.java
   create src/main/java/com/delivery/app/config/LoggingAspectConfiguration.java
   create src/main/java/com/delivery/app/service/InvalidPasswordException.java
   create src/main/java/com/delivery/app/web/rest/vm/package-info.java
   create src/main/java/com/delivery/app/security/jwt/TokenProvider.java
   create src/main/java/com/delivery/app/config/WebConfigurer.java
   create src/main/java/com/delivery/app/service/UsernameAlreadyUsedException.java
   create src/main/java/com/delivery/app/web/rest/package-info.java
   create src/main/java/com/delivery/app/security/jwt/JWTFilter.java
   create src/main/java/com/delivery/app/GeneratedByJHipster.java
   create src/main/java/com/delivery/app/config/StaticResourcesWebConfiguration.java
   create src/main/java/com/delivery/app/service/package-info.java
   create src/main/java/com/delivery/app/web/rest/ClientForwardController.java
   create src/main/java/com/delivery/app/security/jwt/JWTConfigurer.java
   create src/main/java/com/delivery/app/aop/logging/LoggingAspect.java
   create src/main/java/com/delivery/app/config/Constants.java
   create src/main/java/com/delivery/app/web/rest/errors/package-info.java
   create src/main/resources/config/liquibase/data/user.csv
   create src/main/java/com/delivery/app/config/SecurityConfiguration.java
   create src/main/resources/config/liquibase/data/authority.csv
   create src/main/java/com/delivery/app/config/package-info.java
   create src/main/resources/config/liquibase/data/user_authority.csv
   create src/main/java/com/delivery/app/config/CacheConfiguration.java
   create src/main/java/com/delivery/app/web/rest/errors/BadRequestAlertException.java
   create src/main/java/com/delivery/app/security/DomainUserDetailsService.java
   create src/main/java/com/delivery/app/config/AsyncConfiguration.java
   create src/main/java/com/delivery/app/config/DatabaseConfiguration.java
   create src/main/java/com/delivery/app/web/rest/errors/ErrorConstants.java
   create src/main/java/com/delivery/app/domain/User.java
   create src/main/java/com/delivery/app/security/UserNotActivatedException.java
   create src/main/java/com/delivery/app/config/DateTimeFormatConfiguration.java
   create src/main/java/com/delivery/app/config/LiquibaseConfiguration.java
   create src/main/java/com/delivery/app/web/rest/errors/ExceptionTranslator.java
   create src/test/resources/i18n/messages_en.properties
   create src/main/java/com/delivery/app/domain/Authority.java
   create src/main/java/com/delivery/app/repository/AuthorityRepository.java
   create src/test/java/com/delivery/app/security/SecurityUtilsUnitTest.java
   create src/test/java/com/delivery/app/ArchTest.java
   create src/test/java/com/delivery/app/config/WebConfigurerTest.java
   create src/test/java/com/delivery/app/IntegrationTest.java
   create src/test/java/com/delivery/app/config/WebConfigurerTestController.java
   create src/test/java/com/delivery/app/web/rest/TestUtil.java
   create src/test/java/com/delivery/app/config/StaticResourcesWebConfigurerTest.java
   create src/test/java/com/delivery/app/web/rest/errors/ExceptionTranslatorIT.java
   create src/test/java/com/delivery/app/security/DomainUserDetailsServiceIT.java
   create src/test/java/com/delivery/app/web/rest/errors/ExceptionTranslatorTestController.java
   create src/test/java/com/delivery/app/web/rest/ClientForwardControllerTest.java
   create src/test/java/com/delivery/app/config/timezone/HibernateTimeZoneIT.java
   create src/test/java/com/delivery/app/repository/timezone/DateTimeWrapper.java
   create src/test/java/com/delivery/app/repository/timezone/DateTimeWrapperRepository.java
   create src/test/resources/config/application.yml
   create src/test/resources/config/application-testcontainers.yml
   create src/main/java/com/delivery/app/repository/UserRepository.java
   create src/main/java/com/delivery/app/service/UserService.java
   create src/main/java/com/delivery/app/service/MailService.java
   create src/main/resources/templates/mail/activationEmail.html
   create src/main/resources/templates/mail/creationEmail.html
   create src/main/resources/templates/mail/passwordResetEmail.html
   create src/main/java/com/delivery/app/web/rest/vm/ManagedUserVM.java
   create src/main/java/com/delivery/app/web/rest/AccountResource.java
   create src/main/java/com/delivery/app/service/dto/package-info.java
   create src/main/java/com/delivery/app/web/rest/UserResource.java
   create src/main/java/com/delivery/app/web/rest/PublicUserResource.java
   create src/main/java/com/delivery/app/service/dto/AdminUserDTO.java
   create src/main/java/com/delivery/app/web/rest/vm/KeyAndPasswordVM.java
   create src/main/java/com/delivery/app/service/dto/UserDTO.java
   create src/main/java/com/delivery/app/service/dto/PasswordChangeDTO.java
   create src/test/java/com/delivery/app/web/rest/UserJWTControllerIT.java
   create src/main/java/com/delivery/app/service/mapper/package-info.java
   create src/main/java/com/delivery/app/service/mapper/UserMapper.java
   create src/test/java/com/delivery/app/config/NoOpMailConfiguration.java
   create src/test/java/com/delivery/app/web/rest/PublicUserResourceIT.java
   create src/test/java/com/delivery/app/security/jwt/TokenProviderTest.java
   create src/test/java/com/delivery/app/web/rest/UserResourceIT.java
   create src/test/java/com/delivery/app/security/jwt/JWTFilterTest.java
   create src/test/java/com/delivery/app/web/rest/AccountResourceIT.java
   create src/test/java/com/delivery/app/web/rest/WithUnauthenticatedMockUser.java
   create tsconfig.json
   create .postcssrc.js
   create src/test/java/com/delivery/app/service/MailServiceIT.java
   create .eslintrc.js
   create src/test/java/com/delivery/app/service/UserServiceIT.java
   create src/test/java/com/delivery/app/service/mapper/UserMapperTest.java
   create src/test/resources/templates/mail/testEmail.html
   create webpack/env.js
   create webpack/dev.env.js
   create webpack/prod.env.js
   create webpack/webpack.common.js
   create webpack/webpack.dev.js
   create webpack/webpack.prod.js
   create webpack/vue.utils.js
   create webpack/loader.conf.js
   create webpack/utils.js
   create src/main/webapp/content/scss/_bootstrap-variables.scss
   create src/main/webapp/content/scss/vendor.scss
   create src/main/webapp/app/app.vue
   create src/main/webapp/content/scss/global.scss
   create src/main/webapp/app/app.component.ts
   create src/main/webapp/app/shims-vue.d.ts
   create src/main/webapp/app/constants.ts
   create src/main/webapp/app/main.ts
   create src/main/webapp/app/router/index.ts
   create src/main/webapp/app/router/admin.ts
   create src/main/webapp/app/shared/config/axios-interceptor.ts
   create src/main/webapp/app/router/entities.ts
   create src/main/webapp/app/shared/config/config.ts
   create src/main/webapp/app/shared/config/config-bootstrap-vue.ts
   create src/main/webapp/app/router/pages.ts
   create src/main/webapp/app/locale/translation.service.ts
   create src/main/webapp/app/shared/config/dayjs.ts
   create src/main/webapp/app/shared/config/formatter.ts
   create src/main/webapp/app/shared/config/store/account-store.ts
   create src/main/webapp/app/shared/config/store/translation-store.ts
   create src/main/webapp/app/shared/security/authority.ts
   create src/main/webapp/app/core/home/home.vue
   create src/main/webapp/app/core/home/home.component.ts
   create src/main/webapp/app/core/error/error.vue
   create src/main/webapp/app/core/error/error.component.ts
   create src/main/webapp/app/core/jhi-footer/jhi-footer.vue
   create src/main/webapp/app/core/jhi-footer/jhi-footer.component.ts
   create src/main/webapp/app/core/jhi-navbar/jhi-navbar.vue
   create src/main/webapp/app/core/jhi-navbar/jhi-navbar.component.ts
   create src/main/webapp/app/shared/jhi-item-count.component.ts
   create src/main/webapp/app/shared/jhi-item-count.vue
   create src/main/webapp/app/core/ribbon/ribbon.vue
   create src/main/webapp/app/core/ribbon/ribbon.component.ts
   create src/main/webapp/app/shared/date/filters.ts
   create src/main/webapp/app/shared/sort/jhi-sort-indicator.component.ts
   create src/main/webapp/app/shared/sort/jhi-sort-indicator.vue
   create src/main/webapp/app/router/account.ts
   create src/main/webapp/app/shared/sort/sorts.ts
   create src/main/webapp/app/shared/data/data-utils.service.ts
   create src/main/webapp/app/shared/model/user.model.ts
   create src/main/webapp/app/account/account.service.ts
   create src/main/webapp/app/account/login-form/login-form.vue
   create src/main/webapp/app/account/login-form/login-form.component.ts
   create src/main/webapp/app/account/login.service.ts
   create src/main/webapp/app/account/change-password/change-password.vue
   create src/main/webapp/app/account/change-password/change-password.component.ts
   create src/main/webapp/app/account/register/register.vue
   create src/main/webapp/app/account/register/register.component.ts
   create src/main/webapp/app/account/register/register.service.ts
   create src/main/webapp/app/account/settings/settings.vue
   create src/main/webapp/app/account/settings/settings.component.ts
   create src/main/webapp/app/account/activate/activate.component.ts
   create src/main/webapp/app/account/activate/activate.service.ts
   create src/main/webapp/app/account/activate/activate.vue
   create src/main/webapp/app/account/reset-password/init/reset-password-init.vue
   create src/main/webapp/app/account/reset-password/init/reset-password-init.component.ts
   create src/main/webapp/app/account/reset-password/finish/reset-password-finish.vue
   create src/main/webapp/app/account/reset-password/finish/reset-password-finish.component.ts
   create src/main/webapp/app/admin/docs/docs.vue
   create src/main/webapp/app/admin/health/health-modal.component.ts
   create src/main/webapp/app/admin/health/health.service.ts
   create src/main/webapp/app/admin/docs/docs.component.ts
   create src/main/webapp/app/admin/configuration/configuration.vue
   create src/main/webapp/app/admin/logs/logs.vue
   create src/main/webapp/app/admin/logs/logs.component.ts
   create src/main/webapp/app/admin/logs/logs.service.ts
   create src/main/webapp/app/admin/configuration/configuration.component.ts
   create src/main/webapp/app/admin/metrics/metrics.vue
   create src/main/webapp/content/images/jhipster_family_member_0.svg
   create src/main/webapp/app/admin/configuration/configuration.service.ts
   create src/main/webapp/content/images/jhipster_family_member_0_head-192.png
   create src/main/webapp/app/admin/metrics/metrics.component.ts
   create src/main/webapp/content/images/jhipster_family_member_0_head-256.png
   create src/main/webapp/app/admin/health/health.vue
   create src/main/webapp/content/images/jhipster_family_member_0_head-384.png
   create src/main/webapp/app/admin/metrics/metrics.service.ts
   create src/main/webapp/content/images/jhipster_family_member_0_head-512.png
   create src/main/webapp/app/admin/health/health.component.ts
   create src/main/webapp/content/images/jhipster_family_member_1.svg
   create src/main/webapp/app/admin/metrics/metrics-modal.vue
   create src/main/webapp/content/images/jhipster_family_member_1_head-192.png
   create src/main/webapp/app/admin/health/health-modal.vue
   create src/main/webapp/content/images/jhipster_family_member_1_head-256.png
   create src/main/webapp/app/admin/metrics/metrics-modal.component.ts
   create src/main/webapp/content/images/jhipster_family_member_1_head-384.png
   create src/main/webapp/app/admin/user-management/user-management.vue
   create src/main/webapp/content/images/jhipster_family_member_1_head-512.png
   create src/main/webapp/app/admin/user-management/user-management.component.ts
   create src/main/webapp/content/images/jhipster_family_member_2.svg
   create src/main/webapp/app/admin/user-management/user-management-view.vue
   create src/main/webapp/content/images/jhipster_family_member_2_head-192.png
   create src/main/webapp/app/admin/user-management/user-management-view.component.ts
   create src/main/webapp/content/images/jhipster_family_member_2_head-256.png
   create src/main/webapp/app/admin/user-management/user-management-edit.vue
   create src/main/webapp/content/images/jhipster_family_member_2_head-384.png
   create src/main/webapp/app/admin/user-management/user-management-edit.component.ts
   create src/main/webapp/content/images/jhipster_family_member_2_head-512.png
   create src/main/webapp/app/admin/user-management/user-management.service.ts
   create src/main/webapp/content/images/jhipster_family_member_3.svg
   create src/test/javascript/jest.conf.js
   create src/main/webapp/content/images/jhipster_family_member_3_head-192.png
   create src/main/webapp/app/entities/user/user.oauth2.service.ts
   create src/main/webapp/content/images/jhipster_family_member_3_head-256.png
   create src/test/javascript/spec/app/account/account.service.spec.ts
   create src/main/webapp/content/images/jhipster_family_member_3_head-384.png
   create src/test/javascript/spec/app/core/jhi-navbar/jhi-navbar.component.spec.ts
   create src/main/webapp/content/images/jhipster_family_member_3_head-512.png
   create src/test/javascript/spec/app/core/ribbon/ribbon.component.spec.ts
   create src/main/webapp/content/images/logo-jhipster.png
   create src/test/javascript/spec/app/core/home/home.component.spec.ts
   create src/main/webapp/favicon.ico
   create src/test/javascript/spec/app/core/error/error.component.spec.ts
   create src/main/webapp/swagger-ui/dist/images/throbber.gif
   create src/test/javascript/spec/app/shared/config/axios-interceptor.spec.ts
   create .eslintignore
   create src/test/javascript/spec/app/shared/data/data-utils.service.spec.ts
   create src/main/webapp/manifest.webapp
   create src/test/javascript/spec/app/admin/configuration/configuration.component.spec.ts
   create src/main/webapp/WEB-INF/web.xml
   create src/test/javascript/spec/app/shared/config/formatter.spec.ts
   create src/main/webapp/robots.txt
   create src/test/javascript/spec/app/admin/health/health.component.spec.ts
   create src/test/javascript/spec/app/account/login-form/login-form.component.spec.ts
   create src/test/javascript/spec/app/account/change-password/change-password.component.spec.ts
   create src/test/javascript/spec/app/admin/health/health-modal.component.spec.ts
   create src/test/javascript/spec/app/account/register/register.component.spec.ts
   create src/test/javascript/spec/app/admin/health/health.service.spec.ts
   create src/test/javascript/spec/app/admin/logs/logs.component.spec.ts
   create src/test/javascript/spec/app/account/settings/settings.component.spec.ts
   create src/test/javascript/spec/app/admin/metrics/metrics.component.spec.ts
   create src/test/javascript/spec/app/account/activate/activate.component.spec.ts
   create src/test/javascript/spec/app/admin/metrics/metrics-modal.component.spec.ts
   create src/test/javascript/spec/app/admin/user-management/user-management.component.spec.ts
   create src/test/javascript/spec/app/admin/user-management/user-management-view.component.spec.ts
   create src/test/javascript/spec/app/admin/user-management/user-management-edit.component.spec.ts
   create src/test/javascript/spec/app/account/reset-password/init/reset-password-init.component.spec.ts
   create src/test/javascript/spec/app/account/reset-password/finish/reset-password-finish.component.spec.ts
   create src/main/webapp/404.html
   create src/main/webapp/index.html
   create src/main/webapp/content/css/loading.css
   create src/main/webapp/swagger-ui/index.html
   create src/main/resources/i18n/messages_es.properties
   create src/main/webapp/i18n/es/configuration.json
   create src/main/webapp/i18n/es/user-management.json
   create src/test/resources/i18n/messages_es.properties
   create src/main/webapp/i18n/en/configuration.json
   create src/main/webapp/i18n/en/sessions.json
   create src/main/webapp/i18n/es/logs.json
   create src/main/resources/i18n/messages_en.properties
   create src/main/webapp/i18n/en/settings.json
   create src/main/resources/i18n/messages_nl.properties
   create src/main/webapp/i18n/es/metrics.json
   create src/test/resources/i18n/messages_nl.properties
   create src/main/webapp/i18n/en/logs.json
   create src/main/webapp/i18n/en/user-management.json
   create src/main/webapp/i18n/es/error.json
   create src/main/webapp/i18n/en/metrics.json
   create src/main/webapp/i18n/es/login.json
   create src/main/webapp/i18n/en/error.json
   create src/main/webapp/i18n/es/home.json
   create src/main/webapp/i18n/en/login.json
   create src/main/webapp/i18n/es/password.json
   create src/main/webapp/i18n/es/register.json
   create src/main/webapp/i18n/en/home.json
   create src/main/webapp/i18n/es/sessions.json
   create src/main/webapp/i18n/en/password.json
   create src/main/webapp/i18n/es/settings.json
   create src/main/webapp/i18n/en/register.json
   create src/main/webapp/i18n/nl/configuration.json
   create src/main/webapp/i18n/nl/user-management.json
   create src/main/webapp/i18n/nl/logs.json
   create src/main/webapp/i18n/es/activate.json
   create src/main/webapp/i18n/nl/metrics.json
   create src/main/webapp/i18n/es/global.json
   create src/main/webapp/i18n/nl/error.json
   create src/main/webapp/i18n/es/health.json
   create src/main/webapp/i18n/nl/login.json
   create src/main/webapp/i18n/es/reset.json
   create src/main/webapp/i18n/nl/home.json
   create src/main/webapp/i18n/en/activate.json
   create src/main/webapp/i18n/nl/password.json
   create src/main/webapp/i18n/en/global.json
   create src/main/webapp/i18n/nl/register.json
   create src/main/webapp/i18n/en/health.json
   create src/main/webapp/i18n/nl/sessions.json
   create src/main/webapp/i18n/en/reset.json
   create src/main/webapp/i18n/nl/settings.json
   create src/main/webapp/i18n/nl/activate.json
   create src/main/webapp/i18n/nl/global.json
   create src/main/webapp/i18n/nl/health.json
   create src/main/webapp/i18n/nl/reset.json
   create src/main/java/com/delivery/app/domain/Producto.java
   create src/main/java/com/delivery/app/web/rest/ProductoResource.java
   create src/main/java/com/delivery/app/repository/ProductoRepository.java
   create src/main/java/com/delivery/app/service/ProductoService.java
   create src/test/java/com/delivery/app/web/rest/ProductoResourceIT.java
   create src/test/java/com/delivery/app/domain/ProductoTest.java
   create src/main/java/com/delivery/app/domain/enumeration/Medida.java
   create src/main/webapp/app/shared/model/producto.model.ts
   create src/main/webapp/app/shared/model/enumerations/medida.model.ts
   create src/main/webapp/app/entities/producto/producto-details.vue
   create src/main/webapp/app/entities/producto/producto.component.ts
   create src/main/webapp/app/entities/producto/producto-details.component.ts
   create src/main/webapp/app/entities/producto/producto.service.ts
   create src/main/webapp/app/entities/producto/producto-update.vue
   create src/main/webapp/app/entities/producto/producto-update.component.ts
   create src/main/webapp/app/entities/producto/producto.vue
   create src/main/webapp/i18n/es/medida.json
   create src/main/webapp/i18n/en/medida.json
   create src/main/webapp/i18n/nl/medida.json
   create src/main/webapp/i18n/es/producto.json
   create src/main/webapp/i18n/en/producto.json
   create src/test/javascript/spec/app/entities/producto/producto.component.spec.ts
   create src/test/javascript/spec/app/entities/producto/producto-update.component.spec.ts
   create src/test/javascript/spec/app/entities/producto/producto-details.component.spec.ts
   create src/test/javascript/spec/app/entities/producto/producto.service.spec.ts
   create src/main/webapp/i18n/nl/producto.json
   create src/main/java/com/delivery/app/domain/ProductoCategoria.java
   create src/main/java/com/delivery/app/web/rest/ProductoCategoriaResource.java
   create src/main/java/com/delivery/app/repository/ProductoCategoriaRepository.java
   create src/main/java/com/delivery/app/service/ProductoCategoriaService.java
   create src/test/java/com/delivery/app/web/rest/ProductoCategoriaResourceIT.java
   create src/test/java/com/delivery/app/domain/ProductoCategoriaTest.java
   create src/main/webapp/app/shared/model/producto-categoria.model.ts
   create src/main/webapp/app/entities/producto-categoria/producto-categoria-details.vue
   create src/main/webapp/app/entities/producto-categoria/producto-categoria.vue
   create src/main/webapp/app/entities/producto-categoria/producto-categoria.component.ts
   create src/main/webapp/app/entities/producto-categoria/producto-categoria.service.ts
   create src/main/webapp/app/entities/producto-categoria/producto-categoria-details.component.ts
   create src/main/webapp/app/entities/producto-categoria/producto-categoria-update.vue
   create src/main/webapp/app/entities/producto-categoria/producto-categoria-update.component.ts
   create src/test/javascript/spec/app/entities/producto-categoria/producto-categoria.component.spec.ts
   create src/main/webapp/i18n/es/productoCategoria.json
   create src/main/webapp/i18n/en/productoCategoria.json
   create src/main/webapp/i18n/nl/productoCategoria.json
   create src/main/java/com/delivery/app/domain/Cliente.java
   create src/main/java/com/delivery/app/web/rest/ClienteResource.java
   create src/test/javascript/spec/app/entities/producto-categoria/producto-categoria-details.component.spec.ts
   create src/main/java/com/delivery/app/repository/ClienteRepository.java
   create src/test/javascript/spec/app/entities/producto-categoria/producto-categoria.service.spec.ts
   create src/main/java/com/delivery/app/service/ClienteService.java
   create src/test/java/com/delivery/app/web/rest/ClienteResourceIT.java
   create src/test/javascript/spec/app/entities/producto-categoria/producto-categoria-update.component.spec.ts
   create src/test/java/com/delivery/app/domain/ClienteTest.java
   create src/main/java/com/delivery/app/domain/enumeration/Genero.java
   create src/main/webapp/app/shared/model/enumerations/genero.model.ts
   create src/main/webapp/app/shared/model/cliente.model.ts
   create src/main/webapp/app/entities/cliente/cliente-details.vue
   create src/main/webapp/app/entities/cliente/cliente.service.ts
   create src/main/webapp/app/entities/cliente/cliente-update.vue
   create src/main/webapp/app/entities/cliente/cliente-update.component.ts
   create src/main/webapp/app/entities/cliente/cliente-details.component.ts
   create src/main/webapp/app/entities/cliente/cliente.vue
   create src/main/webapp/app/entities/cliente/cliente.component.ts
   create src/main/webapp/i18n/es/genero.json
   create src/main/webapp/i18n/en/genero.json
   create src/main/webapp/i18n/nl/genero.json
   create src/main/webapp/i18n/es/cliente.json
   create src/main/webapp/i18n/en/cliente.json
   create src/test/javascript/spec/app/entities/cliente/cliente.component.spec.ts
   create src/main/webapp/i18n/nl/cliente.json
   create src/main/java/com/delivery/app/domain/Carrito.java
   create src/test/javascript/spec/app/entities/cliente/cliente-details.component.spec.ts
   create src/main/java/com/delivery/app/web/rest/CarritoResource.java
   create src/test/javascript/spec/app/entities/cliente/cliente.service.spec.ts
   create src/main/java/com/delivery/app/repository/CarritoRepository.java
   create src/main/java/com/delivery/app/service/CarritoService.java
   create src/test/javascript/spec/app/entities/cliente/cliente-update.component.spec.ts
   create src/test/java/com/delivery/app/web/rest/CarritoResourceIT.java
   create src/test/java/com/delivery/app/domain/CarritoTest.java
   create src/main/java/com/delivery/app/domain/enumeration/OrdenStatus.java
   create src/main/java/com/delivery/app/domain/enumeration/MetodoDePago.java
   create src/main/webapp/app/shared/model/enumerations/orden-status.model.ts
   create src/main/webapp/app/shared/model/enumerations/metodo-de-pago.model.ts
   create src/main/webapp/app/shared/model/carrito.model.ts
   create src/main/webapp/app/entities/carrito/carrito-details.vue
   create src/main/resources/config/liquibase/fake-data/blob/hipster.png
   create src/main/webapp/app/entities/carrito/carrito-details.component.ts
   create src/main/resources/config/liquibase/changelog/20240215132954_added_entity_Producto.xml
   create src/main/webapp/app/entities/carrito/carrito.vue
   create src/main/resources/config/liquibase/changelog/20240215132954_added_entity_constraints_Producto.xml
   create src/main/webapp/app/entities/carrito/carrito.component.ts
   create src/main/resources/config/liquibase/fake-data/producto.csv
   create src/main/webapp/app/entities/carrito/carrito.service.ts
   create src/main/resources/config/liquibase/changelog/20240215133054_added_entity_ProductoCategoria.xml
   create src/main/webapp/app/entities/carrito/carrito-update.vue
   create src/main/resources/config/liquibase/fake-data/producto_categoria.csv
   create src/main/webapp/app/entities/carrito/carrito-update.component.ts
   create src/main/resources/config/liquibase/changelog/20240215133154_added_entity_Cliente.xml
   create src/test/javascript/spec/app/entities/carrito/carrito.component.spec.ts
   create src/main/resources/config/liquibase/changelog/20240215133154_added_entity_constraints_Cliente.xml
   create src/test/javascript/spec/app/entities/carrito/carrito-details.component.spec.ts
   create src/main/resources/config/liquibase/fake-data/cliente.csv
   create src/test/javascript/spec/app/entities/carrito/carrito.service.spec.ts
   create src/main/resources/config/liquibase/changelog/20240215133254_added_entity_Carrito.xml
   create src/test/javascript/spec/app/entities/carrito/carrito-update.component.spec.ts
   create src/main/resources/config/liquibase/changelog/20240215133254_added_entity_constraints_Carrito.xml
   create src/main/webapp/i18n/es/ordenStatus.json
   create src/main/resources/config/liquibase/fake-data/carrito.csv
   create src/main/webapp/i18n/en/ordenStatus.json
   create src/main/resources/config/liquibase/changelog/20240215133354_added_entity_ProductoOrden.xml
   create src/main/webapp/i18n/nl/ordenStatus.json
   create src/main/resources/config/liquibase/changelog/20240215133354_added_entity_constraints_ProductoOrden.xml
   create src/main/webapp/i18n/es/metodoDePago.json
   create src/main/resources/config/liquibase/fake-data/producto_orden.csv
   create src/main/webapp/i18n/en/metodoDePago.json
   create src/main/webapp/i18n/nl/metodoDePago.json
   create src/main/webapp/i18n/es/carrito.json
   create src/main/webapp/i18n/en/carrito.json
   create src/main/webapp/i18n/nl/carrito.json
   create src/main/java/com/delivery/app/domain/ProductoOrden.java
   create src/main/java/com/delivery/app/web/rest/ProductoOrdenResource.java
   create src/main/java/com/delivery/app/repository/ProductoOrdenRepository.java
   create src/main/java/com/delivery/app/service/ProductoOrdenService.java
   create src/test/java/com/delivery/app/web/rest/ProductoOrdenResourceIT.java
   create src/test/java/com/delivery/app/domain/ProductoOrdenTest.java
   create src/main/webapp/app/shared/model/producto-orden.model.ts
   create src/main/webapp/app/entities/producto-orden/producto-orden-details.vue
   create src/main/webapp/app/entities/producto-orden/producto-orden.component.ts
   create src/main/webapp/app/entities/producto-orden/producto-orden-details.component.ts
   create src/main/webapp/app/entities/producto-orden/producto-orden.service.ts
   create src/main/webapp/app/entities/producto-orden/producto-orden-update.vue
   create src/main/webapp/app/entities/producto-orden/producto-orden-update.component.ts
   create src/main/webapp/app/entities/producto-orden/producto-orden.vue
   create src/main/webapp/i18n/es/productoOrden.json
   create src/main/webapp/i18n/en/productoOrden.json
   create src/main/webapp/i18n/nl/productoOrden.json
   create src/test/javascript/spec/app/entities/producto-orden/producto-orden.component.spec.ts
   create src/test/javascript/spec/app/entities/producto-orden/producto-orden-details.component.spec.ts
   create src/test/javascript/spec/app/entities/producto-orden/producto-orden.service.spec.ts
   create src/test/javascript/spec/app/entities/producto-orden/producto-orden-update.component.spec.ts
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

The main theme should look like this:

<p align="left">
  <img src="https://github.com/maximilianoPizarro/jhipster-devspace/blob/master/screenshot/jhipster-vapor-theme.PNG?raw=true" width="684" title="Run On Openshift">
</p>



## JHipster OpenShift Generator (Optional)

```
[jboss@workspace957b56497c3a46f6-7bdcf57dd8-ktkwn app]$ jhipster openshift
```

INFO! Using JHipster version installed globally
⭕ [*BETA*] Welcome to the JHipster OpenShift Generator ⭕
Files will be generated in folder: /projects/jhipster-devspace or in the root directory path that you select in the subsequent step
Docker version 1.10.0 or later is not installed on your computer.
         Read http://docs.docker.com/engine/installation/#installation


Found .yo-rc.json config file...
? Which *type* of application would you like to deploy? Monolithic application
? Enter the root directory where your applications are located /projects/jhipster-devspace
The path "/projects/jhipster-devspace" does not end with a trailing "/", adding it anyway.
1 applications found at /projects/jhipster-devspace/
? Which applications do you want to include in your configuration? app
? Do you want to setup monitoring for your applications ? No
? What should we use for the OpenShift namespace? maximilianopizarro5-dev
? Which *type* of database storage would you like to use? Ephemeral Storage
? What should we use for the base Docker repository name? image-registry.openshift-image-registry.svc:5000/maximilianopiza
rro5-dev
? What command should we use for push Docker image to repository? docker push

Checking Docker images in applications directories...
```
ls: no such file or directory: /projects/jhipster-devspace/app/target/jib-cache
   create ocp/ocp-apply.sh
    force app/.yo-rc.json
    force .yo-rc.json
   create ocp/delivery/delivery-deployment.yml
   create ocp/delivery/delivery-postgresql.yml
   create ocp/registry/scc-config.yml
```

No change to package.json was detected. No package manager install will be executed.

WARNING! OpenShift configuration generated, but no Jib cache found
If you forgot to generate the Docker image for this application, please run:
To generate the missing Docker image(s), please run:

```
  ./mvnw -ntp -Pprod verify jib:dockerBuild in /projects/jhipster-devspace/app
```

WARNING! You will need to push your image to a registry. If you have not done so, use the following commands to tag and push the images:

```
  docker image tag delivery image-registry.openshift-image-registry.svc:5000/maximilianopizarro5-dev/delivery
  docker push image-registry.openshift-image-registry.svc:5000/maximilianopizarro5-dev/delivery
```

You can deploy all your apps by running:

```
  chmod 777 /projects/jhipster-devspace/ocp/ocp-apply.sh
  /projects/jhipster-devspace/ocp/ocp-apply.sh
```

OR

```
  oc process -f /projects/jhipster-devspace/ocp/registry/scc-config.yml | oc apply -f -
  oc process -f /projects/jhipster-devspace/ocp/delivery/delivery-postgresql.yml | oc apply -f -
  oc process -f /projects/jhipster-devspace/ocp/delivery/delivery-deployment.yml | oc apply -f -
```

Use these commands to find your application's IP addresses:

```
  oc get svc delivery
```

Congratulations, JHipster execution is complete!
Sponsored with ❤️  by @oktadev.
