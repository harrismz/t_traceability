<?php
class Database{
 
    // specify your own database credentials
    private $host = "10.230.32.199";
    private $db_name = "10.230.32.199:outset";
    private $username = "SYSDBA";
    private $password = "masterkey";
    private $driver = 'firebird';
    public $conn;

    public function __construct(array $arg = null){
        if (!is_null($arg)) {
            # code...
            $this->host = $arg['host'];
            $this->db_name = $arg['db_name'];
            $this->username = $arg['username'];
            $this->password = $arg['password'];
            $this->driver = $arg['driver'];
        }
    }
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            // $connectionString = $this->driver.":host=" . $this->host . ";dbname=" . $this->db_name;
            $connectionString = 'sqlsrv:Server=svrdbn\jeinsql2012trc;Port=63244;Database=136.198.117.48:SMTPROS;';
            $this->conn = new PDO($connectionString,$this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>