<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_call.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_function.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_var.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/finishgood_smt.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_bigs.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_repair.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_spi.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_mounter.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_reflow.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_aoi.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_mapros.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_inspection.js'></script>
<script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_warehouse.js'></script>
<section>
  <!--  Searching Traceability -->
  <div class="page-title">
    <div class="title_left">
      <h3>PCB Serial</h3>
    </div>
    <!-- YJ5224A01MN_00A7010A0002 -->

    <!-- SWITCH WITHOUT MOTHERCODE -->
    <!-- YJ5214A00SH_01A7015A0001  -->
    <!-- YJ5214A00SH_01A7013A0208  -->
    <!-- YJ5224A02AO_00A7016A0601  -->
    <!-- YJ5224A03VT_00A7024A0513  -->
    <!-- YJ5224M01AO_00A7013A0062  -->
    <!-- YJ5224M01AO_00A7013A0328  -->
    <!-- YJ5224A01VT_00B7030A0175  -->
<!-- value="YJ5224A01VT_00B7030A0175"  -->
    <div class="title_right">
      <div class="col-md-9 col-sm-9 col-xs-12 form-group pull-right top_search">
        <div class="input-group">
          <input id="pcbserial" type="text" class="form-control" placeholder="''PCB Serial'' OR ''Model / LotNo / PWBName''" onkeypress="checkPcbSerial(event)" data-qtip="Search PCB Serial here" style="text-transform:uppercase">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="checkPcbSerial(event)" data-qtip="Click Here for searching data">Go!</button>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="row">
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
    </div> -->
  </div>
  <!-- ============================================================================== -->
  <div id="big_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
              <h2><i class="fab fa-hubspot"></i> Board ID Generator <small> ( SMT ) </small></h2>
          </div>
          <div class="col-md-4">
            <button id="dlBigs" type="button" class="btn btn-info pull-right" onclick="downloadBigs()">
              <i class="fas fa-download"></i>
              &nbsp;&nbsp;Download
            </button>
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
          <div  id="panel_bigs" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="repair_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="fab fa-hubspot"></i> Repair Part <small> ( SMT ) </small></h2>
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
          <div  id="panel_repair" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="spi_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-calendar-check"></i> SPI  <small> ( SMT ) </small></h2>
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
          <div  id="panel_spi" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="mounter_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-calendar-check"></i> MOUNTER  <small> ( SMT ) </small></h2>
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
          <div  id="panel_mounter" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="reflow_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-calendar-check"></i> REFLOW  <small> ( SMT ) </small></h2>
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
          <div  id="panel_reflow" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="aoi_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-clipboard"></i> AOI  <small> ( SMT ) </small></h2>
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
          <div id="panel_aoi" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="ma_tab" class="row" hidden>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-calendar-check"></i> TraceVerify MA <small> ( MAPROS ) </small></h2>
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
          <div  id="panel_pcb_mapros" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="insp_tab" class="row" hidden>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-md-6">
            <h2><i class="far fa-calendar-check"></i> Inspection Process <small> ( MA ) </small></h2>
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
          <div  id="panel_pcb_inspection" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="warehouse_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="fas fa-warehouse"></i> Warehouse <small> ( Logistic ) </small></h2>
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
          <div  id="panel_pcb_warehouse" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <a href="javascript:" id="return-to-top"><i class="fas fa-chevron-up"></i></a>
</section>
<!-- <script type="text/javascript" src='./my/js/finishgood_smt/pcb_extjs_bigs.js'></script> -->
<!-- <script type="text/javascript" src='./my/js/finishgood_smt/pcb_search.js'></script> -->
<!-- <div class="row">
  <div class="x_panel">
    <div class="form-inline">
      <div id="boardid_scan" class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h5 class="x_title"><i class="fas fa-search"></i> PCB ID </h5>
      </div>
    </div>
  </div>
</div> -->
<!--  END OF Searching Traceability -->
<!-- <div id="finishgood_tab" class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel fixed_height_500">
      <div class="x_title">
        <h2><i class="fas fa-warehouse"></i> Warehouse <small> ( Logistic ) </small></h2>
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
            <div id="panel_warehouse" class="extjs_border">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
<!-- ============================================================================== -->
<!-- Return to Top -->