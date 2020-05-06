<?php
require_once dirname(__FILE__) . "/../init.php";

$sync = new BaseApp_Synchronizer_UniversityMaster;
$sync->run();
