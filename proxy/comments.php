<?php 

require('./conf.php');

$url = $baseUrl . '/comments';
        
switch($_SERVER['REQUEST_METHOD']) {
    
    case 'GET':                        
        $url = $baseUrl . $_SERVER['REQUEST_URI'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);               
        $response = curl_exec($ch);
        
        header('Content-Type: application/json');
        break;
        
    case 'POST':
    case 'PUT':        
        
        $data = file_get_contents('php://input');
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
        header('Content-Type: application/json');
        $response = curl_exec($ch);
        break;
    
    case 'DELETE':
        /*$parts = explode('/', $_SERVER['REQUEST_URI']);
        if( count($parts) < 3 ) {
            throw new Exception('invalid patch');            
        }
        
        $commentId = $parts[2];        
        $url.= "/$commentId";*/
        
        $url = $baseUrl . $_SERVER['REQUEST_URI'];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        
        header('Content-Type: application/json');
        $response = curl_exec($ch);
        
}
