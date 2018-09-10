<?php
  $page = $_REQUEST['content'];
  $page_dir = 'menu';
  $thispages = scandir($page_dir);
  unset($thispages[0], $thispages[1]);
  if(in_array($page.'.html', $thispages)){
   include_once($page_dir.'/'.$page.'.html');
  } else {
    ?>
    <li>
      <a href="#" class="user-profile" >

      </a>
    </li>
    <?php
  }

?>
