<?php
class Database{
 
    // specify your own database credentials
    private $host = "10.230.32.199";
    private $db_name = "10.230.32.199:outset";
    private $username = "SYSDBA";
    private $password = "masterkey";
    private $driver = 'firebird';
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO($this->driver.":host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>