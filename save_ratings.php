<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $company = $_POST['company'];
    $problem_addressed = $_POST['problem_addressed'];
    $team = $_POST['team'];
    $innovation_action = $_POST['innovation_action'];
    $product_service = $_POST['product_service'];

    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle('Ratings');

    // Header row
    $sheet->setCellValue('A1', 'Company');
    $sheet->setCellValue('B1', 'Problem Addressed');
    $sheet->setCellValue('C1', 'Team');
    $sheet->setCellValue('D1', 'Innovation and Action');
    $sheet->setCellValue('E1', 'Product / Service - Moat');

    // Data rows
    for ($i = 0; $i < count($company); $i++) {
        $row = $i + 2;
        $sheet->setCellValue("A$row", $company[$i]);
        $sheet->setCellValue("B$row", $problem_addressed[$i]);
        $sheet->setCellValue("C$row", $team[$i]);
        $sheet->setCellValue("D$row", $innovation_action[$i]);
        $sheet->setCellValue("E$row", $product_service[$i]);
    }

    $writer = new Xlsx($spreadsheet);
    $filePath = 'ratings.xlsx';
    $writer->save($filePath);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
