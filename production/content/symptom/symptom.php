<script type="text/javascript" src='./my/js/symptom/symptom.js'></script>
<section>
  <!--  Searching Traceability -->
  <div class="row">
    <div class="x_panel">
      <div class="form-inline">
        <div id="boardid_scan" class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <h5 class="x_title"><i class="fas fa-search"></i> PCB ID </h5>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="x_panel">
      <div class="form-group">
      <label class="control-label col-md-3 col-sm-3 col-xs-12">Department</label>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <div id="gender" class="btn-group" data-toggle="buttons">
          <label class="btn btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onclick="checkSymptom('ma')">
            <input type="radio" name="gender" value="ma"> &nbsp; MA &nbsp;
          </label>
          <label class="btn btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onclick="checkSymptom('mecha')">
            <input type="radio" name="gender" value="mecha"> MECHA
          </label>
        </div>
      </div>
    </div>
  </div>

  <!--  END OF Searching Traceability -->
  <!-- ============================================================================== -->
  <!--  MAIN REFLOW -->
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
  				<h2><i class="fab fa-hubspot"></i> Symptom Records </h2>
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
          <div  id="panel_symptom" class="extjs_border">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
