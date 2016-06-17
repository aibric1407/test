<?php
/**
 * ip_info
 * 
 * Database class
 *
 */ 
class ip_info {
	public $db_file = "";
	public $db = NULL;
	public $prefix = NULL;

	/**
	 * ip_info
	 * 
	 * Class constructor
	 *
	 */
	function ip_info($db_file = '',$connect = true)
	{	
		if( !is_file( $db_file ) )
			print_r( 'SQiteDatabase: File '.$db_file.' wasn\'t found.' );
		
		$this->db_file = $db_file;
		if($connect)
			$this->connect();
	}

	/**
	 * connect
	 * 
	 * Method for connecting to dabase
	 *
	 */
	function connect() {
		try 
		{
			$this->db = new SQLite3('/Applications/XAMPP/htdocs/bic_test/'.$this->db_file);
		}
		catch( PDOException $e )
		{
			print_r( 'SQLiteDatabase: '.$e->getMessage() );
		}
	}

	/**
	 * get_records
	 * 
	 * Fetches records from database and saves it into array.
	 *
	 *
	 * @return array  array of ips from database
	 *
	 */
	function get_records() {
		$ips = array();
		$results = $this->db->query('SELECT * FROM ip_info');
		while ($row = $results->fetchArray()) {
		    $ip_info = array(
		        'ip' =>  ip2long($row['ip']),
		        'mask' => $row['mask'], 
		    );
		    array_push($ips, $ip_info);
		}
		return $ips;
	}

}
?>