export const getDataService = () =>
  `
[D-BUS Service]
Name=@PACKAGE_NAME@
Exec=@pkgdatadir@/@PACKAGE_NAME@ --gapplication-service
`.trim();
