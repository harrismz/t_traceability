<section>
  <!--  Searching Traceability -->
  <div class="page-title">
    <div class="title_left">
      <h3>Finish Goods</h3>
    </div>
   <!--  <div class="title_right">
      <div class="col-md-12 col-sm-12 col-xs-12 form-group pull-right top_search"> -->
        <!-- <div class="input-group">
          <button class="form-control btn-danger input-group-btn" type="button" data-toggle="dropdown" data-qtip="Select Category Filter Data" >Filter By
          <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a href="#">Model & Lotno</a></li>
            <li><a href="#">Model & Serial</a></li>
            <li><a href="#">Dummy Serial/Panel</a></li>
          </ul>
          <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" placeholder="Search For PCB Serial..." onkeypress="checkPcbSerial(event)" value="YJ5214A00SH_01A7013A0208" data-qtip="Search PCB Serial here" style="text-transform:uppercase">
        </div> -->
         <!-- <div class="form-group" style="border:solid blue 1px !important;"> -->
          <!-- <label class="control-label col-md-3 col-sm-3 col-xs-12">Category</label> -->
          <!-- <div class="col-md-12 col-sm-12 col-xs-12" style="border:solid red 1px !important;">
            <div id="category" class="btn-group btn-group-sm" data-toggle="buttons" style="border:solid green 1px !important;">
              <label class="btn btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" style="border:solid green 1px !important;">
                <input type="radio" name="category" value="modelSerial" style="border:solid green 1px !important;">  Model & Serial 
              </label>
              <label class="btn btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" style="border:solid green 1px !important;">
                <input type="radio" name="category" value="modelLotNo" style="border:solid green 1px !important;"> Model & Lot No
              </label>
            </div>
          </div> -->
        <!-- <div class="input-group"> -->
          <!-- <div class="col-md-12 col-sm-12 col-xs-12" style="border:solid red 1px !important;">
          <input id="modelno" type="text" class="form-control" placeholder="Model Name..." onkeypress="checkModelSerial(event)" value="DDXGT701RA9N" data-qtip="Search Model here" style="text-transform:uppercase">
          <input id="serialno" type="text" class="form-control" placeholder="Serial No..." onkeypress="checkPcbSerial(event)" value="163X0105" data-qtip="Search Serial No here" style="text-transform:uppercase">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="checkPcbSerial(event)" data-qtip="Click Here for searching data">Go!</button>
          </span>
        </div> -->
        <!-- </div> -->
       
      <!-- </div>
    </div>
  </div> -->
  <div class="clearfix"></div>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-search"></i> Finishgood Search <small>Select Category first for search data</small></h2>
          <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form id="demo-form2" class="form-horizontal form-label-center">

            <div class="form-group">
              <label class="control-label col-md-3 col-sm-12 col-xs-12"><!-- Category <span class="required">*</span> --></label>
              <div class="col-md-6 col-sm-12 col-xs-12 text-center">
                <div id="sCategory" class="btn-group" data-toggle="buttons">
                  <label id="lbCheckMS" class="rbclick btn btn-success active" data-toggle-class="btn-success" data-toggle-passive-class="btn-default" checked="true">
                    <input type="radio" id="checkMS" name="sCategory" value="MS">Model & Serial
                  </label>
                  <label id="lbCheckML" class="rbclick btn btn-default" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                    <input type="radio" id="checkML" name="sCategory" value="ML"> Model & Lot No
                  </label>
                  <label id="lbCheckDS" class="rbclick btn btn-default" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                    <input type="radio" id="checkDS" name="sCategory" value="DS"> Dummy Serial
                  </label>
                </div>
              </div>
              <div>
                <input type="hidden" id="valOfCategory" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-12 col-xs-12"><!-- Category <span class="required">*</span> --></label>
              <div class="col-md-6 col-sm-12 col-xs-12 text-center">
                <div id="sCatMecha" class="btn-group" data-toggle="buttons">
                  <label id="lbCheckMA" class="rbclick2 btn btn-default active" data-toggle-class="btn-warning" data-toggle-passive-class="btn-default" checked="true">
                    <input type="radio" id="checkMA" name="sCatMecha" value="MA">Manual Assembly
                  </label>
                  <label id="lbCheckMCH" class="rbclick2 btn btn-default" data-toggle-class="btn-warning" data-toggle-passive-class="btn-default">
                    <input type="radio" id="checkMCH" name="sCatMecha" value="MCH"> Mecha
                  </label>
                </div>
              </div>
              <div>
                <input type="hidden" id="valOfCatMecha" />
              </div>
            </div>
            <div class="form-group" id="sModelName">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="model-name">Model Name
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="model-name" name="model-name" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="DDXGT500RA9N" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sMechaModel">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="mecha-model">Mecha Model
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="mecha-model" name="mecha-model" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="XJJ-0290-00" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sSerialNo">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="serial-no">Serial No
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="serial-no" name="serial-no" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="4,8" placeholder="173X3440" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sLotNo">
              <label for="lot-no" class="control-label col-md-3 col-sm-3 col-xs-12">Lot No</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="lot-no" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="lot-no"  data-validate-length-range="4,4"placeholder="016A" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sDummySerial">
              <label for="dummy-serial" class="control-label col-md-3 col-sm-3 col-xs-12">Dummy Serial</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="dummy-serial" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="dummy-serial"  data-validate-length-range="13,13" placeholder="MAMST01700123" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <button class="btn btn-danger" type="button" onclick="resetSearch()"><i class="fas fa-undo"></i>&nbsp;&nbsp;Reset</button>
                <button type="button" class="btn btn-success" onclick="checkFinishgood(event)"><i class="fas fa-search"></i>&nbsp;&nbsp;Search</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================================== -->
  <!--  MAIN OCS Finishgood Model -->
  <div id="finishgood_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fab fa-hubspot"></i> Finished Good   <small> ( OCS MA ) </small></h2>
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
          <div  id="finishGood" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  END OF MAIN OCS Finishgood Model -->
  <!-- ============================================================================== -->
  <!-- Plan and Actual Data -->
  <div id="plan_tab" class="row">
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="far fa-clipboard"></i> Plan  <small> ( OCS MA ) </small></h2>
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
          <h2><i class="far fa-calendar-check"></i> Actual  <small> ( OCS MA ) </small></h2>
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
  <!-- Process Operational Data -->
  <div id="prod_tab" class="row">
    <div class="col-md-6 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> MAPROS <small> ( MA Traceverify System ) </small></h2>
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
          <div id="prod_mapros" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Data Inspection <small> ( MA ) </small></h2>
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
          <div id="prod_inspection" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="process_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">

        <!-- title of Part Operational -->
        <div class="x_title">
          <h2><i class="fab fa-cloudscale"></i> Process Operational <small> ( MA ) </small> </h2>
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
  <!-- warehouse -->
  <div id="warehouse_tab" class="row">
    <div class="col-md-4 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Stock Card <small> ( Logistic - OQC) </small></h2>
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
          <div id="wh_stockcard" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Shipment Hold <small> ( Logistic - QA ) </small></h2>
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
          <div id="wh_shipmenthold" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Borrow <small> ( Logistic ) </small></h2>
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
          <div id="wh_borrow" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Scan IN <small> ( Logistic ) </small></h2>
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
          <div id="wh_scanin" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-boxes"></i> Scan OUT <small> ( Logistic ) </small></h2>
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
          <div id="wh_scanout" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF warehouse -->
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
<!-- jQuery -->
<script src="./vendors/jquery/dist/jquery.min.js"></script>
<!-- Function -->
<script type="text/javascript" src='./my/js/finishgood_ma/fg_function.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_call.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_search.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_finishgood.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_plan.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_actual.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_warehouse.js'></script>