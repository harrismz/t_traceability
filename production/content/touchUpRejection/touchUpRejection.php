<section>
  <!--  Searching Traceability -->
  <div class="page-title">
    <div class="title_left">
      <h3>Touch Up Rejection Record</h3>
    </div>
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2><i class="fas fa-search"></i> Rejection Search <small>Select Category first for search data</small></h2>
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
                    <label id="lbCheckMS" class="rbclick btn btn-success active col-sm-6 col-md-6" data-toggle-class="btn-success" data-toggle-passive-class="btn-default" checked="true">
                      <input type="radio" id="checkMS" name="sCategory" value="MS">Model & Serial
                    </label>
                    <label id="lbCheckML" class="rbclick btn btn-default col-sm-6 col-md-6" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                      <input type="radio" id="checkML" name="sCategory" value="ML"> Model & Lot No
                    </label>
                    <!-- <label id="lbCheckDS" class="rbclick btn btn-default col-sm-4 col-md-4" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                      <input type="radio" id="checkDS" name="sCategory" value="DS"> Dummy Serial
                    </label> -->
                    <!-- <label id="lbCheckDS" class="rbclick btn btn-default col-sm-6 col-md-6" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                      <input type="radio" id="checkDC" name="sCategory" value="DC"> Running Date
                    </label> -->
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
                <input type="text" id="model-name" name="model-name" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="DDXGT500RA9N" onkeypress="checkDcOffset(event)">
              </div>
            </div>
            <div class="form-group" id="sMechaModel">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="mecha-model">
                Mecha Model
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="mecha-model" name="mecha-model" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="5,12" placeholder="XJJ-0290-00" onkeypress="checkDcOffset(event)">
              </div>
            </div>
            <div class="form-group" id="sSerialNo">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="serial-no">
                Serial No
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="serial-no" name="serial-no" class="form-control col-md-7 col-xs-12 text-uppercase"  data-validate-length-range="4,8" placeholder="173X3440" onkeypress="checkDcOffset(event)">
              </div>
            </div>
            <div class="form-group" id="sLotNo">
              <label for="lot-no" class="control-label col-md-3 col-sm-3 col-xs-12">
                Lot No
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="lot-no" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="lot-no"  data-validate-length-range="4,4"placeholder="016A" onkeypress="checkDcOffset(event)">
              </div>
            </div>
            <!-- <div class="form-group" id="sDummySerial">
              <label for="dummy-serial" class="control-label col-md-3 col-sm-3 col-xs-12">
                Dummy Serial
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="dummy-serial" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="dummy-serial"  data-validate-length-range="13,13" placeholder="MAMST01700215" onkeypress="checkDcOffset(event)">
              </div>
            </div> -->
            <!-- <div class="form-group" id="sDCDate">
              <label for="dcRunDate" class="control-label col-md-3 col-sm-3 col-xs-12">
                Running Date
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                 <input id="dcRunDate" class="form-control col-md-7 col-xs-12 text-uppercase" type="text" name="dummy-serial"  data-validate-length-range="13,13" placeholder="MAMST01700215" onkeypress="checkDcOffset(event)"> //tidakditampilkan
                <fieldset>
                  <div class="control-group">
                    <div class="controls">
                      <div class="col-md-11 xdisplay_inputx form-group has-feedback">
                        <input type="text" class="form-control has-feedback-left" id="single_cal3" placeholder="Running Date" aria-describedby="inputSuccess2Status3">
                        <span class="far fa-calendar form-control-feedback left" aria-hidden="true"></span>
                        <span id="inputSuccess2Status3" class="sr-only">(success)</span>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> -->
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <button class="btn btn-danger" type="button" onclick="resetSearch()">
                  <i class="fas fa-undo"></i>
                  &nbsp;&nbsp;Reset
                </button>
                <button type="button" class="btn btn-success" onclick="checkDcOffset(event)">
                  <i class="fas fa-search"></i>
                  &nbsp;&nbsp;Search
                </button>
                <button type="button" class="btn btn-primary" onclick="downloadDcOffset()">
                  <i class="fas fa-download"></i>
                  &nbsp;&nbsp;Download
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
  <!-- Process Operational Data -->
  <div  id="thermo_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <h2>
              <i class="fas fa-thermometer-half"></i>
              Rejection Data
              <small> ( Touch Up ) </small>
            </h2>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div id="src_mDcOffset"></div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
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
          <div  id="mDcOffset" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF Process Operational Data -->
  <!-- ============================================================================== -->
  <!-- Return to Top -->
  <a href="javascript:" id="return-to-top"><i class="fas fa-chevron-up"></i></a>
</section>
<!-- jQuery -->
<script src="./vendors/jquery/dist/jquery.min.js"></script>
<!-- Function -->
<script type="text/javascript" src='./my/js/touchUpRejection/rejectTUFunction.js'></script>
<script type="text/javascript" src='./my/js/touchUpRejection/rejectTUExtjsCall.js'></script>
<script type="text/javascript" src='./my/js/touchUpRejection/rejectTUSearch.js'></script>
<script type="text/javascript" src='./my/js/touchUpRejection/rejectTouchUp.js'></script>