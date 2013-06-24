<?php
require('./conf.php');

$url = $baseUrl . '/userlogin';
    

switch($_SERVER['REQUEST_METHOD']) {
    
    case 'POST':
        $data = file_get_contents('php://input');        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        header('Content-Type: application/json');
        $response = curl_exec($ch);            
        break;

    default:
        throw new Exception('Unexpected exception');
}
