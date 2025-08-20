<?php
header("Content-Type: application/json");
$amount = $_POST['amount'] ?? 0;
$codeqr = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214737303604511730303UMI51440014ID.CO.QRIS.WWW0215ID20233008497000303UMI5204541153033605802ID5919TOKO";

$url = "https://api.nvidiabotz.xyz/orderkuota/createpayment?amount=$amount&codeqr=" . urlencode($codeqr);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
curl_close($ch);
echo $res;
?>
