<?php
date_default_timezone_set('Asia/jakarta');
header('Content-Type: application/json');

class Helper {

    public $query;
    public $request;
    public $changeProperty;
    public $primaryKey = 'id';
    public $table;
    public $extraWhere;

    function __construct($db, $table, $primaryKey, $query, $request, $changeProperty) {
        $this->query = $query;
        $this->request = $request;
        $this->changeProperty = $changeProperty;
        $this->db = $db; //$db adalah variable dari con_mc;
        $this->table = $table;
        $this->primaryKey = $primaryKey;
    }

    public function setExtraWhere($where) {
        $this->extraWhere = $where;
    }

    public function getExtraWhere() {
        return $this->extraWhere;
    }

    public function getQuery() {
        $offset = (isset($this->request['start']))? $this->request['start'] : 0;
        $limit = (isset($this->request['limit']))? $this->request['limit'] : 25;
        
        $query = $this->query . $this->getWhere() . $this->paginate($offset, $limit, $this->primaryKey );

        return $query;
    }

    public function getCountQuery() {
        return " SELECT COUNT( '{$this->primaryKey}' ) as total from {$this->table} ". $this->getWhere();
    }

    public function getCount() {
        $total = $this->db->Execute($this->getCountQuery());
        $totalcount = $total->getArray();
        // return $totalcount;
        return (count($totalcount) > 0) ? $totalcount[0]['total'] : 0; 
    }

    public function getFilter() {
        $filters = [];
        if(isset($this->request['filter'])) {
            $filters = json_decode($_GET['filter'], true );
        }

        foreach($this->request['custom_filter'] as $value ) {
            $filters[] = $value;
        }

        return $filters;
    }

    protected function getWhere() {
        $where = (is_null( $this->getExtraWhere()) )? "": $this->getExtraWhere() ;
        $counter = (is_null( $this->getExtraWhere()) )? 0:1;

        
        /* filter bisa didapet dari GET atau request['filters'] */
        $filters = $this->getFilter();
        
        
        foreach ($filters as $filtersKey => $filter) {
            /* 
            karena model js nya beda dengan penamaan di field. maka kita check property nya disini.
            kalau $changeProperty adalah variable pembandingnya.
            */
            $property = (isset($this->changeProperty[ $filter['property'] ])) ?
            $this->changeProperty[ $filter['property'] ] :  $filter['property'];

            if(is_array($property)) {
                /* ini untuk handle problem */
                $pCounter = 0;
                foreach( $property as $pValue ) {
                    if($counter == 0 && $pCounter == 0) {
                        $where .= " WHERE ";
                    } else if ( $counter !== 0 && $pCounter == 0 ) {
                        $where .= " AND ";
                    } else {
                        $where .= " ";
                    }

                    if($pCounter == 0) {
                        /* loop pertama. noted tanda buka kurung */
                        $where .= " ( {$pValue} LIKE '%{$filter['value']}%' ";
                    } else if( $pCounter != count($property) -1 ) {
                        /* kedua, tapi bukan terkahir.  */
                        $where .= " OR {$pValue} LIKE '%{$filter['value']}%' ";
                    } else {
                        /* looping terkahir */
                        $where .= " OR {$pValue} LIKE '%{$filter['value']}%' ) ";
                    }

                    $pCounter++;
                }
            } else {

                if($counter == 0) {
                    $where .= "WHERE {$property} LIKE '%{$filter['value']}%' ";
                } else {
                    $where .= "AND {$property} LIKE '%{$filter['value']}%' ";
                }
            }
            $counter++;
        }
    

        return $where;
    }

    protected function paginate($offset, $limit = 25, $primaryKey = 'issdate') {
        return " ORDER BY {$primaryKey} desc OFFSET {$offset} ROWS FETCH NEXT {$limit} ROWS ONLY ";
    }

    public function getRecord() {
        $rs	= $this->db->Execute($this->getQuery());
        $rows= $rs->getArray();
        
        return $rows;
    }

    public function getResult() {

        $result = [
            'success' => true,
            'totalCount' => 0,
            'rows' => [],
        ];

        try {
            //code...
            $result['rows'] = $this->getRecord();
            $result['totalCount'] = $this->getCount();

            return $result;

        } catch (\Exception $th) {
            //throw $th;
            $msg = $th->getMessage();
            $result['message'] = $msg;
            $result['success'] = false;
            $result['query'] = $this->getQuery();
            $result['count_query'] = $this->getCountQuery();
            

            // echo json_encode($result, JSON_NUMERIC_CHECK);
            return $result;
        }
    }

    public function __destruct()
    {
        $this->db->Close();
        $this->db = NULL;
    }
}