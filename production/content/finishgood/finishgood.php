<section>
  <!--  Searching Traceability -->
  <div class="row">
    <div class="x_panel">
      <div class="form-inline">
        <div id="finishgood_model" class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <h5 class="x_title"><i class="fas fa-search"></i> Model</h5>
        </div>
        <div id="finishgood_serial" class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <h5 class="x_title"><i class="fas fa-search"></i> Serial</h5>
        </div>
      </div>
    </div>
  </div>
  <!--  END OF Searching Traceability -->
  <!-- ============================================================================== -->
  <!--  MAIN OCS Finishgood Model -->
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
  				<h2><i class="fab fa-hubspot"></i> Finished Good </h2>
  				<ul class="nav navbar-right panel_toolbox">
  					<li>
  						<a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
  					</li>
  					<li>
  						<a class="close-link"><i class="fas fa-times"></i></a>
  					</li>
  				</ul>
  				<div class="clearfix"></div>
  			</div>
        <div class="x_content">
          <div  id="maindata" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  END OF MAIN OCS Finishgood Model -->
  <!-- ============================================================================== -->
  <!-- Plan and Actual Data -->
  <div class="row">
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
  				<h2><i class="far fa-clipboard"></i> Plan</h2>
  				<ul class="nav navbar-right panel_toolbox">
  					<li>
  						<a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
  					</li>
  					<li>
  						<a class="close-link"><i class="fas fa-times"></i></a>
  					</li>
  				</ul>
  				<div class="clearfix"></div>
  			</div>
        <div class="x_content">
          <div id="finishgood_plan" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
  				<h2><i class="far fa-calendar-check"></i> Actual</h2>
  				<ul class="nav navbar-right panel_toolbox">
  					<li>
  						<a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
  					</li>
  					<li>
  						<a class="close-link"><i class="fas fa-times"></i></a>
  					</li>
  				</ul>
  				<div class="clearfix"></div>
  			</div>
        <div class="x_content">
          <div  id="finishgood_actual" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Plan and Actual Data -->
  <!-- ============================================================================== -->
  <!-- warehouse -->
  <!-- <div id="finishgood_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel fixed_height_500">
        <div class="x_title">
          <h2><i class="fas fa-microchip"></i> Warehouse <small> ( Logistic ) </small></h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li>
              <a class="close-link"><i class="fas fa-times"></i></a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="well" style="overflow: auto">
            <div class="col-md-12">
              <div id="finishgood_logistic" class="extjs_border">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- END OF warehouse -->
  <!-- ============================================================================== -->
  <!-- Process Operational Data -->
  <div id="process_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">

        <!-- title of Part Operational -->
        <div class="x_title">
          <h2><i class="fab fa-cloudscale"></i> Process Operational <small> ( SMT, PCB, MA ) </small> </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li>
              <a class="close-link"><i class="fas fa-times"></i></a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <!-- END OF title of Part Operational  -->

        <div class="x_content">

          <!-- <div id="finishgood_part_smt">
          </div>
          <div id="finishgood_part_ma">
          </div> -->
          <!-- <div id="sub_process_tab" class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel fixed_height_500">
                <div class="x_title">
                  <h2><i class="fas fa-clipboard-check"></i> s</h2>
                  <ul class="nav navbar-right panel_toolbox">
                    <li>
                      <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                    <li>
                      <a class="close-link"><i class="fas fa-times"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div class="x_content">
                  <div class="well" style="overflow: auto">
                    <div class="col-md-12">
                      <div id="finishgood_part_smt">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- Collapsible -->
          <div class="accordion" id="accordion2" role="tablist" aria-multiselectable="true">

            <!-- PCB & MA Department -->
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingTwo2" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="true" aria-controls="collapseTwo">
                <h4 class="panel-title">TraceVerify MA Line</h4>
              </a>
              <div id="collapseTwo2" class="panel-collapse" role="tabpanel" aria-labelledby="headingTwo2">
                <div class="panel-body">

                  <!--  Extjs Grid Part MA PCB -->
                  <div id="finishgood_part_ma_pcb" class="extjs_border">
                  </div>
                    <!--  END OF Extjs Grid Part MA PCB  -->
                </div>
              </div>
            </div>

            <!-- MA INSPECTION -->
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingTwo2" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="true" aria-controls="collapseTwo">
                <h4 class="panel-title">MA Inspection</h4>
              </a>
              <div id="collapseTwo2" class="panel-collapse" role="tabpanel" aria-labelledby="headingTwo2">
                <div class="panel-body">

                  <!--  Extjs Grid Part MA PCB -->
                  <div id="finishgood_ma_inspection" class="extjs_border">
                  </div>
                    <!--  END OF Extjs Grid Part MA PCB  -->
                </div>
              </div>
            </div>
            <!-- SMT Department -
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingOne2" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                <h4 class="panel-title">SMT Department</h4>
              </a>
              <div id="collapseOne2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">

                    Extjs Grid Part smt -
                  <div id="finishgood_part_smt" class="extjs_border">
                  </div>
                    END OF Extjs Grid Part smt 
                </div>
              </div>
            </div>
          </div>
           END OF collapsible -->
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Process Operational Data -->
  <!-- ============================================================================== -->
  <!-- Part Handling Data -->
  <div id="parthandling_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">

        <!-- title of Part Handling  -->
        <div class="x_title">
  				<h2><i class="fas fa-microchip"></i> Part Handling <small> ( Material Control ) </small></h2>
  				<ul class="nav navbar-right panel_toolbox">
  					<li>
  						<a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
  					</li>
  					<li>
  						<a class="close-link"><i class="fas fa-times"></i></a>
  					</li>
  				</ul>
  				<div class="clearfix"></div>
  			</div>
        <!-- END OF title of Part Handling  -->

        <div class="x_content">

          <!-- <div id="finishgood_receivingpart">
          </div>
          <div id="finishgood_part_insp">
          </div>
          <div id="finishgood_part_issue">
          </div> -->


          <div class="accordion" id="accordion1" role="tablist" aria-multiselectable="true">
            <!--  Part Issuing -->
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingThree1" data-toggle="collapse" data-parent="#accordion1" href="#collapseThree1" aria-expanded="true" aria-controls="collapseThree">
                <h4 class="panel-title">Part Issuing</h4>
              </a>
              <div id="collapseThree1" class="panel-collapse" role="tabpanel" aria-labelledby="headingThree">
                <div class="panel-body">
                  <!--  Extjs Grid Part Issuing -->
                  <div id="finishgood_part_issue" class="extjs_border">
                  </div>
                  <!--  END OF Extjs Grid Part Issuing -->
                </div>
              </div>
            </div>
            <!--  END OF Part Issuing -->

            <!--  Part Inspection -->
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingTwo1" data-toggle="collapse" data-parent="#accordion1" href="#collapseTwo1" aria-expanded="true" aria-controls="collapseTwo">
                <h4 class="panel-title">Part Inspection</h4>
              </a>
              <div id="collapseTwo1" class="panel-collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                  <!--  Extjs Grid Part Inspection -->
                  <div id="finishgood_part_insp" class="extjs_border">
                  </div>
                  <!--  END OF Extjs Grid Part Inspection -->
                </div>
              </div>
            </div>
            <!--  END OF Part Inspection -->

            <!--  Receiving Part -->
            <div class="panel">
              <a class="panel-heading" role="tab" id="headingOne1" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                <h4 class="panel-title">Receiving Part</h4>
              </a>
              <div id="collapseOne1" class="panel-collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                  <!--  Extjs Grid Part Inspection -->
                  <div id="finishgood_receivingpart" class="extjs_border">
                  </div>
                  <!--  END OF Extjs Grid Part Inspection -->
                </div>
              </div>
            </div>
            <!--  END OF Receiving Part -->

           

            
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- END OF Part Handling Data -->
  <!-- ============================================================================== -->
  
 
  
<!-- //====//=========================================================================================== -->
    <!-- </div>
  </div>
</div>-->





  <!-- END OF Outgoing Quality Control Data -->
  <!-- ============================================================================== -->
  <!-- Return to Top -->
  <a href="javascript:" id="return-to-top"><i class="fas fa-chevron-up"></i></a>
  <div class="row">
    <div id="formsearch" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
    </div>
  </div>
  <!-- <br>
  <div class="row">
    <div id="maindata" class="x_panel" >
      <div class="x_title" >
        <h2>TRACEABILITY</h2>
      </div>
    </div>
  </div> -->
  <!-- <br>
  <div class="row">
    <div id="finishgood_plan" class="shrinepink-border col-xs-12 col-sm-12 col-md-6 col-lg-6" >
      <div class="shrinepink-title col-xs-12 col-sm-12 col-md-12 col-lg-12" >
        PLAN
      </div>
    </div>
    <div id="finishgood_actual" class="shrinepink-border col-xs-12 col-sm-12 col-md-6 col-lg-6" >
      <div class="shrinepink-title col-xs-12 col-sm-12 col-md-12 col-lg-12" >
        ACTUAL
      </div>
    </div>
  </div> -->
</section>
