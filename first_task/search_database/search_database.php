<?php
/*
PHP 5.5.31 (cli) (built: Feb 20 2016 20:33:10) 
Copyright (c) 1997-2015 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2015 Zend Technologies
*/

include('database_service.php');

#Fetch arguments from CLI
$database_name = $argv[1];
$raw_ip = $argv[2];
$wanted_ip = ip2long($argv[2]);

#Connect to ip_info database and fetch records from database
$db = new ip_info($database_name);
$ips = $db->get_records();

search_database($ips,$wanted_ip,$raw_ip);


/**
 * get_ip_range
 * 
 * Calculates the range of available ips.
 *
 * Function acceps ip and mask, converts them to binary and calculates start and end ip
 * so we get the range of available ips.
 *
 * @param $ip ip
 * @param $mask  mask
 * @return array range of available ips
 *
 */
function get_ip_range ($ip,$mask) {
	$bin_mask = bindec(str_repeat("1", $mask ) . str_repeat("0", 32-$mask ));
    $bin_mask_inverse = bindec(str_repeat("0", $mask ) . str_repeat("1",  32-$mask ));

    $ip_floor = $ip & $bin_mask;
    $ip_ceil = $ip | $bin_mask_inverse;

    return  array('first' => $ip_floor -1 , 'last' => $ip_ceil + 1);
}

/**
 * check_ip
 * 
 * Checks if the ip is in range of ips.
 *
 * Function acceps range of ips and ip and checks if ip is in range.
 *
 * @param $range range of ips
 * @param $ip  ip
 * @return true if ip is in range, and false if ip is not in range
 *
 */
function check_ip($range,$ip) {
	if ($ip > $range['first'] && $ip < $range['last']) {
		return true;
	}
	return false;
}

/**
 * search_database
 * 
 * Searches database for ip and outputs the result of search.
 *
 * Accepts array of ips which is fetched from database, wanted ip and ip from CLI.
 * Goes trough every ip from database, gets the range of ips based on ip and mask and check if
 * ip passed from CLI is in that range of ips. Based on check results it outputs messages.
 *
 * @param $ip_list list of ips from database
 * @param $wanted_ip  ip passed from CLI in long format
 * @param $raw_ip ip passed from CLI
 *
 */
function search_database($ip_list,$wanted_ip,$raw_ip) {
	foreach ($ip_list as $current_ip) {
		$range = get_ip_range($current_ip['ip'],$current_ip['mask']);
		if(check_ip($range,$wanted_ip)){
			print_r(long2ip($current_ip['ip']) . "/" . $current_ip['mask'] . "\n");
			return;
		}
	}

	print_r("Sorry " . $raw_ip . " does not match any ip in database \n");
}

?>