<!DOCTYPE html>
<html lang="en">
<head>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type"><!-- Meta, title, CSS, favicons, etc. -->
	<meta charset="utf-8">
	<meta content="IE=edge" http-equiv="X-UA-Compatible">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<link href="production/images/traceability.ico" rel="icon" type="image/ico">
	<title>TRACEABILITY</title><!-- Bootstrap -->
	<link href="my/css/general.css" rel="stylesheet"> <!-- genereal css -->
	<!-- <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"><!-- Font Awesome -->
	<!-- <link href="vendors/font-awesome/css/fontawesome-all.css" rel="stylesheet"><!-- NProgress -->
	<!-- <link href="../vendors/nprogress/nprogress.css" rel="stylesheet" /> -->
	<!-- iCheck -->
	<!-- <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet" /> -->
	<!-- jQuery custom content scroller -->
	<!-- <link href="../vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css" rel="stylesheet"/> -->
	<!-- bootstrap-progressbar -->
	<!-- <link href="vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet"><!-- JQVMap -->
	<!-- <link href="../vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/> -->
	<!-- bootstrap-daterangepicker -->
	<!-- <link href="../vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" /> -->
	<!-- Custom Theme Style -->
	<!-- <link href="build/css/custom.min.css" rel="stylesheet"><!--Extjs 6.2.0 -->
	<?php if(!empty($_REQUEST['content'])){ ?>
  <!-- <link rel="stylesheet" type="text/css" href="../extjs-4.2.2/resources/css/ext-all-gray.css" /> -->
  <!-- <link href="../framework/extjs-6.2.0/build/classic/theme-crisp/resources/theme-crisp-all.css" rel="stylesheet" type="text/css"> -->
	<script src="../framework/extjs-6.2.0/build/ext-all.js" type="text/javascript"> </script>
	 <script src="../framework/extjs-6.2.0/build/classic/theme-crisp/theme-crisp.js" type="text/javascript">
	</script>
  <!-- <script type="text/javascript" src="../extjs-4.2.2/ext-all.js"></script> -->

  <?php
	        $page = $_REQUEST['content'];
	        if($page == 'finishgood'){
	          $page_dir1 = 'my/js';
	          $thispages1 = scandir($page_dir1);
	          unset($thispages1[0], $thispages1[1]);
	          if(in_array($page.'.js', $thispages1)){
	           include_once($page_dir1.'/'.$page.'.js');
	          } else {
	           echo 'Page not found! :( finishgood js';

	          }
	        }
	        elseif($page == 'singlepart'){
	          $page_dir2 = 'my/js';
	          $thispages2 = scandir($page_dir2);
	          unset($thispages2[0], $thispages2[1]);
	          if(in_array($page.'.js', $thispages2)){
	            include_once($page_dir2.'/'.$page.'.js');
	          } else {
	            echo 'Page not found! :( singlepart js';
	          }
	        }
	        elseif($_REQUEST['content'] == 'modellotno'){
	          $page_dir3 = 'my/js';
	          $thispages3 = scandir($page_dir3);
	          unset($thispages3[0], $thispages3[1]);
	          $page3 = $_REQUEST['content'];
	          if(in_array($page3.'.js', $thispages3)){
	            include_once($page_dir3.'/'.$page3.'.js');
	          } else {
	            echo 'Page not found! :( modellotno js';
	          }
	        }
	        elseif($_REQUEST['content'] == 'symptom'){
	          $page_dir4 = 'my/js';
	          $thispages4 = scandir($page_dir4);
	          unset($thispages4[0], $thispages4[1]);
						$page4 = $_REQUEST['content'];
	          if(in_array($page4.'.js', $thispages4)){
	            include_once($page_dir4.'/'.$page4.'.js');
	          } else {
	            echo 'Page not found! :( symptom js';
	          }
	        }
	   } ?>
</head>
<body class="nav-md">
	<!-- <?php // $username = 'Harris Muhammad Zaki'; ?> -->
	<div class="container body">
		<div class="main_container">
			<div class="col-md-3 left_col menu_fixed">
				<?php include "production/sidebar_menu.php";?>
			</div><!-- top navigation -->
			<div class="top_nav">
        <?php include "production/top_menu.php"?>
      </div>
			<!-- /top navigation -->
			<!-- page content -->
			<div class="right_col" role="main">
				<!-- top tiles -->
				<!-- /top tiles -->
				<?php if(empty($_REQUEST['content'])){
				      	include "production/home.php";
				      }elseif($_REQUEST['content'] == "finishgood"){
								$page_dir11 = 'production/content/finishgood';
								$thispages11 = scandir($page_dir11);
								unset($thispages11[0], $thispages11[11]);
								$page11 = $_REQUEST['content'];
								if(in_array($page11.'.php', $thispages11)){
									include_once($page_dir11.'/'.$page11.'.php');
								} else {
									//echo 'Page not found! :( finishgood php';
									include "production/page_404.html";
								}
				      }
							elseif($_REQUEST['content'] == "singlepart"){
								$page_dir11 = 'production/content/singlepart';
								$thispages11 = scandir($page_dir11);
								unset($thispages11[0], $thispages11[11]);
								$page11 = $_REQUEST['content'];
								if(in_array($page11.'.php', $thispages11)){
									include_once($page_dir11.'/'.$page11.'.php');
								} else {
									//echo 'Page not found! :( singlepart php';
									include "production/page_404.html";
								}
				      }
        ?>
			</div><!-- /page content -->
			<!-- footer content -->
			<footer>
				<div class="pull-right">
					JVC Kenwood - Traceability
				</div>
				<div class="clearfix"></div>
			</footer><!-- /footer content -->
		</div>
	</div><!-- jQuery -->
	<script src="vendors/jquery/dist/jquery.min.js">
	</script> <!-- Bootstrap -->

	<script src="vendors/bootstrap/dist/js/bootstrap.min.js">
	</script> <!-- FastClick -->
	 <!-- <script src="../vendors/fastclick/lib/fastclick.js"></script> -->
	 <!-- NProgress -->
	 <!-- <script src="../vendors/nprogress/nprogress.js"></script> -->
	 <!-- Chart.js -->

	<script src="vendors/Chart.js/dist/Chart.min.js">
	</script> <!-- gauge.js -->
	 <!-- <script src="../vendors/gauge.js/dist/gauge.min.js"></script> -->
	 <!-- bootstrap-progressbar -->
	 <!-- <script src="../vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script> -->
	 <!-- iCheck -->
	 <!-- <script src="../vendors/iCheck/icheck.min.js"></script> -->
	 <!-- Skycons -->
	 <!-- <script src="../vendors/skycons/skycons.js"></script> -->
	 <!-- Flot -->
	 <!-- <script src="../vendors/Flot/jquery.flot.js"></script>
    <script src="../vendors/Flot/jquery.flot.pie.js"></script>
    <script src="../vendors/Flot/jquery.flot.time.js"></script>
    <script src="../vendors/Flot/jquery.flot.stack.js"></script>
    <script src="../vendors/Flot/jquery.flot.resize.js"></script> -->
	 <!-- Flot plugins -->
	 <!-- <script src="../vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
    <script src="../vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
    <script src="../vendors/flot.curvedlines/curvedLines.js"></script> -->
	 <!-- DateJS -->
	 <!-- <script src="../vendors/DateJS/build/date.js"></script>
    <!== JQVMap -->
	 <!-- <script src="../vendors/jqvmap/dist/jquery.vmap.js"></script>
    <script src="../vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    <script src="../vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script> -->
	 <!-- bootstrap-daterangepicker -->
	 <!-- <script src="../vendors/moment/min/moment.min.js"></script>
    <script src="../vendors/bootstrap-daterangepicker/daterangepicker.js"></script> -->
	 <!-- font-awesome 5.0.9 -->
	 <!-- <script src="../vendors/font-awesome-5.0.9/svg-with-js/js/fontawesome.min.js"></script> -->
	 <!-- Custom Theme Scripts -->

	<script src="build/js/custom.min.js"></script>
	<!-- Custom My Javascript -->
	<!-- <script src="my/js/mobile.js"></script> -->
	<script src="my/js/myjavascript.js"></script>
</body>
</html>
