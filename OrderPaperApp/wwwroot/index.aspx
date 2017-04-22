<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--jquery-->
    <script src="content/scripts/vendors/tether.min.js"></script>
    <script src="content/scripts/vendors/jquery-1.12.4.min.js"></script>
    <!--bootstrap-->
    <link href="content/css/vendors/bootstrap.min.css" rel="stylesheet" />
    <script src="content/scripts/vendors/bootstrap.min.js"></script>
    <!--jquery ui-->
    <script src="content/scripts/vendors/jquery-ui.min.js"></script>
    <!--spin-->
    <script src="content/scripts/vendors/spin.min.js"></script>
    <!--drggrable-->
    <link href="content/css/draggable.css" rel="stylesheet" />
    <!--select2-->
    <script src="content/scripts/vendors/select2.min.js"></script>
    <link href="content/css/vendors/select2/select2.css" rel="stylesheet" />
    <link href="content/css/vendors/select2/select2-bootstrap.css" rel="stylesheet" />
    <!--date picker-->
    <link href="content/css/vendors/datepicker/jasny-bootstrap.min.css" rel="stylesheet" />
    <script src="content/scripts/vendors/jasny-bootstrap.min.js"></script>
    <script src="content/scripts/vendors/moment.min.js"></script>
    <script src="content/scripts/vendors/bootstrap-datetimepicker.min.js"></script>
    <script src="content/scripts/vendors/bootstrap-datepicker.min.js"></script>
    <script src="content/scripts/vendors/en-gb.js"></script>
    <link href="content/css/vendors/datepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="content/css/vendors/datepicker/datepicker.min.css" rel="stylesheet" />
    <!--dragula-->
    <link href="app/directives/dragula/dragula.css" rel="stylesheet" />
    <script src="app/directives/dragula/dragula.js"></script>
    <!--vertical menu-->
    <link href="content/css/vendors/vertical-menu/font-awesome.min.css" rel="stylesheet" />
    <!--froala editor-->
    <link href="content/css/vendors/froala-editor/froala_editor.min.css" rel="stylesheet" />
    <link href="content/css/vendors/froala-editor/froala_style.min.css" rel="stylesheet" />
    <script src="content/scripts/vendors/froala_editor.min.js"></script>
    <!--pdf print-->
    <script src="content/scripts/vendors/xepOnline.jqPlugin.js"></script>
    <!--custom-->
    <link href="content/css/orderpaper.css" rel="stylesheet" />
    <!--ng2-->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="systemjs.config.js"></script>
    <script>
        System.import('app').catch(function (err) { console.error(err); });
    </script>
    <base href="/">
</head>
<body>
    <app>loading...</app>
    <script>
        $(document).on('mouseup', 'input, textarea', function (e) {
            $(this).blur();
            $(this).focus();

            $(this).on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
            });
        });
    </script>
</body>
</html>