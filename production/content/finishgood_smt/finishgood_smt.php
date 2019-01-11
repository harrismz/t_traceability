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
    
    <div class="title_right">
      <div class="col-md-9 col-sm-9 col-xs-12 form-group pull-right top_search">
        <div class="input-group">
          <input id="pcbserial" type="text" class="form-control" placeholder="Search For PCB Serial..." onkeypress="checkPcbSerial(event)" value="YJ5214A00SH_01A7013A0208" data-qtip="Search PCB Serial here" style="text-transform:uppercase">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="checkPcbSerial(event)" data-qtip="Click Here for searching data">Go!</button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- ============================================================================== -->
  <div id="big_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
  				<h2><i class="fab fa-hubspot"></i> Board ID Generator <small> ( SMT ) </small></h2>
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
          <h2><i class="fab fa-hubspot"></i> Repair Part <small> ( SMT ) </small></h2>
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
          <h2><i class="far fa-calendar-check"></i> SPI  <small> ( SMT ) </small></h2>
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
          <h2><i class="far fa-calendar-check"></i> MOUNTER  <small> ( SMT ) </small></h2>
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
          <h2><i class="far fa-calendar-check"></i> REFLOW  <small> ( SMT ) </small></h2>
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
  				<h2><i class="far fa-clipboard"></i> AOI  <small> ( SMT ) </small></h2>
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
          <div id="panel_aoi" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="ma_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="far fa-calendar-check"></i> TraceVerify MA <small> ( MAPROS ) </small></h2>
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
          <div  id="panel_pcb_mapros" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="insp_tab" class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2><i class="far fa-calendar-check"></i> Inspection Process <small> ( MA ) </small></h2>
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