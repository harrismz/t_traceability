<section>
  <!--  Searching Traceability -->
  <div class="page-title">
    <div class="title_left">
      <h3>Finish Goods</h3>
    </div>
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2><i class="fas fa-search"></i> Finishgood Search <small>Select Category first for search data</small></h2>
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form id="demo-form2" class="form-horizontal form-label-center">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-12 col-xs-12"></label>
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
                <label class="control-label col-md-3 col-sm-12 col-xs-12"></label>
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
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="model-name">
                Model Name
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="model-name" name="model-name" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="DDXGT500RA9N" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sMechaModel">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="mecha-model">
                Mecha Model
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="mecha-model" name="mecha-model" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="XJJ-0290-00" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sSerialNo">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="serial-no">
                Serial No
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="serial-no" name="serial-no" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="4,8" placeholder="173X3440" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sLotNo">
              <label for="lot-no" class="control-label col-md-3 col-sm-3 col-xs-12">
                Lot No
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="lot-no" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="lot-no"  data-validate-length-range="4,4"placeholder="016A" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <div class="form-group" id="sDummySerial">
              <label for="dummy-serial" class="control-label col-md-3 col-sm-3 col-xs-12">
                Dummy Serial
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="dummy-serial" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="dummy-serial"  data-validate-length-range="13,13" placeholder="MAMST01700215" onkeypress="checkFinishgood(event)">
              </div>
            </div>
            <!-- <div class="form-group" id="serial_avmt">
              <label for="serial_avmt" class="control-label col-md-3 col-sm-3 col-xs-12">
                Serial AVMT
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="serial_avmt" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="serial_avmt"  data-validate-length-range="13,13">
              </div>
            </div> -->
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <button class="btn btn-danger" type="button" onclick="resetSearch()">
                  <i class="fas fa-undo"></i>
                  &nbsp;&nbsp;Reset
                </button>
                <button type="button" class="btn btn-success" onclick="checkFinishgood(event)">
                  <i class="fas fa-search"></i>
                  &nbsp;&nbsp;Search
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ============================================================================== -->
  <!--  MAIN OCS Finishgood Model -->
  <div id="finishgood_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="row x_title">
          <div class="col-md-6">
            <h2>
              <i class="fab fa-hubspot"></i>
                Finished Good   
              <small> ( OCS MA ) </small>
            </h2>
          </div>
          <div class="col-md-4">
            <button id="dlFinishgood" type="button" class="btn btn-info pull-right" onclick="downloadFinishgood()">
              <i class="fas fa-download"></i>
              &nbsp;&nbsp;Download
            </button>
          </div>
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
              </li>
              <li>
                <a class="close-link">
                  <i class="fas fa-times"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div  id="finishGood" class="extjs_border"></div>
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
        <div class="row x_title">
          <div class="col-md-8">
            <h2><i class="far fa-clipboard"></i> Plan  <small> ( OCS MA ) </small></h2>
          </div>
          <!-- <div class="col-md-4">
            <button id="dlPlan" type="button" class="btn btn-info pull-right" onclick="downloadPlan()">
              <i class="fas fa-download"></i>
            </button>
          </div> -->
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
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
        <div class="row x_title">
          <div class="col-md-8">
            <h2>
              <i class="far fa-calendar-check"></i>
              Actual
              <small> ( OCS MA ) </small>
            </h2>
          </div>
          <!-- <div class="col-md-4">
            <button id="dlActual" type="button" class="btn btn-info pull-right" onclick="downloadPlan()">
              <i class="fas fa-download"></i>
            </button>
          </div> -->
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
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
  <!-- Summary PCB Serial & Mecha Serial -->
  <div id="sumpcbmch_tab" class="row">
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel">
        <div class="row x_title">
          <div class="col-md-8">
            <h2><i class="far fa-clipboard"></i> PCB Serial  <small> ( Summary ) </small></h2>
          </div>
          <!-- <div class="col-md-4">
            <button id="dlPlan" type="button" class="btn btn-info pull-right" onclick="downloadPlan()">
              <i class="fas fa-download"></i>
            </button>
          </div> -->
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="summaryPCBSerial" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel">
        <div class="row x_title">
          <div class="col-md-8">
            <h2>
              <i class="far fa-calendar-check"></i>
              Mecha Serial
              <small> ( Summary ) </small>
            </h2>
          </div>
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div  id="summaryPCBSerial" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Plan and Actual Data -->
  <!-- ============================================================================== -->
  <!-- Process Operational Data -->
  <div id="prod_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>
            <i class="fas fa-boxes"></i>
            MAPROS
            <small> ( MA Traceverify System ) </small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li>
              <a class="close-link">
                <i class="fas fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="prod_mapros" class="extjs_border"></div>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title" id="insp_tab">
          <h2>
            <i class="fas fa-boxes"></i>
            Data Inspection 
            <small> ( MA ) </small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li>
              <a class="close-link">
                <i class="fas fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="prod_inspection" class="extjs_border"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Process Operational Data -->
  <!-- ============================================================================== -->
  <!-- Part Handling -->
  <div id="mcissue_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>
            <i class="fas fa-boxes"></i>
            Part Issue
            <small> ( MC ) </small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li>
              <a class="close-link">
                <i class="fas fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="mc_partiss" class="extjs_border"></div>
        </div>
      </div>
    </div>
    <!-- <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>
            <i class="fas fa-boxes"></i>
            Part Inspection
            <small> ( MC ) </small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li>
              <a class="close-link">
                <i class="fas fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="mc_insp" class="extjs_border"></div>
        </div>
      </div>
    </div> -->
     <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>
            <i class="fas fa-boxes"></i>
            Part Receiving
            <small> ( MC ) </small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li>
              <a class="close-link">
                <i class="fas fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div id="mc_receiving" class="extjs_border"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Part Handling -->
  <!-- ============================================================================== -->
  <!-- warehouse -->
  <div id="warehouse_tab" class="row">
    <div class="col-md-4 col-sm-6 col-xs-6">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-8">
            <h2><i class="fas fa-boxes"></i> Stock Card <small> ( Logistic - OQC) </small></h2>
          </div>
          <!-- <div class="col-md-4">
            <button id="dlActual" type="button" class="btn btn-info pull-right" onclick="downloadStockCard()">
              <i class="fas fa-download"></i>
            </button>
          </div> -->
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
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
          <div class="col-md-8">
            <h2>
              <i class="fas fa-boxes"></i> 
              Shipment Hold 
              <small> ( Logistic - QA ) </small>
            </h2>
          </div>
          <!-- <div class="col-md-4">
            <button id="dlActual" type="button" class="btn btn-info pull-right" onclick="downloadShipHold()">
              <i class="fas fa-download"></i>
            </button>
          </div> -->
          <div class="col-md-2">
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li>
                <a class="close-link"><i class="fas fa-times"></i></a>
              </li>
            </ul>
          </div>
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
          <h2>
            <i class="fas fa-boxes"></i> 
            Borrow
            <small> ( Logistic ) </small>
          </h2>
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
          <h2>
            <i class="fas fa-boxes"></i>
            Scan IN
            <small> ( Logistic ) </small>
          </h2>
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
          <h2>
            <i class="fas fa-boxes"></i> 
            Scan OUT 
            <small> ( Logistic ) </small>
          </h2>
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
  <!-- Return to Top -->
  <a href="javascript:" id="return-to-top"><i class="fas fa-chevron-up"></i></a>
</section>
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
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_mapros.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_maInspection.js'></script>
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_mcPartReceive.js'></script>
<!-- <script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_mcPartInspection.js'></script> -->
<script type="text/javascript" src='./my/js/finishgood_ma/fg_extjs_mcPartIssue.js'></script>